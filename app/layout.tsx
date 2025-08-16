import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Biju Damian's Portfolio | Professional Developer",
  description: "Ultimate portfolio showcasing cutting-edge development skills with a professional design",
  generator: "v0.app",
  keywords: ["portfolio", "developer", "professional", "web development"],
  authors: [{ name: "Developer" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Quantum Portfolio | Professional Developer",
    description: "Ultimate portfolio showcasing cutting-edge development skills",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Portfolio | Professional Developer",
    description: "Ultimate portfolio showcasing cutting-edge development skills",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-quantum-dark text-quantum-light antialiased overflow-x-hidden">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-quantum-primary text-quantum-dark rounded-lg font-medium"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
