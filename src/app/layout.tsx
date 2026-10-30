import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Dock } from "@/components/dock";
import { MotionProvider, ScrollProgress } from "@/components/effects";
import { profile } from "@/data/profile";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.intro,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="relative min-h-full font-sans">
        <MotionProvider>
          <ScrollProgress />
          <Dock />
          <div className="relative z-10">{children}</div>
        </MotionProvider>
      </body>
    </html>
  );
}
