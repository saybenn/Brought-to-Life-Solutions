import { useRouter } from "next/router";
import Hero from "@/components/Hero";
import { Meta } from "@/lib/seo";

export default function CollectionStage() {
  const { query } = useRouter();
  const stage = query.stage || "stage";
  return (
    <>
      <Meta
        title={`Collections · ${stage}`}
        description="Curated sets by journey stage."
      />
      <Hero
        title={`Collection: ${stage}`}
        subtitle="Curated items for this stage."
        tone="ivory"
      />
    </>
  );
}
