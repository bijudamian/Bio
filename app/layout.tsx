import type React from "react"
import type { Metadata, Viewport } from "next"
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
  title: "Biju Damian | Full-Stack Developer & Problem Solver",
  description:
    "Building the future one line at a time. Full-stack developer specializing in Next.js, TypeScript, Python, and AWS.",
  keywords: ["Biju Damian", "Full-Stack Developer", "Next.js", "TypeScript", "React", "Python", "AWS", "Portfolio"],
  authors: [{ name: "Biju Damian" }],
  creator: "Biju Damian",
  openGraph: {
    title: "Biju Damian | Full-Stack Developer",
    description: "Building the future one line at a time. At the intersection of creativity and logic.",
    type: "website",
    locale: "en_US",
    siteName: "Biju Damian Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biju Damian | Full-Stack Developer",
    description: "Building the future one line at a time. At the intersection of creativity and logic.",
    creator: "@bijudamian",
  },
  robots: "index, follow",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased overflow-x-hidden font-sans">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
