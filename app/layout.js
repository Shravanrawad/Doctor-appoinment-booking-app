'use client';

import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_componants/header"; 
import Footer from "./_componants/footer"; 
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    if (pathname.includes('/search/')) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="px-1">
          <Header />
          <main>{children}</main>
          <Toaster />
          {showFooter && <Footer />}
        </div>
      </body>
    </html>
  );
}
