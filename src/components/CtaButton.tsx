import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  /** Button text. */
  label: string;
  /** Destination: internal path ("/resources"), full URL, or mailto. */
  link: string;
  /** "solid" (default) or "outline". Both are the site's existing gold styles. */
  variant?: "solid" | "outline";
  /** Adds "sponsored" to the link relationship for affiliate destinations. */
  affiliate?: boolean;
  /** Stretches edge to edge on phones and shrinks to its text from tablet up. */
  fullWidthOnMobile?: boolean;
  /** Optional extra classes for spacing control by the host page. */
  className?: string;
}

const isExternal = (href: string) =>
  /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:");

/**
 * Reusable call to action button.
 *
 * Uses the site's existing primary button styles only: `btn-gold` for the
 * solid version and `btn-gold-outline` for the outline version, both already
 * defined in the global stylesheet and used across the site. No new button
 * style is introduced here.
 *
 * External links (and mailto) open in a new tab. Internal paths stay in the
 * same tab through the router.
 */
const CtaButton = ({
  label,
  link,
  variant = "solid",
  affiliate = false,
  fullWidthOnMobile = true,
  className = "",
}: CtaButtonProps) => {
  const base = variant === "outline" ? "btn-gold-outline" : "btn-gold";
  const classes = cn(
    base,
    fullWidthOnMobile && "w-full justify-center sm:w-auto",
    className,
  );

  if (isExternal(link)) {
    const rel = affiliate
      ? "noopener noreferrer sponsored"
      : "noopener noreferrer";
    return (
      <a
        href={link}
        className={classes}
        target={link.startsWith("mailto:") ? undefined : "_blank"}
        rel={rel}
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={link} className={classes}>
      {label}
    </Link>
  );
};

export default CtaButton;
