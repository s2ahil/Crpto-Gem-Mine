"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { CoinContext } from "@/components/CoinContext";
import Image from "next/image";
import Linechart from "@/components/Linechart";

const Page = () => {
    const { id } = useParams();

    const [coinData, setCoinData] = useState(null);
    const [historicalData, setHistoricalData] = useState(null);

    const { currency } = useContext(CoinContext);

    const fetchData =async () => {
        const url = `https://api.coingecko.com/api/v3/coins/${id}`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key":  `${process.env.coinGeckoApi}` ,
            },
        };

      await  fetch(url, options)
            .then((res) => res.json())
            .then((json) => setCoinData(json))
            .catch((err) => console.error(err));
    };

    const fetchHistoricalData = async () => {
        const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`;
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key':  `${process.env.coinGeckoApi}` }
        };

      await fetch(url, options)
            .then(res => res.json())
            .then(json => setHistoricalData(json))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchData();
        fetchHistoricalData();
    }, [currency]);

    if (coinData && historicalData) {
        return (
            <div className="app bg-gray-100 min-h-screen">
                <div className="max-w-4xl mx-auto py-10 px-5">
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <Image
                            src={coinData.image.large}
                            height={80}
                            width={80}
                            alt={`${coinData.name} logo`}
                            className="mx-auto"
                        />
                        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
                            {coinData.name} ({coinData.symbol.toUpperCase()})
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Rank #{coinData.market_cap_rank}
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Overview</h2>
                        <ul className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                            <li className="flex justify-between">
                                <span className="font-medium">Current Price:</span>
                                <span>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="font-medium">Market Cap:</span>
                                <span>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="font-medium">24H High:</span>
                                <span>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="font-medium">24H Low:</span>
                                <span>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Historical Data</h2>
                        <Linechart historicalData={historicalData} />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div role="status" className="text-center">
                    <svg
                        aria-hidden="true"
                        className="w-12 h-12 text-gray-300 animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <p className="text-gray-500 mt-4">Loading...</p>
                </div>
            </div>
        );
    }
};

export default Page;
