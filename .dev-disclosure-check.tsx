import { renderToStaticMarkup } from "react-dom/server";
import DisclosureBanner from "./src/components/DisclosureBanner";

const html = renderToStaticMarkup(DisclosureBanner({}));
const expected =
  "This post contains affiliate links. If you buy through them, we may earn a commission at no extra cost to you.";

console.log("RENDERED:", html);
console.log("HAS_EXACT_TEXT:", html.includes(expected));
console.log("IMPORT_OK:", typeof DisclosureBanner === "function");
