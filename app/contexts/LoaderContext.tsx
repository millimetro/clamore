"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoaderContextType {
  isLoaderComplete: boolean;
  setLoaderComplete: (complete: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoaderComplete, setLoaderComplete] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoaderComplete, setLoaderComplete }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}






