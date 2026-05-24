import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/UI/Theme-provider";
import PageLoader from "@/components/UI/PageLoader";
import { Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "@/components/UI/SmoothScroll";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-next",
});

const satoshi = localFont({
  src: [
    { path: "../../public/fonts/Satoshi-Light.otf",   weight: "300", style: "light"   },
    { path: "../../public/fonts/Satoshi-Regular.otf", weight: "400", style: "regular" },
    { path: "../../public/fonts/Satoshi-Medium.otf",  weight: "500", style: "medium"  },
    { path: "../../public/fonts/Satoshi-Bold.otf",    weight: "700", style: "bold"    },
    { path: "../../public/fonts/Satoshi-Black.otf",   weight: "900", style: "black"   },
  ],
  variable: "--font-satoshi-next",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Root layout — font variables + theme shell only.
 * Navbar is rendered per-route inside PortfolioShell
 * so each variant can inject the right content.
 */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${satoshi.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
