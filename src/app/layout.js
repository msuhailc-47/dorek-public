import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const viewport = {
  themeColor: "#061C3B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL('https://dorek.in'),
  title: {
    template: '%s | Dorek International',
    default: 'Dorek International Enterprises LLP',
  },
  description: 'Dorek International Enterprises LLP is a diversified corporate group powering engineering, commercial solar energy, smart retail networks, and enterprise software.',
  keywords: ['Dorek International', 'Doorcarts', 'Turnkey Engineering', 'Commercial Solar', 'Smart Retail', 'Enterprise Software', 'Kerala Business Conglomerate'],
  authors: [{ name: 'Dorek International' }],
  creator: 'Dorek International Enterprises LLP',
  publisher: 'Dorek International Enterprises LLP',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Dorek International Enterprises LLP',
    description: 'Engineering Excellence. Powering Future Brands.',
    url: 'https://dorek.in',
    siteName: 'Dorek International',
    images: [{ url: '/logo.png', width: 600, height: 600, alt: 'Dorek International Logo' }],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dorek International Enterprises LLP',
    description: 'Engineering Excellence. Powering Future Brands.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
