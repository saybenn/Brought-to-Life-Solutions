export type CaseStudyImage = {
  src: string;
  alt: string;
};

export type CaseStudyEvidenceAsset = CaseStudyImage & {
  kind: "desktop" | "mobile" | string;
};

export type CaseStudyCta = {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type CaseStudyPillar = {
  title: string;
  bullets: string[];
};

export type CaseStudyOutcome = {
  label: string;
  value: string;
  note?: string;
};

export type CaseStudyTestimonial = {
  quote: string;
  name: string;
  org: string;
};

export type CaseStudyMobileEvidence = {
  eyebrow: string;
  description: string;
};

export type CaseStudyAssets = {
  hero: CaseStudyImage;
  supportingHero: CaseStudyImage;
  evidence: CaseStudyEvidenceAsset[];
};

export type CaseStudyMeta = {
  title: string;
  description: string;
};

export type CaseStudy = {
  id?: string;
  slug: string;

  clientName: string;
  industry: string;
  location: string;

  eyebrow: string;
  heroHeadline: string;
  heroSubhead: string;

  contextLabel: string;
  contextBody: string[];
  contextPullQuote: string;

  problemTitle: string;
  problemBullets: string[];
  problemCloser?: string;

  systemTitle: string;
  systemIntro: string;
  pillars: CaseStudyPillar[];

  frameworkLabel: string;
  socketsLine: string;
  sockets: string[];

  resultingTitle: string;
  resultingCaption: string;
  mobileEvidence?: CaseStudyMobileEvidence;

  outcomesTitle: string;
  outcomes: CaseStudyOutcome[];
  outcomesCloser?: string;

  testimonial: CaseStudyTestimonial;

  qualifyTitle: string;
  qualifyFor: string[];
  qualifyNotFor: string[];

  cta: CaseStudyCta;

  assets: CaseStudyAssets;

  meta?: CaseStudyMeta;
};