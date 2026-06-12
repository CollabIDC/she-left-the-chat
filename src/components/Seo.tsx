import { Helmet } from "react-helmet-async";

const SITE = "https://www.shelefthechat.com";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  image?: string;
  jsonLd?: object | object[];
}

function absoluteImage(image?: string) {
  if (!image) return undefined;
  if (/^https?:\/\//i.test(image)) return image;
  return `${SITE}${image.startsWith("/") ? "" : "/"}${image}`;
}

export default function Seo({
  title,
  description,
  path,
  ogType = "website",
  image,
  jsonLd,
}: SeoProps) {
  const url = `${SITE}${path}`;
  const absImage = absoluteImage(image) ?? `${SITE}/og-image.jpg`;
  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      {absImage && <meta property="og:image" content={absImage} />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {absImage && <meta name="twitter:image" content={absImage} />}
      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
}
