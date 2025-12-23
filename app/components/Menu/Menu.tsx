import React from "react";
import { menuItems, progetti } from "./data";

export default function Menu() {
  return (
    <nav className="fixed top-0 left-0 w-full h-dvh overflow-y-auto bg-black z-50 font-apfel">
      <img
        src="/logo/Logo_w.svg"
        alt="Clamore Logo"
        className="h-[12dvh] mx-auto"
      />

      <ul className="flex justify-end gap-4">
        {menuItems.map((item) => (
          <li key={item.label}>
            <a href={item.href}>{item.label}</a>        
          </li>
        ))}
      </ul>
      
      {/* Divider */}
      <div className="w-full h-px bg-white/30 my-4"></div>
      
      <ul className="flex justify-end gap-4">
        {progetti.map((item) => (
          <li key={item.label}>
            <a href={item.href}>{item.label}</a>        
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black">
        <p className="text-white text-center">Copyright 2025 Clamore</p>
      </div>
    </nav>
  );
}
