"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar min-h-12 fixed top-0 left-0 right-0 z-50 bg-teal-500/20 backdrop-blur-md rounded-b-[30px] shadow-lg">
      <div className="absolute min-h-[2.75rem] px-2 top-0 left-0 right-0 z-50 shadow-md bg-teal-500/15 backdrop-blur-md rounded-b-[30px] flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-8 ml-2">
            <Image
              src="/img/AP-logo-2020.png"
              alt="Adam Pluth logo"
              width={378}
              height={275}
            />
          </div>
          <span className="ml-2 font-bold text-md">Adam Pluth</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn-round w-10 p-1 btn-sm md:hidden bg-teal-500/40 hover:bg-white/30 transition-all rounded-tl-3xl rounded-tr-xl rounded-br-3xl rounded-bl-xl border-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex menu menu-horizontal p-0 space-x-4 text-sm">
          <li>
            <Link href="/ui-ux">Development & UI/UX</Link>
          </li>
          <li>
            <Link href="/photography">Photography</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-all duration-300 ease-in-out ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Mobile Menu Drawer */}
      <nav
        className={`fixed top-[3.5rem] right-0 h-full w-64 bg-white/20 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ease-in-out rounded-l-2xl ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="menu p-6 space-y-4 text-lg">
          <li>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/ui-ux" onClick={() => setMenuOpen(false)}>
              Development & UI/UX
            </Link>
          </li>
          <li>
            <Link href="/photography" onClick={() => setMenuOpen(false)}>
              Photography
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
