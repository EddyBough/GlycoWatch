"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Log des données avant l'envoi
    console.log("Données envoyées : ", {
      email,
      password,
      name,
      firstname,
      birthdate,
      address,
      phone,
    });

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
          firstname,
          birthdate,
          address,
          phone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Log de la réponse
      console.log("Réponse de l'API : ", res);

      if (res.ok) {
        toast.success("Inscription réussie ! Redirection...");
        setTimeout(() => router.push("/dashboard"), 3000);
      } else {
        const data = await res.json();
        toast.error(data.message || "Échec de l'inscription");
      }
    } catch (error) {
      console.error("Erreur lors de la requête : ", error); // Log de l'erreur
      toast.error("Erreur lors de la requête.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ToastContainer />
      <h1>Create Account</h1>
      <form onSubmit={handleSignUp} className="flex flex-col space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Firstname"
          required
          className="p-2 border rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          placeholder="Birthdate"
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="p-2 border rounded"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
