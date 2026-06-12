// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync, readFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://www.shelefthechat.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/stories", changefreq: "weekly", priority: "0.9" },
  { path: "/the-real-guides", changefreq: "weekly", priority: "0.9" },
  { path: "/stumbled-upon", changefreq: "weekly", priority: "0.8" },
  { path: "/videos", changefreq: "monthly", priority: "0.7" },
  { path: "/gallery", changefreq: "monthly", priority: "0.6" },
  { path: "/resources", changefreq: "monthly", priority: "0.7" },
  { path: "/quiz", changefreq: "monthly", priority: "0.6" },
];

// Pull story slugs from the data file
const storiesSrc = readFileSync(resolve("src/data/stories.ts"), "utf8");
const storySlugs = Array.from(storiesSrc.matchAll(/slug:\s*"([^"]+)"/g)).map(
  (m) => m[1],
);
const streamMatches = Array.from(
  storiesSrc.matchAll(/slug:\s*"([^"]+)"[\s\S]*?stream:\s*"([^"]+)"/g),
);
const streamMap = new Map(streamMatches.map((m) => [m[1], m[2]]));

const storyEntries: SitemapEntry[] = storySlugs.map((slug) => {
  const stream = streamMap.get(slug);
  const base = stream === "she-actually-did-it" ? "/stories" : "/the-real-guides";
  return { path: `${base}/${slug}`, changefreq: "monthly", priority: "0.7" };
});

// Stumbled-upon slugs are hand-listed in src/pages/StumbledUpon.tsx
const stumbledSrc = readFileSync(resolve("src/pages/StumbledUpon.tsx"), "utf8");
const stumbledSlugs = Array.from(stumbledSrc.matchAll(/slug:\s*"([^"]+)"/g)).map(
  (m) => m[1],
);
const stumbledEntries: SitemapEntry[] = stumbledSlugs.map((slug) => ({
  path: `/stumbled-upon/${slug}`,
  changefreq: "monthly",
  priority: "0.6",
}));

const entries: SitemapEntry[] = [
  ...staticEntries,
  ...storyEntries,
  ...stumbledEntries,
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
