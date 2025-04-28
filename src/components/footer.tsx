export function Footer() {
  return (
    <footer className="w-full py-4 bg-primary/10 border-t">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Object Finder. Discover the world around you.</p>
      </div>
    </footer>
  );
}
