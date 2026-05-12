import { useEffect, useMemo, useRef, useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { toast } from "sonner";

import DashboardContainer from "@/components/dashboard/layout/DashboardContainer";
import DashboardGrid from "@/components/dashboard/layout/DashboardGrid";
import DashboardHero from "@/components/dashboard/layout/DashboardHero";
import MobileDetailsAccordion from "@/components/dashboard/layout/MobileDetailsAccordion";

import FunnelProgressionV2 from "@/components/dashboard/panels/FunnelProgression";
import ConversionTrendV2 from "@/components/dashboard/panels/ConversionTrend";
import LeadSourceConversionV2 from "@/components/dashboard/panels/LeadSourceConversion";
import CtaOutcomePerformanceV2 from "@/components/dashboard/panels/CtaOutcomePerformance";
import GoalCompletionTrendV2 from "@/components/dashboard/panels/GoalCompletionTrend";
import GoalHealthV2 from "@/components/dashboard/panels/GoalHealth";
import NextActionsV2 from "@/components/dashboard/panels/NextActions";
import TrafficContextV2 from "@/components/dashboard/panels/TrafficContext";
import PageViewBreakdown from "@/components/dashboard/panels/PageViewBreakdown";

import {
  DASHBOARD_PDF_DONE_EVENT,
  DASHBOARD_PDF_REQUEST_EVENT,
} from "@/components/dashboard/layout/DashboardTopbar";

import type { GoalKey } from "@/lib/analytics/config.types";
import type { DashboardPayload } from "@/lib/dashboard/payload";
import type { DashboardRangeKey } from "@/lib/dashboard/dateRanges";
import { getSiteContextPages } from "@/lib/siteConfig/getSiteContextPages";
import { useDashboardSummary } from "@/lib/dashboard/queries/useDashboardSummary";

import SkeletonCard from "@/components/dashboard/common/SkeletonCard";
import SkeletonPanel from "@/components/dashboard/common/SkeletonPanel";
import EmptyState from "@/components/ui/EmptyState";

type DashboardPageProps = {
  siteId: string;
  role: string;
  config: any;
  currentModule: "analytics";
  initialRange: DashboardRangeKey;
};

type GoalToggleOption = {
  value: GoalKey;
  label: string;
};

type PdfRequestDetail = {
  accepted: boolean;
};

function getGoalOptions(payload?: DashboardPayload): GoalToggleOption[] {
  if (!payload) return [];

  return payload.funnelProgression.map((goal) => ({
    value: goal.goalKey,
    label: goal.goalName,
  }));
}

function getGoalCompletionLabels(payload: DashboardPayload) {
  return {
    primary:
      payload.funnelProgression.find((goal) => goal.goalKey === "primary")
        ?.goalName ?? "Primary Goal",
    secondary:
      payload.funnelProgression.find((goal) => goal.goalKey === "secondary")
        ?.goalName ?? "Secondary Goal",
    tertiary:
      payload.funnelProgression.find((goal) => goal.goalKey === "tertiary")
        ?.goalName ?? "Tertiary Goal",
  };
}

function DashboardInitialSkeleton() {
  return (
    <DashboardContainer>
      <div className="dash-initial-skeleton" aria-label="Loading dashboard">
        <div className="dash-initial-skeleton__hero">
          <div className="skeleton dash-initial-skeleton__eyebrow" />
          <div className="skeleton dash-initial-skeleton__title" />
          <div className="skeleton dash-initial-skeleton__description" />
          <div className="dash-initial-skeleton__controls">
            <div className="skeleton dash-initial-skeleton__control" />
            <div className="skeleton dash-initial-skeleton__control" />
          </div>
        </div>

        <div className="dash-initial-skeleton__kpis">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <DashboardGrid columns="2">
          <SkeletonPanel height={300} />
          <SkeletonPanel height={300} />
        </DashboardGrid>

        <DashboardGrid columns="2">
          <SkeletonPanel height={260} />
          <SkeletonPanel height={260} />
        </DashboardGrid>
      </div>
    </DashboardContainer>
  );
}

export const getServerSideProps: GetServerSideProps<
  DashboardPageProps
> = async (ctx) => {
  try {
    const { siteId, role, config } = await getSiteContextPages(ctx);

    if (config.modules?.analytics?.enabled !== true) {
      return { notFound: true };
    }

    return {
      props: {
        siteId,
        role,
        config,
        currentModule: "analytics",
        initialRange: "30",
      },
    };
  } catch (error: any) {
    if (error?.message === "Unauthorized") {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return { notFound: true };
  }
};

export default function AnalyticsDashboardPage({
  siteId,
  initialRange,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [range, setRange] = useState<DashboardRangeKey>(initialRange);
  const [activeGoalKey, setActiveGoalKey] = useState<GoalKey | undefined>(
    undefined,
  );

  const lastRefreshErrorRef = useRef<string | null>(null);

  const { data, isLoading, isFetching, error, isPlaceholderData } =
    useDashboardSummary(range);

  const goalOptions = useMemo(() => getGoalOptions(data), [data]);
  const panelsEnabled = data?.meta.panelsEnabled ?? {};
  const isInitialLoading = isLoading && !data;
  const isBackgroundRefreshing = isFetching && Boolean(data);
  const hasBlockingError = error instanceof Error && !data;
  const goalCompletionLabels = useMemo(
    () => (data ? getGoalCompletionLabels(data) : undefined),
    [data],
  );

  useEffect(() => {
    if (!goalOptions.length) return;

    if (!activeGoalKey) {
      setActiveGoalKey(goalOptions[0].value);
      return;
    }

    const stillExists = goalOptions.some(
      (option) => option.value === activeGoalKey,
    );

    if (!stillExists) {
      setActiveGoalKey(goalOptions[0].value);
    }
  }, [activeGoalKey, goalOptions]);

  useEffect(() => {
    if (!(error instanceof Error) || !data) return;

    const message = error.message || "Dashboard refresh failed.";

    if (lastRefreshErrorRef.current === message) return;

    lastRefreshErrorRef.current = message;
    toast.error("Dashboard refresh failed. Showing the last available data.");
  }, [data, error]);

  useEffect(() => {
    if (!error) {
      lastRefreshErrorRef.current = null;
    }
  }, [error]);

  useEffect(() => {
    function finishPdfRequest() {
      window.dispatchEvent(new CustomEvent(DASHBOARD_PDF_DONE_EVENT));
    }

    async function handlePdfRequest(event: Event) {
      const customEvent = event as CustomEvent<PdfRequestDetail>;
      customEvent.detail.accepted = true;

      if (!data) {
        toast.error("Dashboard data is not ready yet.");
        finishPdfRequest();
        return;
      }

      try {
        const { buildDashboardPdf } =
          await import("@/components/dashboard/report/buildDashboardPdf");

        buildDashboardPdf({
          payload: data,
          siteId,
          range,
          activeGoalKey,
        });
      } catch (error) {
        console.error(error);
        toast.error("PDF export failed.");
      } finally {
        finishPdfRequest();
      }
    }

    window.addEventListener(DASHBOARD_PDF_REQUEST_EVENT, handlePdfRequest);

    return () => {
      window.removeEventListener(DASHBOARD_PDF_REQUEST_EVENT, handlePdfRequest);
    };
  }, [activeGoalKey, data, range, siteId]);

  if (isInitialLoading) {
    return <DashboardInitialSkeleton />;
  }

  if (hasBlockingError || !data) {
    return (
      <DashboardContainer>
        <EmptyState
          title="Dashboard unavailable"
          description={
            error instanceof Error
              ? error.message
              : "Dashboard data could not be loaded."
          }
        />
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <div
        className={`dash-dashboard-runtime ${
          isBackgroundRefreshing ? "is-refreshing" : ""
        } ${isPlaceholderData ? "is-showing-previous-data" : ""}`}
      >
        {isBackgroundRefreshing ? (
          <div className="dash-refresh-indicator" role="status">
            <span className="dash-refresh-indicator__dot" aria-hidden="true" />
            Updating dashboard…
          </div>
        ) : null}

        <DashboardHero
          meta={data.meta}
          executiveSnapshot={data.executiveSnapshot}
          funnelProgression={data.funnelProgression}
          range={range}
          onRangeChange={setRange}
          goalValue={activeGoalKey}
          goalOptions={goalOptions}
          onGoalChange={setActiveGoalKey}
          notes={data.meta.notes}
          isRefreshing={isBackgroundRefreshing}
        />

        {error instanceof Error ? (
          <EmptyState
            compact
            title="Showing last available data"
            description="The most recent refresh failed, but the dashboard is still showing the last successful report."
            className="dash-nonblocking-error"
          />
        ) : null}

        {panelsEnabled.funnelProgression || panelsEnabled.conversionTrend ? (
          <DashboardGrid columns="2">
            {panelsEnabled.funnelProgression ? (
              <FunnelProgressionV2
                data={data.funnelProgression}
                activeGoalKey={activeGoalKey}
              />
            ) : null}

            {panelsEnabled.conversionTrend ? (
              <ConversionTrendV2
                data={data.conversionTrend}
                activeGoalKey={activeGoalKey}
              />
            ) : null}
          </DashboardGrid>
        ) : null}

        {panelsEnabled.pageViewBreakdown ? (
          <PageViewBreakdown data={data.pageViewBreakdown} />
        ) : null}

        {panelsEnabled.leadSourceConversion ? (
          <LeadSourceConversionV2
            data={data.leadSourceConversion}
            diagnostics={data.leadSourceDiagnostics}
            activeGoalKey={activeGoalKey}
          />
        ) : null}

        <DashboardGrid columns="2-1">
          {panelsEnabled.goalCompletionTrend && goalCompletionLabels ? (
            <GoalCompletionTrendV2
              data={data.goalCompletionTrend}
              labels={goalCompletionLabels}
            />
          ) : null}

          {panelsEnabled.nextActions ? (
            <NextActionsV2 data={data.nextActions} />
          ) : null}
        </DashboardGrid>

        <div className="dash-desktop-only">
          <DashboardGrid columns="2">
            {panelsEnabled.ctaOutcomePerformance ? (
              <CtaOutcomePerformanceV2
                data={data.ctaOutcomePerformance}
                activeGoalKey={activeGoalKey}
              />
            ) : null}

            {panelsEnabled.goalHealth ? (
              <GoalHealthV2 data={data.goalHealth} />
            ) : null}
          </DashboardGrid>

          {panelsEnabled.trafficContext ? (
            <TrafficContextV2 data={data.trafficContext} />
          ) : null}
        </div>

        <div className="dash-mobile-only">
          <MobileDetailsAccordion
            goalHealth={
              panelsEnabled.goalHealth ? (
                <GoalHealthV2 data={data.goalHealth} />
              ) : null
            }
            ctaPerformance={
              panelsEnabled.ctaOutcomePerformance ? (
                <CtaOutcomePerformanceV2
                  data={data.ctaOutcomePerformance}
                  activeGoalKey={activeGoalKey}
                />
              ) : null
            }
            trafficContext={
              panelsEnabled.trafficContext ? (
                <TrafficContextV2 data={data.trafficContext} />
              ) : null
            }
          />
        </div>
      </div>
    </DashboardContainer>
  );
}
