"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

// Mock collection data - in a real app this would come from a database
const collectionItems = [
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

export default function CollectionPage() {
  const [collection, setCollection] = useState(collectionItems);
  const [filter, setFilter] = useState<"all" | "rarity" | "recent">("all");
  const [totalPoints, setTotalPoints] = useState(0);

  // Calculate total points
  useEffect(() => {
    const points = collection.reduce((sum, item) => sum + item.points, 0);
    setTotalPoints(points);
  }, [collection]);

  // Filter the collection
  const filteredCollection = () => {
    switch (filter) {
      case "rarity":
        return [...collection].sort((a, b) => b.rarity - a.rarity);
      case "recent":
        return [...collection].sort((a, b) =>
          new Date(b.dateFound).getTime() - new Date(a.dateFound).getTime());
      default:
        return collection;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Collection</h1>
              <p className="text-muted-foreground">
                {collection.length} objects discovered • {totalPoints} total points
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filter === "rarity" ? "default" : "outline"}
                onClick={() => setFilter("rarity")}
                size="sm"
              >
                By Rarity
              </Button>
              <Button
                variant={filter === "recent" ? "default" : "outline"}
                onClick={() => setFilter("recent")}
                size="sm"
              >
                Most Recent
              </Button>
            </div>
          </div>

          {collection.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">Your collection is empty</h2>
              <p className="text-muted-foreground mb-4">
                Start taking pictures of objects to build your collection!
              </p>
              <Button onClick={() => { window.location.href = "/"; }}>
                Take Your First Picture
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollection().map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                      {item.points} points
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>Found on {new Date(item.dateFound).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center mb-2">
                      <p className="text-sm text-muted-foreground mr-2">Rarity:</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${item.rarity * 10}%` }}
                        />
                      </div>
                      <span className="text-xs ml-2">{item.rarity}/10</span>
                    </div>
                    <p className="text-sm line-clamp-2">{item.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
