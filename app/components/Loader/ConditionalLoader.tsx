"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader";
import { useLoader } from "../../contexts/LoaderContext";

export default function ConditionalLoader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { setLoaderComplete } = useLoader();

  useEffect(() => {
    if (!isHomePage) {
      // On non-home pages, mark loader as complete immediately
      setLoaderComplete(true);
    }
  }, [isHomePage, setLoaderComplete]);

  if (!isHomePage) {
    return null;
  }

  return <Loader />;
}

