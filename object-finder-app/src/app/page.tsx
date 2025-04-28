"use client";

import { useState } from "react";
import { Camera } from "@/components/camera";
import { ObjectInfo } from "@/components/object-info";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useApp } from "@/context/app-context";

export default function Home() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { userPoints } = useApp();

  const handleCapture = (photo: string) => {
    setCapturedImage(photo);
  };

  const handleReset = () => {
    setCapturedImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8">Object Finder</h1>

          <div className="text-center mb-8">
            <p className="text-lg mb-1">Your Points</p>
            <p className="text-4xl font-bold text-primary">{userPoints}</p>
          </div>

          {!capturedImage ? (
            <Camera onCapture={handleCapture} />
          ) : (
            <ObjectInfo
              objectImage={capturedImage}
              onReset={handleReset}
            />
          )}

          <div className="bg-muted/50 rounded-lg p-4 mt-8">
            <h2 className="font-medium mb-2">How to Play:</h2>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li>Take pictures of objects around you (plants, animals, buildings, etc.)</li>
              <li>Our system will identify the object and provide information</li>
              <li>Earn points based on how rare the object is</li>
              <li>Build your collection of discovered objects</li>
              <li>Try to find unique and rare items to earn more points!</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
