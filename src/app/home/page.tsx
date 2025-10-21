"use client";

import { HeroBackground } from "@/components/HeroBackground";
import { PresentationPartOne } from "@/components/PresentationPartOne";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-y-auto">
      <HeroBackground />
      <div className="relative z-10 min-h-screen w-full">
        <PresentationPartOne />
      </div>
    </div>
  );
}
