"use client"

import React from 'react'
import Image from 'next/image'
import { useContext } from 'react'
import { CoinContext } from '@/components/CoinContext'
import Link from 'next/link'
const Navbar = () => {

  const { setCurrency } = useContext(CoinContext)

  const currencyHandler = (e) => {

    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" })
        break
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" })
        break
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" })
        break;
      }

      default: {
        setCurrency({
          name:"inr",
          symbol:"₹"
        })
        break;
      }




    }

  }

  return (
    <div className='flex  justify-center items-center gap-4 p-8'>

      <ul className='flex gap-4'>
      <Link href='/' className='hover:border-b-4  border-blue-500 '>  <li>Home</li></Link>
      <Link href='/about' className='hover:border-b-4 border-blue-500'>  <li>About</li></Link>
        {/* <li>Pricing </li>
        <li>Blog</li> */}
      </ul>
      <div className='text-black flex justify-center border-black border-y '>
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
      </div>


    </div>
  )
}

export default Navbar