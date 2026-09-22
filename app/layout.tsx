import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppShell } from "@/components/layout/AppShell";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Thiết kế Logic Số & Verilog HDL | Learning Workspace",
  description:
    "Hệ thống học tập cá nhân chuyên sâu: Điện tử số, Đại số Boole, Mạch tổ hợp, Mạch tuần tự, Verilog HDL, FSM và Mô phỏng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} scroll-smooth`}
    >
      <body className="antialiased selection:bg-primary/20 selection:text-primary font-sans">
        <ThemeProvider defaultTheme="system" storageKey="logic-verilog-theme">
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

