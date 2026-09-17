import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteUrl = "https://thi-ha-zaw.vercel.app";
  const description =
    "Thi Ha Zaw is a software engineer focused on full-stack development, backend systems, realtime applications, systems engineering, and product development.";

  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Thi Ha Zaw" />
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="Thi Ha Zaw, zerozet22k, Software Engineer, Full-Stack Developer, Backend Engineer, TypeScript, Node.js, Next.js, React, Redis, Realtime Systems, C++, Unreal Engine"
        />

        <meta
          property="og:title"
          content="Thi Ha Zaw - Software Engineer | Full-Stack, Backend & Systems"
        />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}/profile.jpg`} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Thi Ha Zaw - Software Engineer | Full-Stack, Backend & Systems"
        />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}/profile.jpg`} />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Thi Ha Zaw",
              alternateName: "zerozet22k",
              url: siteUrl,
              sameAs: [
                "https://github.com/zerozet22k",
                "https://www.linkedin.com/in/zerozet22k",
                "https://www.instagram.com/charon22z/",
                "https://www.facebook.com/zerozet22/"
              ],
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Startup Dev Myanmar"
              },
              description
            })
          }}
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
