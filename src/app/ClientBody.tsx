"use client";

import { useEffect } from "react";
import { AppProvider } from "@/context/app-context";
import { Toaster } from "sonner";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <AppProvider>
      <Toaster richColors />
      <div className="antialiased">{children}</div>
    </AppProvider>
  );
}
