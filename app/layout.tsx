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

export default async function Layout({ children }: LayoutProps) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  // Safely parse the user cookie if it exists
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
    <html lang="en">
      <head>{/* Include other head elements here */}</head>
      <body>
        <ChakraProvider>
          <AuthProvider isLoggedIn={isLoggedIn} initialUser={user}>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
