import React, { createContext, useContext } from "react";

type ArgsContextValue = Record<string, any>;

const ArgsContext = createContext<ArgsContextValue | null>(null);

export const useArgs = () => {
    const context = useContext(ArgsContext);
    if (!context) {
         throw new Error("useArgs must be used within an ArgsProvider");
    }
    return context;
};

interface ArgsProviderProps {
  args: Record<string, any> | undefined;
  children: React.ReactNode;
}

export const ArgsProvider: React.FC<ArgsProviderProps> = ({ children,args }) => {
  return <ArgsContext.Provider value={args || {}}>{children}</ArgsContext.Provider>;
};
