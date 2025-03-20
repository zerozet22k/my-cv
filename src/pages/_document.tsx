import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Thi Ha Zaw" />
        <meta
          name="description"
          content="Thi Ha Zaw - Software Engineer specializing in AI, ML, Game Development, and Next.js."
        />
        <meta
          name="keywords"
          content="Thi Ha Zaw, Software Engineer, AI Developer, Game Developer, Next.js, React, Machine Learning, Web Development"
        />

        {/* Open Graph Meta Tags (For Social Media) */}
        <meta property="og:title" content="Thi Ha Zaw - Software Engineer & AI Enthusiast" />
        <meta
          property="og:description"
          content="Software Engineer specializing in AI, ML, Game Development, and Web Technologies."
        />
        <meta property="og:image" content="/profile.jpg" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Thi Ha Zaw - Software Engineer & AI Enthusiast" />
        <meta name="twitter:description" content="Passionate about AI, ML, and Game Development." />
        <meta name="twitter:image" content="/profile.jpg" />

        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data (JSON-LD for Google Rich Results) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Thi Ha Zaw",
              "url": "https://yourwebsite.com",
              "sameAs": [
                "https://github.com/zerozet22k",
                "https://www.linkedin.com/in/zerozet22k",
                "https://www.instagram.com/charon22z/",
                "https://facebook.com/charon404"
              ],
              "jobTitle": "Software Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Startup Dev Myanmar"
              },
              "description": "Software Engineer specializing in AI, ML, and Game Development."
            })
          }}
        />

        {/* Google Fonts */}
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
