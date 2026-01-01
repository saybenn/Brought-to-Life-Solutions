import Head from "next/head";
import ShopPageShell from "@/components/shop/ShopPageShell";
import ShopIntroBand from "@/components/shop/ShopIntroBand";
import OfferGrid from "@/components/shop/OfferGrid";
import { OFFERS } from "@/lib/catalog/offers";

export default function ShopPage() {
  return (
    <>
      <Head>
        <title>Shop | Brought to Life Solutions</title>
        <meta
          name="description"
          content="Tools and systems to build predictable revenue—choose what fits your stage."
        />
      </Head>

      <ShopPageShell>
        <main className="pt-0">
          <ShopIntroBand />
          <OfferGrid offers={OFFERS} />
        </main>
      </ShopPageShell>
    </>
  );
}
