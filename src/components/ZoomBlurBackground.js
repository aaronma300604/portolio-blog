"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ZoomBlurBackground({ imageUrl, children }) {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-[70vh] -z-10 overflow-hidden">
        <Image
          src={imageUrl}
          alt="Background"
          className="w-full h-full object-contain"
          width = {850}
          height = {850}
          style={{
            transform: `scale(${1 + scroll / 1000})`,
            filter: `blur(${scroll / 100}px)`,
            opacity: 1 - scroll / 1000,
            transition: "transform 0.2s, filter 0.2s, opacity 0.2s",
          }}
        />
      </div>
      <main>{children}</main>
    </div>
  );
}  
