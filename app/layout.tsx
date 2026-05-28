import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Navbar from "@/components/sections/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enatan Dereje — Data Scientist • Web Pentester • Developer",
  description: "Building machine learning models, cleaning large datasets, and testing websites for security problems. Creating reliable systems that scale.",
  keywords: ["Data Science", "Machine Learning", "Web Security", "Penetration Testing", "ML Pipelines", "Security Assessment", "Pentest Reports", "Reproducible Experiments"],
  authors: [{ name: "Enatan Dereje" }],
  openGraph: {
    title: "Enatan Dereje — Data Scientist • Web Pentester • Developer",
    description: "Building ML models. Testing websites for security. Creating reliable systems that scale.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen flex flex-col relative">
            <Navbar />
            <main className="flex-grow">
              {children}
              <SpeedInsights />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
