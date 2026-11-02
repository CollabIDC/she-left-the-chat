import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import CalloutCard from "./src/components/CalloutCard";

const internal = renderToStaticMarkup(
  MemoryRouter(
    { initialEntries: ["/"] },
    CalloutCard({
      heading: "Heading A",
      body: "Body A",
      buttonLabel: "GET THE GUIDE",
      buttonLink: "/resources",
    })
  )
);

const external = renderToStaticMarkup(
  MemoryRouter(
    { initialEntries: ["/"] },
    CalloutCard({
      heading: "Heading B",
      body: "Body B",
      buttonLabel: "SEE PRICING",
      buttonLink: "https://example.com",
      variant: "outline",
    })
  )
);

const noButton = renderToStaticMarkup(
  MemoryRouter(
    { initialEntries: ["/"] },
    CalloutCard({ heading: "Heading C", body: "Body C" })
  )
);

console.log("INTERNAL:", internal);
console.log("EXTERNAL:", external);
console.log("NO_BUTTON:", noButton);
console.log("CHECKS", JSON.stringify({
  internalUsesRouterLink: internal.includes('href="/resources"') && internal.includes("btn-gold "),
  internalButtonFullWidthMobile: internal.includes("w-full sm:w-auto"),
  externalOpensNewTab: external.includes('target="_blank"') && external.includes('href="https://example.com"'),
  outlineVariantUsed: external.includes("btn-gold-outline"),
  headingAndBodyRendered: internal.includes("Heading A") && internal.includes("Body A"),
  noButtonWhenOmitted: !noButton.includes("<a") && !noButton.includes("btn-gold"),
}));
