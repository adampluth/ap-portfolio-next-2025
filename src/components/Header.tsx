"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/ui-ux", label: "Development & UI/UX" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleNavigation = (url: string) => {
    setMenuOpen(false);
    router.push(url);
  };

  return (
    <>
      <div className="navbar min-h-12 fixed top-0 left-0 right-0 z-50 bg-teal-500/20 backdrop-blur-md rounded-b-[30px] shadow-lg">
        <div className="absolute min-h-[2.75rem] px-2 top-0 left-0 right-0 z-50 shadow-md bg-teal-500/15 backdrop-blur-md rounded-b-[30px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-8 ml-2">
              <Image src="/img/AP-logo-2020.png" alt="Adam Pluth logo" width={378} height={275} />
            </div>
            <span className="ml-2 font-bold text-md">Adam Pluth</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="absolute right-2 px-2 btn-sm md:hidden glass bg-cyan-800/60 hover:bg-white/30 transition-all rounded-tl-3xl rounded-tr-xl rounded-br-3xl rounded-bl-xl border-none z-[100]"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex menu menu-horizontal p-0 space-x-4 text-sm mr-2">
            {links.map(({ href, label }) => (
              <li key={href}>
                <button className="btn btn-sm btn-ghost hover:glass active:glass border-none" onClick={() => handleNavigation(href)}>{label}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Drawer */}
        <nav
          className={`fixed opacity-70 top-0 right-0 min-h-screen w-64 bg-teal-700 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ease-in-out rounded-l-2xl z-40 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="menu p-6 pt-20 space-y-6 text-lg">
            {[{ href: "/", label: "Home" }, ...links].map(({ href, label }) => (
              <li key={href}>
                <button className="btn btn-sm btn-ghost hover:glass active:glass border-none" onClick={() => handleNavigation(href)}>{label}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </>
  );
}
