import { Link } from "react-router-dom";

export interface Product {
  /** Photo src: imported asset, /assets path, or full URL. */
  photo: string;
  /** Product name shown as the card title. */
  name: string;
  /** One line on why it is on the list. */
  why: string;
  /** Destination: full URL (opens in a new tab) or internal path. */
  link: string;
  /** Optional alt text. Falls back to the product name. */
  alt?: string;
}

interface ProductCardProps extends Product {
  /** Button label. Defaults to "Shop". */
  buttonLabel?: string;
  /** Small label under the button. Defaults to "Affiliate link". */
  affiliateLabel?: string;
  /** Optional extra classes for spacing control by the host page. */
  className?: string;
}

const isExternal = (href: string) =>
  /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:");

/**
 * Reusable product card for affiliate roundups.
 *
 * Photo, name, one-line why, Shop button and a small "Affiliate link" label.
 * The button reuses the site's existing gold button styles, and the card
 * reuses existing tokens (surface, border, rounded-2xl, card-elevated) so it
 * matches the rest of the site without a new colour scheme.
 *
 * Sized for a 2-up mobile grid: the button stretches full width on phones
 * and shrinks to its text from tablet up.
 */
const ProductCard = ({
  photo,
  name,
  why,
  link,
  alt,
  buttonLabel = "Shop",
  affiliateLabel = "Affiliate link",
  className = "",
}: ProductCardProps) => {
  const buttonClass = `${
    isExternal(link) ? "btn-gold" : "btn-gold-outline"
  } w-full justify-center px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base`;

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface card-elevated ${className}`.trim()}
    >
      <div className="relative overflow-hidden">
        <img
          src={photo}
          alt={alt ?? name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="font-display text-base font-semibold leading-snug text-charcoal sm:text-lg">
          {name}
        </h3>

        <p className="mt-1.5 font-body text-xs leading-relaxed text-charcoal/70 sm:mt-2 sm:text-sm">
          {why}
        </p>

        <div className="mt-auto pt-3 sm:pt-4">
          {isExternal(link) ? (
            <a
              href={link}
              className={buttonClass}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              {buttonLabel}
            </a>
          ) : (
            <Link to={link} className={buttonClass}>
              {buttonLabel}
            </Link>
          )}

          <p className="mt-2 text-center font-label text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">
            {affiliateLabel}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
