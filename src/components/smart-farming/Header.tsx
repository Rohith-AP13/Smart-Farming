import { Leaf } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary font-headline">
            Smart-Farming
          </h1>
        </div>
      </div>
    </header>
  );
}
