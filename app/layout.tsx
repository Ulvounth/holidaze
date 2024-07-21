import './globals.css'; // Updated import path for global styles
import Header from './components/Header';
import Footer from './components/Footer';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Holidaze',
  description: 'Book your dream holiday at amazing venues',
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        {/* Include other head elements here */}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;

