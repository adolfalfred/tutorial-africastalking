"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";

interface StateContextType {
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
}

export const StateContext = createContext<StateContextType | undefined>(
  undefined
);

interface StateProviderProps {
  children: ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [number, setNumber] = useState<string>("");

  return (
    <StateContext.Provider value={{ number, setNumber }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
