export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-foreground/60">
          &copy; {currentYear} Apholaby Bespoke Interiors. All rights reserved.
        </p>
        <p className="mt-1 text-xs text-foreground/50">
          Crafting dreams into reality, one space at a time.
        </p>
      </div>
    </footer>
  );
}
