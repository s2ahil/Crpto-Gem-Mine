import { Inter } from "next/font/google";
import "./globals.css";
import CoinContextProvider from "@/components/CoinContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CryptoGem",
  description: "Website to check latest and your fav crypto  coins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CoinContextProvider>

        <body className={inter.className}>
        <Navbar></Navbar>
        {children}
        <div className="text-center mt-4 p-4">
        <Footer />
      </div>
        </body>
      </CoinContextProvider>
    </html>
  );
}
