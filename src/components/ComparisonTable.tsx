import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface ComparisonColumn {
  /** Key used to look this value up in a row's `specs`. */
  key: string;
  /** Column heading shown on desktop and the label shown on mobile cards. */
  label: string;
}

export interface ComparisonRow {
  /** Provider name. */
  name: string;
  /** Optional short line under the name. */
  blurb?: string;
  /** Optional small tag, e.g. "Editor's pick". */
  badge?: string;
  /** Values keyed by column key. Leave a value out or blank and it shows "Add". */
  specs: Record<string, string>;
  /** Destination for this row's button. "#" is the editable placeholder. */
  link: string;
  /** Button label for this row. Defaults to "Shop". */
  linkLabel?: string;
}

interface ComparisonTableProps {
  /** Rows to show. Defaults to Jetpac, Holafly, Airalo and Saily. */
  rows?: ComparisonRow[];
  /** Columns to compare. Defaults to Price, Data, Validity, Hotspot, Coverage. */
  columns?: ComparisonColumn[];
  /** Optional small uppercase label above the heading. */
  eyebrow?: string;
  /** Optional section heading. */
  heading?: string;
  /** Optional line under the heading. */
  subheading?: string;
  /** Small label under every button. Set to "" to hide it. */
  affiliateLabel?: string;
  /** Optional extra classes for spacing control by the host page. */
  className?: string;
}

const DEFAULT_COLUMNS: ComparisonColumn[] = [
  { key: "price", label: "Price" },
  { key: "data", label: "Data" },
  { key: "validity", label: "Validity" },
  { key: "hotspot", label: "Hotspot" },
  { key: "coverage", label: "Coverage" },
];

/**
 * Default rows carry no figures and no destinations: every link is "#" and
 * every value is blank, so nothing is claimed until real data is supplied.
 */
const DEFAULT_ROWS: ComparisonRow[] = [
  { name: "Jetpac", specs: {}, link: "#" },
  { name: "Holafly", specs: {}, link: "#" },
  { name: "Airalo", specs: {}, link: "#" },
  { name: "Saily", specs: {}, link: "#" },
];

const isExternal = (href: string) =>
  /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:");
const isInternal = (href: string) => href.startsWith("/");

const RowButton = ({
  row,
  block,
}: {
  row: ComparisonRow;
  block?: boolean;
}) => {
  const { link, linkLabel = "Shop" } = row;
  const buttonClass = `${
    isExternal(link) ? "btn-gold" : "btn-gold-outline"
  } ${block ? "w-full justify-center px-4 py-2.5 text-sm" : "px-4 py-2 text-sm"} whitespace-nowrap`;

  if (isExternal(link)) {
    return (
      <a
        href={link}
        className={buttonClass}
        target="_blank"
        rel="noopener noreferrer sponsored"
      >
        {linkLabel}
      </a>
    );
  }

  if (isInternal(link)) {
    return (
      <Link to={link} className={buttonClass}>
        {linkLabel}
      </Link>
    );
  }

  // Placeholder destination ("#" or anything unqualified): no new tab, no
  // sponsored claim, and flagged so it is easy to find and replace.
  return (
    <a href={link} className={buttonClass} data-placeholder-link="">
      {linkLabel}
    </a>
  );
};

/**
 * Reusable provider comparison table.
 *
 * Desktop (tablet and up) gets a real table. Phones get stacked cards, one per
 * provider, with each value labelled so nothing is squeezed into a narrow
 * column. Reuses existing site styles only: surface, border, rounded-2xl,
 * label-eyebrow, and the existing gold button styles.
 */
const ComparisonTable = ({
  rows = DEFAULT_ROWS,
  columns = DEFAULT_COLUMNS,
  eyebrow,
  heading,
  subheading,
  affiliateLabel = "Affiliate link",
  className = "",
}: ComparisonTableProps) => {
  if (!rows.length) return null;

  const cell = (value?: string) =>
    value?.trim() ? (
      <span className="font-body text-sm text-charcoal">{value}</span>
    ) : (
      <span className="font-body text-sm italic text-muted-foreground">
        Add
      </span>
    );

  return (
    <section
      className={cn("w-full", className)}
      aria-label={heading ?? "Provider comparison"}
    >
      {(eyebrow || heading || subheading) && (
        <header className="mb-5 sm:mb-7">
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

      {/* ───────── Tablet and up: table ───────── */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-surface card-elevated md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-ivory">
              <th className="px-4 py-3 font-label text-[11px] font-medium uppercase tracking-[0.16em] text-charcoal/70">
                Provider
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 font-label text-[11px] font-medium uppercase tracking-[0.16em] text-charcoal/70"
                >
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3">
                <span className="sr-only">Go to</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={`${row.name}-${i}`}
                className="border-b border-border last:border-b-0"
              >
                <td className="px-4 py-4">
                  <span className="font-display text-base font-semibold text-charcoal">
                    {row.name}
                  </span>
                  {row.badge && (
                    <span className="ml-2 rounded-full bg-gold px-2.5 py-0.5 font-label text-[10px] uppercase tracking-[0.16em] text-charcoal">
                      {row.badge}
                    </span>
                  )}
                  {row.blurb && (
                    <span className="mt-1 block font-body text-xs text-charcoal/60">
                      {row.blurb}
                    </span>
                  )}
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-4">
                    {cell(row.specs[column.key])}
                  </td>
                ))}
                <td className="px-4 py-4 text-right">
                  <RowButton row={row} />
                  {affiliateLabel && (
                    <span className="mt-1.5 block font-label text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {affiliateLabel}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ───────── Phones: stacked cards ───────── */}
      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((row, i) => (
          <article
            key={`${row.name}-${i}`}
            className="rounded-2xl border border-border bg-surface p-4 card-elevated"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold text-charcoal">
                {row.name}
              </h3>
              {row.badge && (
                <span className="rounded-full bg-gold px-2.5 py-0.5 font-label text-[10px] uppercase tracking-[0.16em] text-charcoal">
                  {row.badge}
                </span>
              )}
            </div>

            {row.blurb && (
              <p className="mt-1 font-body text-xs text-charcoal/60">
                {row.blurb}
              </p>
            )}

            <dl className="mt-3 border-t border-border">
              {columns.map((column) => (
                <div
                  key={column.key}
                  className="flex items-baseline justify-between gap-3 border-b border-border py-2 last:border-b-0"
                >
                  <dt className="font-label text-[11px] uppercase tracking-[0.16em] text-charcoal/60">
                    {column.label}
                  </dt>
                  <dd className="text-right">{cell(row.specs[column.key])}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-3">
              <RowButton row={row} block />
              {affiliateLabel && (
                <p className="mt-2 text-center font-label text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {affiliateLabel}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ComparisonTable;
