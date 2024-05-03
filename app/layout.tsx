import { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import Script from "next/script";
import "../global.css";

export const metadata: Metadata = {
  title: {
    default: "juanrivillas.com",
    template: "%s | juanrivillas.com",
  },
  description: "Juan Rivillas personal website",
  openGraph: {
    title: "juanrivillas",
    description:
      "Senior Software Engineer specialized in Distributed Systems, AWS, Node and Elixir.",
    url: "https://juanrivillas.com",
    siteName: "juanrivillas.com",
    images: [
      {
        url: "https://www.juanrivillas.com/og.png",
        width: 500,
        height: 91,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "jprivillaso",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${[inter.variable, calSans.variable].join(" ")} h-full`}
    >
      <head>
        <Script
          strategy="lazyOnload"
          src="//fast.appcues.com/211150.js"
        ></Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
          (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
            j.async = true;
            j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, "script", "dataLayer", "GTM-MST2QXML")
        `}
        </Script>
      </head>
      <body className="bg-black h-full overflow-y-auto">
        {children}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MST2QXML"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
