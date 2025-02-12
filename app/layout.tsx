import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

import localFont from "next/font/local"; // Import localFont to use local font files

// Create workSans with multiple font weights, styles, and sources
const workSans = localFont({
  src: [
    { path: "./fonts/WorkSans-Black.ttf", weight: "900", style: "normal" }, // Black weight
    { path: "./fonts/WorkSans-ExtraBold.ttf", weight: "800", style: "normal" }, // Extra Bold weight
    { path: "./fonts/WorkSans-Bold.ttf", weight: "700", style: "normal" }, // Bold weight
    { path: "./fonts/WorkSans-SemiBold.ttf", weight: "600", style: "normal" }, // Semi-Bold weight
    { path: "./fonts/WorkSans-Medium.ttf", weight: "500", style: "normal" }, // Medium weight
    { path: "./fonts/WorkSans-Regular.ttf", weight: "400", style: "normal" }, // Regular weight
    { path: "./fonts/WorkSans-Light.ttf", weight: "300", style: "normal" }, // Light weight
    { path: "./fonts/WorkSans-ExtraLight.ttf", weight: "200", style: "normal" }, // Extra Light weight
    { path: "./fonts/WorkSans-Thin.ttf", weight: "100", style: "normal" }, // Thin weight
  ],
  variable: "--font-work-sans", // CSS variable name
});

export const metadata: Metadata = {
  title: "Ralvy YC Directory", // Title of the application
  description: "A directory for Ralvy YC members", // Brief description of the application
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
