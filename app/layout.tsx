import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Biju Damian - Full Stack Developer",
  description:
    "Portfolio of Biju Damian, a passionate full-stack developer specializing in modern web technologies, AI integration, and innovative solutions.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Portfolio", "Web Development"],
  authors: [{ name: "Biju Damian" }],
  creator: "Biju Damian",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bijudamian.vercel.app",
    title: "Biju Damian - Full Stack Developer",
    description: "Portfolio showcasing innovative web solutions and cutting-edge development expertise.",
    siteName: "Biju Damian Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biju Damian - Full Stack Developer",
    description: "Portfolio showcasing innovative web solutions and cutting-edge development expertise.",
    creator: "@bijudamian",
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
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#8b5cf6",
          colorBackground: "#0a0a0f",
          colorInputBackground: "#1c1c28",
          colorInputText: "#ffffff",
        },
        elements: {
          formButtonPrimary: "bg-gradient-to-r from-quantum-primary to-quantum-secondary hover:opacity-90",
          card: "bg-quantum-card border-quantum-border",
          headerTitle: "text-quantum-light",
          headerSubtitle: "text-quantum-muted",
        },
      }}
    >
      <html
        lang="en"
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark antialiased`}
        suppressHydrationWarning
      >
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#0a0a0f" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        </head>
        <body className="min-h-screen bg-background text-foreground">
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
