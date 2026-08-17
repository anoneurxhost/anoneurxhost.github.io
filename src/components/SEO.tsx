import { Helmet } from "react-helmet-async";

const SITE = "https://anoneurx.com";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: object | object[];
  noindex?: boolean;
  keywords?: string;
}

/**
 * Sitewide SEO component. Sets title (format: "Anoneurx | X"),
 * meta description, canonical, Open Graph, Twitter Card, and optional JSON-LD.
 */
const SEO = ({
  title,
  description = "Anoneurx — innovative software, operating systems, AI, cloud, and open source built for developers.",
  path = "/",
  image,
  type = "website",
  jsonLd,
  noindex,
  keywords,
}: SEOProps) => {
  const fullTitle = title ? `Anoneurx | ${title}` : "Anoneurx";
  const url = `${SITE}${path}`;
  const ogImage = image ? (image.startsWith("http") ? image : `${SITE}${image}`) : undefined;

  const ldArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <>
          <link rel="canonical" href={url} />

          <meta property="og:title" content={fullTitle} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={url} />
          <meta property="og:type" content={type} />
          <meta property="og:site_name" content="Anoneurx" />
          {ogImage && <meta property="og:image" content={ogImage} />}

          <meta name="twitter:card" content={ogImage ? "summary_large_image" : "summary"} />
          <meta name="twitter:title" content={fullTitle} />
          <meta name="twitter:description" content={description} />
          {ogImage && <meta name="twitter:image" content={ogImage} />}
        </>
      )}

      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
