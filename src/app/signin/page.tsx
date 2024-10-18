"use client";

import { useEffect, useState } from "react";
import {
  getProviders,
  signIn,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import styles from "../../styles/signin.module.scss";

export default function SignIn() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  // Pour gérer l'email et le mot de passe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      console.log("Fetched providers:", providers);
      setProviders(providers);
    };

    fetchProviders();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Utiliser le Credentials Provider pour la connexion via email/mot de passe
    const result = await signIn("credentials", {
      redirect: false, // Ne pas rediriger immédiatement
      email,
      password,
    });

    if (result?.ok) {
      // Redirection vers /dashboard si la connexion réussit
      window.location.href = "/dashboard";
    } else {
      alert("Échec de la connexion : " + result?.error);
    }
  };

  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.signinBox}>
        <h1>Sign in</h1>

        {/* Formulaire de connexion via email/mot de passe */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign in with Email</button>
        </form>

        <hr />

        {/* Afficher les autres providers comme Google */}
        {Object.values(providers).map((provider) => {
          if (provider.id === "credentials") {
            // Ne pas afficher un bouton pour le Credentials Provider (car déjà géré par le formulaire ci-dessus)
            return null;
          }
          return (
            <div key={provider.name}>
              <button
                onClick={() =>
                  signIn(provider.id, { callbackUrl: "/dashboard" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
