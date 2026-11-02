import ProductCard, { type Product } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

export type { Product };

interface ShopThisListProps {
  /** Products to render, in order. Each accepts photo, name, why, link. */
  items: Product[];
  /** Optional section heading above the grid, in the site's display serif. */
  heading?: string;
  /** Optional line under the heading. */
  subheading?: string;
  /** Optional small uppercase label above the heading. */
  eyebrow?: string;
  /** Desktop column count: 3 (default) or 4. Mobile is always 2. */
  desktopColumns?: 3 | 4;
  /** Button label passed to every card. Defaults to "Shop". */
  buttonLabel?: string;
  /** Label under every button. Defaults to "Affiliate link". */
  affiliateLabel?: string;
  /** Optional extra classes for spacing control by the host page. */
  className?: string;
}

/**
 * Reusable "Shop This List" grid.
 *
 * Renders ProductCards: 2 columns on phones, 3 columns from tablet up, and 4
 * from large desktop up when desktopColumns is 4. Uses the site's existing
 * container widths and card styles only, no new colour scheme or button style.
 */
const ShopThisList = ({
  items,
  heading,
  subheading,
  eyebrow,
  desktopColumns = 3,
  buttonLabel,
  affiliateLabel,
  className = "",
}: ShopThisListProps) => {
  if (!items.length) return null;

  return (
    <section
      className={cn("w-full", className)}
      aria-label={heading ?? "Shop this list"}
    >
      {(eyebrow || heading || subheading) && (
        <header className="mb-6 sm:mb-8">
          {eyebrow && (
            <p className="label-eyebrow mb-2 sm:mb-3">{eyebrow}</p>
          )}
          {heading && (
            <h2 className="font-display text-2xl font-semibold leading-snug text-charcoal sm:text-3xl">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-charcoal/70 sm:text-base">
              {subheading}
            </p>
          )}
        </header>
      )}

      <div
        className={cn(
          "grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3",
          desktopColumns === 4 && "xl:grid-cols-4",
        )}
      >
        {items.map((item, i) => (
          <ProductCard
            key={`${item.name}-${i}`}
            {...item}
            buttonLabel={buttonLabel}
            affiliateLabel={affiliateLabel}
          />
        ))}
      </div>
    </section>
  );
};

export default ShopThisList;
