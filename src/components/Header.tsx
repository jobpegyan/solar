import { Link } from "@tanstack/react-router";
import { MainNav } from "@/components/navigation/MainNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative mx-auto grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4">
        <Link to="/" className="flex min-w-0 items-center space-x-2">
          <span className="shrink-0 text-xl">☀️</span>
          <span className="truncate text-base font-bold tracking-tight text-foreground sm:text-lg">
            Solar Panel Calculator
          </span>
        </Link>

        <MainNav />
      </div>
    </header>
  );
}
