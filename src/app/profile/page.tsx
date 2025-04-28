"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

export default function ProfilePage() {
  // Mock data - in a real app this would come from a database
  const userData = {
    name: "Jane Smith",
    joinDate: "2023-06-15",
    totalPoints: 260,
    objectsFound: 3,
    rank: "Explorer",
    achievements: [
      { name: "First Discovery", description: "Found your first object", completed: true },
      { name: "Collection Starter", description: "Add 3 objects to your collection", completed: true },
      { name: "Bug Hunter", description: "Find 5 different insects", completed: false },
      { name: "Botanist", description: "Find 10 different plant species", completed: false },
      { name: "Architecture Buff", description: "Find 5 different buildings", completed: false },
    ]
  };

  // Calculate next rank threshold
  const rankThresholds = [
    { name: "Beginner", points: 0 },
    { name: "Explorer", points: 100 },
    { name: "Naturalist", points: 500 },
    { name: "Scientist", points: 1000 },
    { name: "Master Discoverer", points: 2500 }
  ];

  const currentRankIndex = rankThresholds.findIndex(r => r.name === userData.rank);
  const nextRank = currentRankIndex < rankThresholds.length - 1
    ? rankThresholds[currentRankIndex + 1]
    : null;

  const progressToNextRank = nextRank
    ? Math.min(100, (userData.totalPoints / nextRank.points) * 100)
    : 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Profile Summary */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                      {userData.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle>{userData.name}</CardTitle>
                      <CardDescription>
                        Member since {new Date(userData.joinDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-lg font-medium">{userData.rank}</p>
                    {nextRank && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground mb-1">
                          {userData.totalPoints} / {nextRank.points} points to {nextRank.name}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${progressToNextRank}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-2">
                    <div className="text-center p-2 bg-muted rounded-md">
                      <p className="text-2xl font-bold">{userData.totalPoints}</p>
                      <p className="text-xs text-muted-foreground">Total Points</p>
                    </div>
                    <div className="text-center p-2 bg-muted rounded-md">
                      <p className="text-2xl font-bold">{userData.objectsFound}</p>
                      <p className="text-xs text-muted-foreground">Objects Found</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full">Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Track your progress and unlock rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.achievements.map((achievement) => (
                      <div
                        key={`achievement-${achievement.name}`}
                        className={`p-4 border rounded-lg flex items-center ${
                          achievement.completed ? 'border-primary' : 'border-muted'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                          achievement.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {achievement.completed ? '✓' : '?'}
                        </div>
                        <div>
                          <h3 className="font-medium">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                        <div className="ml-auto">
                          {achievement.completed ? (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Completed</span>
                          ) : (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">In Progress</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
