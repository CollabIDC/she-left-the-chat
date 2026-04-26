import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "ivory" | "charcoal";
}

const sizes = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-5xl md:text-6xl",
};

/**
 * Brand logo treatment:
 *  - "she left" — bold serif
 *  - "the chat" — italic serif, slightly smaller
 *  - always lowercase
 */
const Logo = ({ className, size = "md", tone = "charcoal" }: LogoProps) => {
  const color = tone === "ivory" ? "text-ivory" : "text-charcoal";
  return (
    <span
      className={cn(
        "font-display leading-none lowercase select-none",
        sizes[size],
        color,
        className,
      )}
      aria-label="she left the chat"
    >
      <span className="font-bold">she left</span>{" "}
      <span className="italic font-normal" style={{ fontSize: "0.85em" }}>
        the chat
      </span>
    </span>
  );
};

export default Logo;
