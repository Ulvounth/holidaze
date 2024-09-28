import { cookies } from "next/headers";
import { Suspense } from "react";
import Loader from "./components/ui/Loader";
import Header from "./components/Header";
import "./globals.css";
import Footer from "./components/Footer";
import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./lib/context/authContext";
import { ModalProvider } from "./lib/context/ModalContext"; // Import ModalProvider
import { Alkatra } from "next/font/google";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holidaze",
  description:
    "Browse through our wide selection of venues for your next vacation.",
  openGraph: {
    title: "Explore Venues | Holidaze",
    description:
      "Browse through our wide selection of venues for your next vacation.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
};

interface LayoutProps {
  children: ReactNode;
}

const alkatra = Alkatra({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alkatra",
});

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
            <ModalProvider>
              <Header />
              <Suspense fallback={<Loader />}>
                <main className="flex-grow">{children}</main>
              </Suspense>
              <Footer />
            </ModalProvider>
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
