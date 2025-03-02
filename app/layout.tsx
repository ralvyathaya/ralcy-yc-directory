import type { Metadata } from "next"
import { Providers } from "./providers"
import "./globals.css"
import "easymde/dist/easymde.min.css"

import localFont from "next/font/local" // Import localFont to use local font files
import { Toaster } from "sonner"

// Create workSans with multiple font weights, styles, and sources
const funnelSans = localFont({
  src: [
    {
      path: "./fonts/FunnelSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    }, // Extra Bold weight
    { path: "./fonts/FunnelSans-Bold.ttf", weight: "700", style: "normal" }, // Bold weight
    { path: "./fonts/FunnelSans-SemiBold.ttf", weight: "600", style: "normal" }, // Semi-Bold weight
    { path: "./fonts/FunnelSans-Medium.ttf", weight: "500", style: "normal" }, // Medium weight
    { path: "./fonts/FunnelSans-Regular.ttf", weight: "400", style: "normal" }, // Regular weight
    { path: "./fonts/FunnelSans-Light.ttf", weight: "300", style: "normal" }, // Light weight // Extra Light weight
  ],
  variable: "--font-work-sans", // CSS variable name
})

export const metadata: Metadata = {
  title: "Ralvy Directory", // Title of the application
  description: "A directory for Ralvy YC members", // Brief description of the application
  icons: {
    icon: "/favicon.svg", // Set the new favicon
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={funnelSans.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
