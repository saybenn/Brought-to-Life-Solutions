// /components/shop/ShopCard.tsx
import Link from "next/link";
import Image from "next/image";
import { formatPriceRange, starArray } from "@/lib/format";
import type { Product } from "@/lib/catalog/types";

function Stars({ rating }: { rating: number }) {
  const { full, half, empty } = starArray(rating);
  const star = (
    <svg viewBox="0 0 20 20" className="h-4 w-4">
      <path
        d="M10 1.5l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 15.9 4.6 18.3l1-6.1L1.2 7.9l6.1-.9L10 1.5z"
        fill="currentColor"
      />
    </svg>
  );
  const halfStar = (
    <svg viewBox="0 0 20 20" className="h-4 w-4">
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.5l2.7 5.5 6.1.9-4.4 4.3 1 6.1L10 15.9 4.6 18.3l1-6.1L1.2 7.9l6.1-.9L10 1.5z"
        fill="url(#half)"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
  return (
    <div className="flex items-center gap-1 text-[var(--ink-700)]">
      {[...Array(full)].map((_, i) => (
        <span key={`f-${i}`} className="text-[var(--green-forest-700)]">
          {star}
        </span>
      ))}
      {[...Array(half)].map((_, i) => (
        <span key={`h-${i}`} className="text-[var(--green-forest-700)]">
          {halfStar}
        </span>
      ))}
      {[...Array(empty)].map((_, i) => (
        <span key={`e-${i}`} className="opacity-30">
          {star}
        </span>
      ))}
    </div>
  );
}

export default function ShopCard({ product }: { product: Product }) {
  const priceLabel = formatPriceRange(product.pricing);
  const includesPreview = product.includes.slice(0, 2).join(" • ");

  return (
    <div className="card overflow-hidden hover:translate-y-[1px] transition-transform">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block">
        <div
          className="relative w-full bg-[var(--bg-sand)]"
          style={{ aspectRatio: "4 / 3" }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 33vw, 100vw"
            priority={product.isFeatured}
          />
        </div>
      </Link>

      {/* Body */}
      <div className="p-4">
        <div className="eyebrow">{product.stage.toUpperCase()}</div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="h2 mt-1 text-[length:var(--size-xl)] leading-[var(--leading-tight)]">
            {product.title}
          </h3>
        </Link>

        <p className="mt-2 text-[var(--ink-700)]">{product.blurb}</p>

        {/* Meta row */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="caption">
              {product.rating.toFixed(1)} ({product.ratingCount})
            </span>
          </div>
          <div className="caption">{product.duration}</div>
        </div>

        {/* Includes preview */}
        <div className="mt-2 caption text-[var(--ink-700)]">
          {includesPreview}
        </div>

        {/* Price & CTA */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-[var(--ink-900)] font-semibold flex items-center gap-2">
            <span>{priceLabel}</span>
            {product.pricing.note && (
              <span className="caption text-[var(--ink-700)]">
                ({product.pricing.note})
              </span>
            )}
          </div>
          <button className="btn btn-primary">Learn More</button>
        </div>
      </div>
    </div>
  );
}
