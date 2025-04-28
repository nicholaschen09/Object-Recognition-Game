"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type CollectionItem = {
  id: string;
  name: string;
  image: string;
  description: string;
  dateFound: string;
  rarity: number;
  points: number;
};

interface AppContextType {
  userPoints: number;
  collection: CollectionItem[];
  addPoints: (points: number) => void;
  addToCollection: (item: Omit<CollectionItem, "id" | "dateFound">) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial collection data
const initialCollection = [
  {
    id: "1",
    name: "Monarch Butterfly",
    image: "https://images.unsplash.com/photo-1617192029920-feee76078f99?w=800&auto=format&fit=crop",
    description: "A migratory butterfly known for its distinctive orange and black wings.",
    dateFound: "2023-07-15",
    rarity: 6,
    points: 120,
  },
  {
    id: "2",
    name: "Red Oak Tree",
    image: "https://images.unsplash.com/photo-1596339302350-8705e6f32da6?w=800&auto=format&fit=crop",
    description: "A common hardwood tree in North America with pointed-lobed leaves.",
    dateFound: "2023-07-20",
    rarity: 3,
    points: 60,
  },
  {
    id: "3",
    name: "Limestone Building",
    image: "https://images.unsplash.com/photo-1570129476815-ba368ac77013?w=800&auto=format&fit=crop",
    description: "A structure made from sedimentary rock composed of calcium carbonate.",
    dateFound: "2023-08-05",
    rarity: 4,
    points: 80,
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [userPoints, setUserPoints] = useState(260);
  const [collection, setCollection] = useState<CollectionItem[]>(initialCollection);

  // Load data from localStorage on component mount (client-side only)
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      const storedPoints = localStorage.getItem("userPoints");
      const storedCollection = localStorage.getItem("collection");

      if (storedPoints) {
        setUserPoints(Number.parseInt(storedPoints, 10));
      }

      if (storedCollection) {
        try {
          setCollection(JSON.parse(storedCollection));
        } catch (error) {
          console.error("Failed to parse collection from localStorage", error);
        }
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userPoints", userPoints.toString());
      localStorage.setItem("collection", JSON.stringify(collection));
    }
  }, [userPoints, collection]);

  const addPoints = (points: number) => {
    setUserPoints((prev) => prev + points);
  };

  const addToCollection = (item: Omit<CollectionItem, "id" | "dateFound">) => {
    const newItem: CollectionItem = {
      ...item,
      id: `item-${Date.now()}`,
      dateFound: new Date().toISOString().split("T")[0],
    };

    setCollection((prev) => [...prev, newItem]);
  };

  return (
    <AppContext.Provider
      value={{
        userPoints,
        collection,
        addPoints,
        addToCollection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
