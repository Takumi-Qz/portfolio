import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter_Tight,
  Shippori_Mincho,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import { Animations } from "@/components/motion/Animations";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  preload: false,
});

const zen = Zen_Kaku_Gothic_New({
  variable: "--font-zen",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  preload: false,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio — EC・HP・LP制作",
    template: "%s",
  },
  description: "ECサイト構築、コーポレートサイト、LPの制作実績。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${shippori.variable} ${zen.variable} ${cormorant.variable} ${interTight.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <SmoothScroll />
        <Animations />
      </body>
    </html>
  );
}
