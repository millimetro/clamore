"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface NavigationSimpleProps {
  bw?: boolean;
}

export default function NavigationSimple({ bw = false }: NavigationSimpleProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isContactPage = pathname === "/contact";
  const isSostieniciPage = pathname === "/sostienici";
  const navItems = ["CLUB", "PUB", "RADIO", "ACADEMY", "CLAMORE"];

  useEffect(() => {
    const handleScroll = () => {
      const valuesSection = document.getElementById("values");
      const footerSection = document.getElementById("footer");

      if (!valuesSection || !footerSection) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const valuesTop = valuesSection.offsetTop;
      const valuesBottom = valuesSection.offsetTop + valuesSection.offsetHeight;
      const footerTop = footerSection.offsetTop;
      const footerBottom = footerSection.offsetTop + footerSection.offsetHeight;

      // Check if scroll position is within values section or footer
      const isInValues = scrollY + windowHeight * 0.1 >= valuesTop && scrollY <= valuesBottom;
      const isInFooter = scrollY + windowHeight * 0.1 >= footerTop && scrollY <= footerBottom;

      setIsHidden(isInValues || isInFooter);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getMobileItemClasses = (item: string) => {
    const baseClasses = "font-brand font-extrabold uppercase text-lg px-4 py-3 w-full border-b-2 border-black transition-all text-black block text-center";
    
    switch (item) {
      case "CLUB":
        return `${baseClasses} hover:bg-black hover:text-cream`;
      case "PUB":
        return `${baseClasses} hover:bg-teal-700 hover:text-cream`;
      case "RADIO":
        return `${baseClasses} hover:bg-red-500 hover:text-black`;
      case "CLAMORE":
        return `${baseClasses} hover:bg-orange-600 hover:text-cream`;
      case "ACADEMY":
        return `${baseClasses} hover:bg-sky-600 hover:text-pink-300`;
      default:
        return baseClasses;
    }
  };

  const mobileMenuOverlayClasses = `fixed top-0 left-0 w-full h-dvh overflow-y-auto bg-cream border-b-2 border-black z-40 transition-all duration-300 md:hidden ${
    isMobileMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
  }`;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 md:px-8 py-3 md:py-0 flex items-center justify-between bg-transparent border-b-2 border-transparent min-h-[12dvh] md:min-h-[12dvh] transition-transform duration-300 ${isHidden ? "-translate-y-full" : ""}`}>
        {/* Sostienici / Back - Left (hidden on mobile) */}
        <div className="hidden md:block">
          {isSostieniciPage ? (
            <button 
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-3 md:px-4 py-0.5 md:py-1.5 border-2 border-black rounded-full bg-black text-cream font-bold font-brand uppercase text-sm sm:text-sm md:text-base shadow-[8px_8px_0px_0px_rgb(209,213,219)] hover:shadow-[4px_4px_0px_0px_rgb(209,213,219)] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-gray-300 hover:text-black transition-all duration-300"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 12H5"/>
                <path d="M12 19l-7-7 7-7"/>
              </svg>
              Indietro
            </button>
          ) : (
            <a href="/sostienici" className={`inline-flex items-center gap-2 px-3 md:px-4 py-0.5 md:py-1.5 border-2 border-black rounded-full bg-black font-bold font-brand uppercase text-sm sm:text-sm md:text-base transition-all duration-300 ${bw ? 'text-cream shadow-[8px_8px_0px_0px_rgb(209,213,219)] hover:shadow-[4px_4px_0px_0px_rgb(209,213,219)] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-gray-300 hover:text-black' : 'text-green-500 shadow-[8px_8px_0px_0px_rgb(34,197,94)] hover:shadow-[4px_4px_0px_0px_rgb(34,197,94)] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-green-500 hover:text-black'}`}>
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Sostienici
            </a>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden absolute left-4 w-12 h-12 flex items-center justify-center border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgb(22,22,22)] active:shadow-[2px_2px_0px_0px_rgb(22,22,22)] active:translate-x-[2px] active:translate-y-[2px] transition-all bg-transparent"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-black transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-black transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-black transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

      {/* Logo - Center */}
      <a href="/" className="absolute left-1/2 transform -translate-x-1/2">
        <img
          src="/logo/Logo_w.svg"
          alt="Clamore Logo"
          className="h-24 md:h-28"
        />
      </a>

      {/* Contattaci / Back - Right */}
      <div className="hidden md:block">
        {isContactPage ? (
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-0.5 md:py-1.5 border-2 border-black rounded-full bg-black text-gray-300 font-bold font-brand uppercase text-sm sm:text-sm md:text-base shadow-[8px_8px_0px_0px_rgb(209,213,219)] hover:shadow-[4px_4px_0px_0px_rgb(209,213,219)] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-gray-300 hover:text-black transition-all duration-300"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 12H5"/>
              <path d="M12 19l-7-7 7-7"/>
            </svg>
            Indietro
          </button>
        ) : isSostieniciPage ? (
          <a href="/contact" className={`inline-flex items-center gap-2 px-3 md:px-4 py-0.5 md:py-1.5 border-2 border-black rounded-full bg-black font-bold font-brand uppercase text-sm sm:text-sm md:text-base transition-all duration-300 ${bw ? 'text-cream shadow-[8px_8px_0px_0px_rgb(209,213,219)] hover:shadow-[4px_4px_0px_0px_rgb(209,213,219)] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-gray-300 hover:text-black' : 'text-purple-500 shadow-[8px_8px_0px_0px_rgb(168,85,247)] hover:shadow-[4px_4px_0px_0px_rgb(168,85,247)] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-purple-500 hover:text-black'}`}>
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Contattaci
          </a>
        ) : (
          <a href="/contact" className={`inline-flex items-center gap-2 px-3 md:px-4 py-0.5 md:py-1.5 border-2 border-black rounded-full bg-black font-bold font-brand uppercase text-sm sm:text-sm md:text-base transition-all duration-300 ${bw ? 'text-cream shadow-[8px_8px_0px_0px_rgb(209,213,219)] hover:shadow-[4px_4px_0px_0px_rgb(209,213,219)] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-gray-300 hover:text-black' : 'text-purple-500 shadow-[8px_8px_0px_0px_rgb(168,85,247)] hover:shadow-[4px_4px_0px_0px_rgb(168,85,247)] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-purple-500 hover:text-black'}`}>
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Contattaci
          </a>
        )}
      </div>

      {/* Mobile Contact Button */}
      <a
        href="/contact"
        className={`md:hidden absolute right-4 w-12 h-12 flex items-center justify-center border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgb(22,22,22)] active:shadow-[2px_2px_0px_0px_rgb(22,22,22)] active:translate-x-[2px] active:translate-y-[2px] transition-all ${bw ? 'bg-black' : 'bg-purple-500'}`}
        aria-label="Contattaci"
      >
        <svg
          className="w-6 h-6 text-cream"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </a>
    </nav>

    {/* Mobile Menu Overlay */}
    <div
      className={mobileMenuOverlayClasses}
      suppressHydrationWarning
    >
      <div className="flex flex-col h-full pt-20">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setIsMobileMenuOpen(false)}
            className={getMobileItemClasses(item)}
          >
            {item}
          </a>
        ))}
        <div className="flex gap-4 w-full px-4 py-2 mt-4 justify-center">
          <a href="/sostienici" className={`font-brand font-extrabold uppercase text-base px-4 py-1 border-2 border-black rounded-full shadow-[8px_8px_0px_0px_rgb(22,22,22)] hover:shadow-[4px_4px_0px_0px_rgb(22,22,22)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all ${bw ? 'text-cream bg-black' : 'text-black bg-green-500'}`}>
            SOSTIENICI
          </a>
          <a href="/contact" className={`font-brand font-extrabold uppercase text-cream text-base px-4 py-1 border-2 border-black rounded-full shadow-[8px_8px_0px_0px_rgb(22,22,22)] hover:shadow-[4px_4px_0px_0px_rgb(22,22,22)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all ${bw ? 'bg-black' : 'bg-purple-500'}`}>
            CONTATTACI
          </a>
        </div>
        
        {/* Email */}
        <a 
          href="mailto:clamore.bergamo@gmail.com" 
          className="font-apfel text-lg px-4 pt-3 pb-1 w-full text-black hover:opacity-80 transition-opacity text-center"
        >
          clamore.bergamo@gmail.com
        </a>
        
        {/* Address */}
        <div className="font-apfel text-lg px-4 pt-1 pb-3 w-full text-black text-center">
          Via Carducci 4/b – Bergamo
        </div>
        
        {/* Socials */}
        <div className="flex items-center justify-center gap-4 px-4 py-4 w-full">
          <a 
            href="https://www.facebook.com/InkClubBergamo/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgb(22,22,22)] active:shadow-[2px_2px_0px_0px_rgb(22,22,22)] active:translate-x-[2px] active:translate-y-[2px] transition-all bg-cream"
            aria-label="Facebook"
          >
              <svg
                className="w-8 h-8 md:w-6 md:h-6 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/inkclub_bergamo/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgb(22,22,22)] active:shadow-[2px_2px_0px_0px_rgb(22,22,22)] active:translate-x-[2px] active:translate-y-[2px] transition-all bg-cream"
              aria-label="Instagram"
            >
              <svg
                className="w-8 h-8 md:w-6 md:h-6 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://www.youtube.com/inkclubbergamo/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgb(22,22,22)] active:shadow-[2px_2px_0px_0px_rgb(22,22,22)] active:translate-x-[2px] active:translate-y-[2px] transition-all bg-cream"
              aria-label="YouTube"
            >
              <svg
                className="w-8 h-8 md:w-6 md:h-6 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="p-2 border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgb(22,22,22)] active:shadow-[2px_2px_0px_0px_rgb(22,22,22)] active:translate-x-[2px] active:translate-y-[2px] transition-all bg-cream"
              aria-label="Flickr"
            >
              <svg
                className="w-8 h-8 md:w-6 md:h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 12c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6zm12 0c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

