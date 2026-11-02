import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Stay22EmbedProps {
  /**
   * The raw Stay22 embed snippet, exactly as Stay22 supplies it (usually a
   * <script> tag, sometimes a full iframe block). Nothing is generated or
   * guessed here: without this prop the component renders nothing.
   */
  snippet?: string;
  /** Optional React content instead of a raw snippet (e.g. your own iframe). */
  children?: ReactNode;
  /** Optional heading shown above the embed. */
  heading?: string;
  /** Optional line under the heading. */
  subheading?: string;
  /**
   * Space to reserve once a snippet exists, in px, so the page does not jump
   * while the embed loads. Ignored when there is no snippet.
   */
  minHeight?: number;
  /** Optional extra classes for spacing control by the host page. */
  className?: string;
}

/**
 * Reusable Stay22 embed block.
 *
 * Full width, uses existing site styles only, and renders nothing at all
 * until a real snippet is handed to it. When a snippet is present its markup
 * is injected and any <script> tags are re-created so the embed actually
 * boots (browsers do not run scripts inserted via innerHTML).
 *
 * No snippet markup, widget ID or affiliate code lives in this file.
 */
const Stay22Embed = ({
  snippet,
  children,
  heading,
  subheading,
  minHeight,
  className = "",
}: Stay22EmbedProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const hasEmbed = Boolean(snippet?.trim()) || Boolean(children);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !snippet?.trim()) return;

    host.innerHTML = snippet;

    const scripts = Array.from(host.querySelectorAll("script"));
    scripts.forEach((old) => {
      const fresh = document.createElement("script");
      Array.from(old.attributes).forEach((attr) =>
        fresh.setAttribute(attr.name, attr.value),
      );
      fresh.text = old.text;
      old.replaceWith(fresh);
    });
  }, [snippet]);

  if (!hasEmbed) return null;

  return (
    <section
      className={cn("w-full", className)}
      aria-label={heading ?? "Stay22 booking widget"}
    >
      {(heading || subheading) && (
        <header className="mb-4 sm:mb-6">
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
        ref={hostRef}
        data-stay22-embed=""
        className="w-full overflow-x-auto"
        style={minHeight ? { minHeight } : undefined}
      >
        {children}
      </div>
    </section>
  );
};

export default Stay22Embed;
