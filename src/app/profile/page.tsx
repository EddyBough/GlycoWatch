"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ProfilePage from "./ProfilePage"; // The component that displays the profile data
import { getProfile } from "../../../lib/profile"; // Ensure that these functions exist

export default function Profile() {
  const { data: session, status } = useSession(); // `session` et `status` are extracted here
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Interface for the user profile
  interface UserProfile {
    id: number;
    userId: number;
    birthdate: Date | null;
    address: string | null;
    phone: string | null;
    medications: string | null;
    healthIssues: string | null;
    name: string; // Add the name property
    firstname: string; // Add the firstname property
  }

  // Redirection if not connected
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // Load the profile data if the session is authenticated
  useEffect(() => {
    const loadProfile = async () => {
      if (session?.user?.id) {
        try {
          const data = await getProfile(session.user.id); // Get the profile data

          if (data) {
            // Update the profile data if it exists
            setProfile({
              id: data.id,
              userId: data.userId,
              birthdate: data.birthdate ?? null,
              address: data.address ?? null,
              phone: data.phone ?? null,
              medications: data.medications ?? null,
              healthIssues: data.healthIssues ?? null,
              name: data.user?.name ?? "", // Ensure we have a string
              firstname: data.user?.firstname ?? "", // Ensure we have a string
            });
          } else {
            console.error("No profile data found.");
          }
        } catch (error) {
          console.error("Error loading the profile:", error);
        }
      }
    };

    console.log("Session: ", session);
    console.log("Status: ", status);

    if (status === "authenticated" && session?.user?.id) {
      loadProfile(); // Call the function to load the profile
    }
  }, [status, session]);

  // If the profile is not loaded yet
  if (!profile) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <ProfilePage profile={profile} />{" "}
      {/* Pass the data to the ProfilePage component */}
    </div>
  );
}
