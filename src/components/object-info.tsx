"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ObjectInfoProps {
  objectImage: string;
  onReset: () => void;
  updatePoints?: (points: number) => void;
}

// This is a mock function that would be replaced by a real API call in production
const identifyObject = async (image: string): Promise<{
  name: string;
  description: string;
  rarity: number; // 1-10 scale
  points: number;
  facts: string[];
}> => {
  // In a real app, you would send the image to an API and get back results
  // For now, we'll simulate a delay and return mock data
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock data - in a real app this would come from an AI/ML service
  const objects = [
    {
      name: "Monarch Butterfly",
      description: "A migratory butterfly known for its distinctive orange and black wings.",
      rarity: 6,
      points: 120,
      facts: [
        "Migrates up to 3,000 miles annually",
        "Population has declined by 80% in the last 20 years",
        "Caterpillars only eat milkweed plants"
      ]
    },
    {
      name: "Red Oak Tree",
      description: "A common hardwood tree in North America with pointed-lobed leaves.",
      rarity: 3,
      points: 60,
      facts: [
        "Can live for over 500 years",
        "Produces acorns that are a vital food source for wildlife",
        "Has distinctive pointed lobes on its leaves"
      ]
    },
    {
      name: "Limestone Building",
      description: "A structure made from sedimentary rock composed of calcium carbonate.",
      rarity: 4,
      points: 80,
      facts: [
        "Limestone is formed from the accumulation of marine fossils",
        "Common in historic buildings due to its durability",
        "Susceptible to acid rain damage"
      ]
    },
    {
      name: "Lady Bug",
      description: "A small, round, typically red beetle with black spots.",
      rarity: 2,
      points: 40,
      facts: [
        "They can eat up to 5,000 aphids in their lifetime",
        "Their bright colors warn predators of their bad taste",
        "Some can have up to 24 spots on their wings"
      ]
    },
    {
      name: "Blue Morpho Butterfly",
      description: "A tropical butterfly with iridescent blue wings.",
      rarity: 8,
      points: 160,
      facts: [
        "One of the largest butterflies with a wingspan up to 8 inches",
        "The blue color is not from pigment but from light reflection",
        "Native to tropical rainforests of Latin America"
      ]
    }
  ];

  // Randomly select one of the mock objects
  return objects[Math.floor(Math.random() * objects.length)];
};

export function ObjectInfo({ objectImage, onReset, updatePoints }: ObjectInfoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [objectData, setObjectData] = useState<null | {
    name: string;
    description: string;
    rarity: number;
    points: number;
    facts: string[];
  }>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Identify the object when the component mounts or when objectImage or updatePoints changes
  useEffect(() => {
    const identify = async () => {
      setIsLoading(true);
      setIsSaved(false);
      try {
        const data = await identifyObject(objectImage);
        setObjectData(data);
        // Update points when object is identified
        if (updatePoints) {
          updatePoints(data.points);
        }
      } catch (error) {
        toast.error("Failed to identify object. Please try again.");
        setObjectData(null);
      } finally {
        setIsLoading(false);
      }
    };

    identify();
  }, [objectImage, updatePoints]);

  const saveToCollection = () => {
    // In a real app, this would save to a database
    toast.success(`Added ${objectData?.name} to your collection!`);
    setIsSaved(true);
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Identifying Object...</CardTitle>
          <CardDescription>
            Our system is analyzing your image
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="relative w-full max-w-xs mx-auto">
            <img
              src={objectImage}
              alt="Captured object"
              className="w-full h-auto rounded-md object-cover aspect-square"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin h-10 w-10 border-4 border-primary rounded-full border-t-transparent" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!objectData) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Identification Failed</CardTitle>
          <CardDescription>
            We couldn't identify this object. Please try again.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={onReset}>Take Another Photo</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">{objectData.name}</CardTitle>
        <CardDescription>{objectData.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <img
          src={objectImage}
          alt={objectData.name}
          className="w-full h-auto rounded-md object-cover max-h-72"
        />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Rarity Score</p>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${objectData.rarity * 10}%` }}
                />
              </div>
              <span className="text-sm font-medium">{objectData.rarity}/10</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Points Earned</p>
            <p className="text-xl font-bold text-primary">+{objectData.points}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Fun Facts:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {objectData.facts.map((fact, index) => (
              <li key={`fact-${index}-${fact.substring(0, 10)}`} className="text-sm">{fact}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          Take Another Photo
        </Button>
        <Button
          onClick={saveToCollection}
          disabled={isSaved}
        >
          {isSaved ? 'Added to Collection' : 'Add to Collection'}
        </Button>
      </CardFooter>
    </Card>
  );
}
