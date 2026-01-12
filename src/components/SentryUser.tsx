// src/components/SentryUser.tsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import * as Sentry from "@sentry/nextjs";

export function SentryUser() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      Sentry.setUser({
        id: String(session.user.id),
        email: session.user.email ?? undefined,
      });

      Sentry.setTag("plan", session.user.plan ?? "FREE");
      Sentry.setTag("feature", "web-app");
    } else if (status === "unauthenticated") {
      Sentry.setUser(null); // important au logout
    }
    // Note: status === "loading" → on ne fait rien (attente)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session?.user?.id, session?.user?.email, session?.user?.plan]);

  return null;
}
