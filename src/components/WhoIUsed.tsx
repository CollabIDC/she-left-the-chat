import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface Business {
  /** Business name shown as the row title. */
  name: string;
  /** What they do, one line. */
  does: string;
  /** Destination: full URL (opens in a new tab) or internal path. */
  link: string;
  /** Optional short note, e.g. what was used or where. */
  note?: string;
}

interface WhoIUsedProps {
  /** Businesses to list, in order. Each accepts name, does, link, note. */
  items: Business[];
  /** Optional section heading, in the site's display serif. */
  heading?: string;
  /** Optional line under the heading. */
  subheading?: string;
  /** Optional small uppercase label above the heading. */
  eyebrow?: string;
  /** Label on every row link. Defaults to "Visit". */
  linkLabel?: string;
  /** Optional extra classes for spacing control by the host page. */
  className?: string;
}

const isExternal = (href: string) =>
  /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:");

/**
 * Reusable "Who I Used" directory.
 *
 * A simple divided list of businesses: name, what they do, and a link. One
 * column on phones (the link drops under the text and stretches full width),
 * and the link sits on the right from tablet up. Uses the site's existing
 * tokens and card styles only, no new colour scheme or button style.
 */
const WhoIUsed = ({
  items,
  heading,
  subheading,
  eyebrow,
  linkLabel = "Visit",
  className = "",
}: WhoIUsedProps) => {
  if (!items.length) return null;

  return (
    <section
      className={cn("w-full", className)}
      aria-label={heading ?? "Who I used"}
    >
      {(eyebrow || heading || subheading) && (
        <header className="mb-6 sm:mb-8">
          {eyebrow && <p className="label-eyebrow mb-2 sm:mb-3">{eyebrow}</p>}
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

      <ul className="w-full divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface card-elevated">
        {items.map((item, i) => (
          <li
            key={`${item.name}-${i}`}
            className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7 sm:py-6"
          >
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold leading-snug text-charcoal sm:text-xl">
                {item.name}
              </h3>
              <p className="mt-1 font-body text-sm leading-relaxed text-charcoal/70 sm:text-base">
                {item.does}
              </p>
              {item.note && (
                <p className="mt-1 font-body text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {item.note}
                </p>
              )}
            </div>

            <div className="shrink-0">
              {isExternal(item.link) ? (
                <a
                  href={item.link}
                  target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer sponsored"
                  className="btn-gold-outline w-full justify-center px-5 py-2.5 text-sm sm:w-auto sm:px-6 sm:py-2.5"
                >
                  {linkLabel}
                </a>
              ) : (
                <Link
                  to={item.link}
                  className="btn-gold-outline w-full justify-center px-5 py-2.5 text-sm sm:w-auto sm:px-6 sm:py-2.5"
                >
                  {linkLabel}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhoIUsed;
