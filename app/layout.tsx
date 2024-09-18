import { cookies } from "next/headers";
import type { Metadata } from "next";
import Header from "./components/Header";
import "./globals.css";
import Footer from "./components/Footer";
import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./lib/authContext";
import { Alkatra } from "next/font/google";

interface LayoutProps {
  children: ReactNode;
}

const alkatra = Alkatra({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alkatra",
});

export const metadata: Metadata = {
  title: "Holidaze",
  description: "Book your dream holiday at amazing venues",
};

export default async function Layout({ children }: LayoutProps) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  let user = null;
  const userCookie = cookieStore.get("user")?.value;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
      user = null;
    }
  }

  const isLoggedIn = !!token && !!user;

  return (
    <html lang="en" className={alkatra.variable}>
      <body className={`font-alkatra flex flex-col min-h-screen`}>
        <ChakraProvider>
          <AuthProvider isLoggedIn={isLoggedIn} initialUser={user}>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
