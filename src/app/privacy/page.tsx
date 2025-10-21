"use client";

import { BackgroundDashboard } from "@/components/BackgroundDashboard";
import { Privacy } from "@/components/Privacy";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full overflow-y-auto">
      <BackgroundDashboard />
      <div className="relative z-10 min-h-screen w-full">
        <div className="container mx-auto px-4 py-12 pb-32">
          <Privacy />
        </div>
      </div>
    </div>
  );
}
