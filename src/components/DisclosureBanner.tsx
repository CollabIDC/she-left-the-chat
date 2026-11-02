interface DisclosureBannerProps {
  /** Optional extra classes for spacing/width control by the host page. */
  className?: string;
}

const DISCLOSURE_TEXT =
  "This post contains affiliate links. If you buy through them, we may earn a commission at no extra cost to you.";

/**
 * Slim affiliate-disclosure strip.
 *
 * Intended placement: directly below a post's title/intro block and before
 * any post content. Uses existing site tokens only (surface, border,
 * terracotta label, charcoal body) so it matches every post without a new
 * colour scheme or button style.
 */
const DisclosureBanner = ({ className = "" }: DisclosureBannerProps) => {
  return (
    <aside
      role="note"
      aria-label="Affiliate disclosure"
      className={`max-w-3xl mx-auto w-full bg-surface border border-border rounded-2xl px-5 py-4 sm:px-7 sm:py-5 ${className}`.trim()}
    >
      <p className="label-eyebrow text-[10px] sm:text-xs mb-1.5 sm:mb-2">
        Affiliate disclosure
      </p>
      <p className="font-body text-sm sm:text-base leading-relaxed text-charcoal">
        {DISCLOSURE_TEXT}
      </p>
    </aside>
  );
};

export default DisclosureBanner;
