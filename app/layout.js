import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { UserProvider } from "@/context/userContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "@/components/Providers";

const queryClient = new QueryClient();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ToastConfig = {
  success: {
    style: {
      background: "#d1fae5",
      color: "#065f46",
    },
    iconTheme: {
      primary: "#10b981",
      secondary: "#d1fae5",
    },
  },
  error: {
    style: {
      background: "#fee2e2",
      color: "#991b1b",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fee2e2",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Frontend</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
