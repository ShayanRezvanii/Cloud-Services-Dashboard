import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ResourceProvider } from "@/contexts/ResourceContext";
import ToastProvider from "@/components/ui/ToastProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Protected from "@/components/auth/Protected";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Dashboard",
  description: "Cloud Services Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <Protected>
            <ThemeProvider>
              <ResourceProvider>
                <ToastProvider />
                {children}
              </ResourceProvider>
            </ThemeProvider>
          </Protected>
        </AuthProvider>
      </body>
    </html>
  );
}
