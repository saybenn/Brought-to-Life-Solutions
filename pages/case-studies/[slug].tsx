// /pages/case-studies/[slug].tsx

import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import type { CaseStudy } from "@/lib/catalog/types";
import { CASE_STUDIES, CASE_STUDY_BY_SLUG } from "@/lib/casestudy/data";

type CaseStudySlugPageProps = {
  study: CaseStudy;
};

export default function CaseStudySlugPage({ study }: CaseStudySlugPageProps) {
  const title =
    study.meta?.title ??
    `${study.clientName} Case Study — ${study.heroHeadline} | Brought To Life Solutions`;

  const description = study.meta?.description ?? study.heroSubhead;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={study.assets.hero.src} />
      </Head>

      <CaseStudyPage study={study} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: CASE_STUDIES.map((study) => ({
      params: { slug: study.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CaseStudySlugPageProps> = async (
  ctx,
) => {
  const slug = String(ctx.params?.slug || "");
  const study = CASE_STUDY_BY_SLUG[slug];

  if (!study) return { notFound: true };

  return {
    props: { study },
  };
};
