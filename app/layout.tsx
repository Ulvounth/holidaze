import { cookies } from "next/headers";
import Header from "./components/Header";
import "./globals.css";
import Footer from "./components/Footer";
import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./lib/authContext";

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Holidaze",
  description: "Book your dream holiday at amazing venues",
};

export default function Layout({ children }: LayoutProps) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  // Determine if the user is logged in based on the token
  const isLoggedIn = !!token;

  return (
    <html lang="en">
      <head>{/* Include other head elements here */}</head>
      <body>
        <ChakraProvider>
          <AuthProvider isLoggedIn={isLoggedIn}>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
