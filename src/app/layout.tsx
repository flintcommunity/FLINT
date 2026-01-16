import { Providers } from "../providers/ThemeProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://flints.dev'),
  title: "Flint - Spark something.",
  description: "Flint is a community of vibecoders using new tech to build the next tech.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Flint - Spark something.",
    description: "Flint is a community of vibecoders using new tech to build the next tech.",
    siteName: 'Flint',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Flint Community',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Flint - Spark something.",
    description: "Flint is a community of vibecoders using new tech to build the next tech.",
    images: {
      url: '/assets/og-image.png',
      alt: 'Flint Community',
    },
  },
  viewport: 'width=device-width, minimum-scale=1.0, maximum-scale=1.0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#FEF8F3' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
