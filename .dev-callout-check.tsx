import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import CalloutCard from "./src/components/CalloutCard";

const render = (props: Record<string, unknown>) =>
  renderToStaticMarkup(
    h(MemoryRouter, { initialEntries: ["/"] }, h(CalloutCard, props))
  );

const internal = render({
  heading: "Heading A",
  body: "Body A",
  buttonLabel: "GET THE GUIDE",
  buttonLink: "/resources",
});

const external = render({
  heading: "Heading B",
  body: "Body B",
  buttonLabel: "SEE PRICING",
  buttonLink: "https://example.com",
  variant: "outline",
});

const noButton = render({ heading: "Heading C", body: "Body C" });

console.log("INTERNAL:", internal);
console.log("EXTERNAL:", external);
console.log("NO_BUTTON:", noButton);
console.log(
  "CHECKS",
  JSON.stringify({
    internalUsesRouterLink:
      internal.includes('href="/resources"') && internal.includes("btn-gold "),
    buttonFullWidthOnMobile: internal.includes("w-full sm:w-auto"),
    externalOpensNewTab:
      external.includes('target="_blank"') &&
      external.includes('href="https://example.com"'),
    outlineVariantUsed: external.includes("btn-gold-outline"),
    headingAndBodyRendered:
      internal.includes("Heading A") && internal.includes("Body A"),
    noButtonWhenOmitted:
      !noButton.includes("<a") && !noButton.includes("btn-gold"),
  })
);
