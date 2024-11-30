"use client";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Outfit } from 'next/font/google';
import { CoinContext } from "@/components/CoinContext";
import Footer from "@/components/Footer";
import Link from "next/link";
const outfit = Outfit({ subsets: ['latin'] });

export default function Home() {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("")
  const inputHandler = (e) => {
       setInput(e.target.value);
  }

  const searchHandler=async(e)=>{
    e.preventDefault();

  const coindata=  await allCoin.filter((item)=>{
     return  item.name.toLowerCase().includes(input.toLowerCase())

    })


    setDisplayCoin(coindata)

    

  }

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <main className={`app ${outfit.className} container mx-auto px-4`}>
 

      <div className="text-center py-6">
        <h1 className="text-2xl md:text-3xl font-medium">Crypto Gem Mine</h1>
      </div>

      <div className="flex justify-center pb-6">
        <form 
        onSubmit={searchHandler}
        className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
          <input
            type="text"
            list='coinlist'
            onChange={inputHandler}
            value={input}
            placeholder="Find your fav crypto..."
            className="w-full p-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <datalist id="coinlist">
            {allCoin?.map((item,idx)=>(
              <option key={idx} value={item.name}></option>
            ))}
          </datalist>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <div className="crypto-table w-full max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-[rgba(84,3,255,0.15)] to-[rgba(105,2,153,0.15)]">
          {/* Table Header */}
          <div className="grid grid-cols-[0.5fr_3fr_1fr_1fr] md:grid-cols-5 items-center p-4 border-b border-gray-300 text-xs md:text-base">
            <p className="text-center">#</p>
            <p className="text-left">Coins</p>
            <p className="text-center">Price</p>
            <p className="text-center">24H Change</p>
            <p className="text-center hidden md:block">Market Cap</p>
          </div>

          {/* Table Rows */}
          {displayCoin.slice(0, 10).map((item, idx) => (
            <Link
            href={`/coin/${item.id}`}
              key={idx}
              className="grid grid-cols-[0.5fr_3fr_1fr_1fr] md:grid-cols-5 items-center p-4 border-b border-gray-200 last:border-b-0  transition-colors text-sm md:text-base"
            >
              <p className="text-center">{item.market_cap_rank}</p>
              <div className="flex items-center  gap-2 md:gap-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 md:w-8 md:h-8"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-white text-xs uppercase">{item.symbol}</p>
                </div>
              </div>
              <p className="text-center">{currency.symbol}{item.current_price.toLocaleString()}</p>
              <p
                className={`text-center ${item.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                  }`}
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </p>
              <p className="text-center hidden md:block">{currency.symbol}{item.market_cap.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </div>

    
    </main>
  );
}