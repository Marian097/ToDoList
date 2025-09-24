import React from 'react'
import "../css/Header.css"
import logo from "../assets/ChatGPT Image Sep 24, 2025, 11_15_52 AM.png"

export default function Header() {
  return (
    <header>
        <div className= "logo">
        <img src={logo} alt="" />
        </div>
    </header>
  )
}
