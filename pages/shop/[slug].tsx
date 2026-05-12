// /pages/products/[slug].tsx
import Head from "next/head";
import Error from "next/error";
import { useRouter } from "next/router";
import ShopPageShell from "@/components/shop/ShopPageShell";
import OfferDetailPage from "@/components/products/OfferDetailPage";
import { getOfferBySlug, getOfferDetailBySlug } from "@/lib/catalog/selectors";

export default function ProductSlugPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : null;

  if (!slug) return null;

  const offer = getOfferBySlug(slug);
  const detail = getOfferDetailBySlug(slug);

  if (!offer || !detail) {
    return <Error statusCode={404} />;
  }

  const metaTitle =
    detail.meta?.title ?? `${detail.title} | Brought to Life Solutions`;
  const metaDesc = detail.meta?.description ?? offer.outcomeHeadline;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
      </Head>

      <ShopPageShell>
        <OfferDetailPage offer={offer} detail={detail} />
      </ShopPageShell>
    </>
  );
}
