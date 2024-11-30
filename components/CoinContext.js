"use client"

import React, { createContext, useEffect, useState } from 'react'

export const CoinContext = createContext()

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([])
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const fetchALLCoin = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': `${process.env.coinGeckoApi}` }
        };
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
      await   fetch(url, options)
            .then(res => res.json())
            .then(json => setAllCoin(json))
            .catch(err => console.error(err));

    }



    useEffect(() => {
        fetchALLCoin()
    }, [currency])

    const contextValue = {
        allCoin,currency,setCurrency

    }

    return (
        <CoinContext.Provider

            value={contextValue}
        >
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider