import { Link } from "react-router-dom";

interface CalloutCardProps {
  /** Card heading. Rendered in the site's display serif. */
  heading: string;
  /** Body copy shown under the heading. */
  body: string;
  /** Button label. If omitted, no button is rendered. */
  buttonLabel?: string;
  /** Button destination: internal path ("/resources") or full URL / mailto. */
  buttonLink?: string;
  /** "solid" (default) or "outline". Both reuse the existing button styles. */
  variant?: "solid" | "outline";
  /** Optional extra classes for spacing/width control by the host page. */
  className?: string;
}

const isExternal = (href: string) =>
  /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:");

/**
 * Reusable callout card.
 *
 * Full width on mobile (the card and its button stretch edge to edge inside
 * the parent column), inline from tablet up. Heading, body, button label and
 * button link are all props, and the button reuses the site's existing gold
 * button styles rather than a new one.
 */
const CalloutCard = ({
  heading,
  body,
  buttonLabel,
  buttonLink,
  variant = "solid",
  className = "",
}: CalloutCardProps) => {
  const buttonClass = `${variant === "outline" ? "btn-gold-outline" : "btn-gold"} w-full sm:w-auto justify-center`;

  return (
    <div
      className={`w-full bg-surface border border-border rounded-2xl px-5 py-6 sm:px-8 sm:py-8 card-elevated ${className}`.trim()}
    >
      <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal leading-snug">
        {heading}
      </h3>
      <p className="font-body text-sm sm:text-base leading-relaxed text-charcoal mt-2 sm:mt-3">
        {body}
      </p>

      {buttonLabel && buttonLink && (
        <div className="mt-5 sm:mt-6">
          {isExternal(buttonLink) ? (
            <a
              href={buttonLink}
              className={buttonClass}
              target={buttonLink.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              {buttonLabel}
            </a>
          ) : (
            <Link to={buttonLink} className={buttonClass}>
              {buttonLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default CalloutCard;
