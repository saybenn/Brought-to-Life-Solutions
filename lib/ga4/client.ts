import { BetaAnalyticsDataClient } from "@google-analytics/data";

let ga4ClientSingleton: BetaAnalyticsDataClient | null = null;

type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
  project_id?: string;
};

function assertNonEmpty(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function getServiceAccountFromJsonEnv(): ServiceAccountCredentials | null {
  const raw = process.env.GA4_SERVICE_ACCOUNT_JSON;
  if (!assertNonEmpty(raw)) return null;

  let parsed: Record<string, unknown>;

  try {
    parsed = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    throw new Error("GA4_SERVICE_ACCOUNT_JSON is not valid JSON.");
  }

  const clientEmail =
    typeof parsed.client_email === "string" ? parsed.client_email : undefined;

  const privateKey =
    typeof parsed.private_key === "string"
      ? parsed.private_key.replace(/\\n/g, "\n")
      : undefined;

  const projectId =
    typeof parsed.project_id === "string" ? parsed.project_id : undefined;

  if (!clientEmail || !privateKey) {
    throw new Error(
      "GA4_SERVICE_ACCOUNT_JSON is missing required client_email or private_key."
    );
  }

  return {
    client_email: clientEmail,
    private_key: privateKey,
    project_id: projectId,
  };
}

export function getGa4Client(): BetaAnalyticsDataClient {
  if (ga4ClientSingleton) return ga4ClientSingleton;

  const serviceAccount = getServiceAccountFromJsonEnv();

  if (serviceAccount) {
    ga4ClientSingleton = new BetaAnalyticsDataClient({
      projectId: serviceAccount.project_id,
      credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      },
    });

    return ga4ClientSingleton;
  }

  const projectId =
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.GCLOUD_PROJECT ||
    process.env.GOOGLE_PROJECT_ID;

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (assertNonEmpty(projectId) && assertNonEmpty(clientEmail) && assertNonEmpty(privateKey)) {
    ga4ClientSingleton = new BetaAnalyticsDataClient({
      projectId,
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, "\n"),
      },
    });

    return ga4ClientSingleton;
  }

  if (assertNonEmpty(credentialsPath) || assertNonEmpty(projectId)) {
    ga4ClientSingleton = new BetaAnalyticsDataClient();
    return ga4ClientSingleton;
  }

  throw new Error(
    "GA4 client is not configured. Provide GA4_SERVICE_ACCOUNT_JSON, or GOOGLE_APPLICATION_CREDENTIALS, or GOOGLE_CLOUD_PROJECT + GOOGLE_CLIENT_EMAIL + GOOGLE_PRIVATE_KEY."
  );
}

export function toGa4PropertyPath(propertyId: string): string {
  const trimmed = propertyId.replace(/^properties\//, "").trim();

  if (!trimmed) {
    throw new Error("Missing GA4 property ID.");
  }

  return `properties/${trimmed}`;
}