// src/app/home/page.tsx
"use client";

export default function Home() {
  return (
    <div className="flex justify-center items-center text-center flex-col">
      <div className="">
        <h1 className="">Bienvenue sur GlycoWatch</h1>
      </div>
      <p className="">
        Suivez votre taux d'insuline facilement et efficacement.
      </p>
      <a href="/signin" target="_blank" rel="noopener noreferrer">
        <button> Se connecter</button>
      </a>
      <a href="/signup" target="_blank" rel="noopener noreferrer">
        <button> S'inscrire</button>
      </a>
    </div>
  );
}
