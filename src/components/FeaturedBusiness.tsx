import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FeaturedBusinessProps {
  /** Business name, in the site's display serif. */
  name: string;
  /** Description shown under the name. */
  description: string;
  /** Destination: full URL (opens in a new tab) or internal path. */
  link: string;
  /** Show the partnership label. Off by default. */
  paidPartnership?: boolean;
  /** Partnership label text. Defaults to "Paid partnership". */
  partnershipLabel?: string;
  /** Optional photo. Omit for a text-only card. */
  photo?: string;
  /** Optional alt text. Falls back to the business name. */
  alt?: string;
  /** Button label. Defaults to "Visit". */
  buttonLabel?: string;
  /** "solid" (default) or "outline". Both reuse the existing button styles. */
  variant?: "solid" | "outline";
  /** Optional extra classes for spacing control by the host page. */
  className?: string;
}

const isExternal = (href: string) =>
  /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:");

/**
 * Reusable featured business card.
 *
 * Full width on mobile (the card and its button stretch edge to edge inside
 * the parent column). Name, description, link, button label and the
 * partnership label are all props, and the partnership line only renders when
 * `paidPartnership` is true. Reuses the site's existing tokens, card styles
 * and gold button styles only, no new colour scheme.
 */
const FeaturedBusiness = ({
  name,
  description,
  link,
  paidPartnership = false,
  partnershipLabel = "Paid partnership",
  photo,
  alt,
  buttonLabel = "Visit",
  variant = "solid",
  className = "",
}: FeaturedBusinessProps) => {
  const buttonClass = `${
    variant === "outline" ? "btn-gold-outline" : "btn-gold"
  } w-full justify-center px-5 py-2.5 text-sm sm:px-7 sm:py-3 sm:text-base`;

  return (
    <article
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface card-elevated",
        className,
      )}
    >
      {paidPartnership && (
        <p
          data-partnership-label
          className="border-b border-border bg-blush/60 px-5 py-2 text-center font-label text-[10px] font-medium uppercase tracking-[0.18em] text-charcoal sm:text-[11px]"
        >
          {partnershipLabel}
        </p>
      )}

      {photo && (
        <img
          src={photo}
          alt={alt ?? name}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover"
        />
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <h3 className="font-display text-xl font-semibold leading-snug text-charcoal sm:text-2xl">
          {name}
        </h3>

        <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/70 sm:text-base">
          {description}
        </p>

        <div className="mt-auto pt-5 sm:pt-6">
          {isExternal(link) ? (
            <a
              href={link}
              className={buttonClass}
              target={link.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                paidPartnership
                  ? "noopener noreferrer sponsored"
                  : "noopener noreferrer"
              }
            >
              {buttonLabel}
            </a>
          ) : (
            <Link to={link} className={buttonClass}>
              {buttonLabel}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default FeaturedBusiness;
