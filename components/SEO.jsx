import Head from "next/head";

export default function SEO(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <link rel="icon" href={props.favicon} />

      {/* og */}
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />
      <meta property="og:url" content={props.url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={props.name} />
      <meta name="copyright" content={props.name} />

      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={props.url} />
      <meta name="twitter:creator" content={props.name} />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />
    </Head>
  );
}
