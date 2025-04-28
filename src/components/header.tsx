"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold">
            Object Finder
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/collection">
            <Button variant={pathname === "/collection" ? "secondary" : "link"} className="text-primary-foreground">
              My Collection
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant={pathname === "/profile" ? "secondary" : "link"} className="text-primary-foreground">
              Profile
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
