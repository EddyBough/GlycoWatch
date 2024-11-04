"use client";

import { Terms } from "@/components/Terms";
import { WaveBackground } from "@/components/WaveBackground";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen w-full overflow-y-auto">
      <WaveBackground />
      <div className="relative z-10 min-h-screen w-full">
        <div className="container mx-auto px-4 py-12 pb-32">
          <Terms />
        </div>
      </div>
    </div>
  );
}
