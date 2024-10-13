import { createContext, useState, useContext, ReactNode } from "react";

interface QueryContextType {
  query: string;
  updateQuery: (newQuery: string) => void;
}

export const QueryContext = createContext<QueryContextType | null>(null);

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>("");

  const updateQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <QueryContext.Provider value={{ query, updateQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = () => useContext(QueryContext) as QueryContextType;