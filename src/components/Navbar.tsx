"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); // Pour vérifier l'état de la session
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    signOut({
      redirect: false, // Empêche la redirection automatique
    }).then(() => {
      toast.success("Déconnexion réussie");
      setTimeout(() => {
        router.push("/home");
      }, 2000); // Attends 2 secondes avant de rediriger
    });
  };

  return (
    <header>
      <ToastContainer />
      <nav className="flex items-center justify-between w-full py-4 px-4 text-lg text-gray-700 bg-gradient-to-br from-green-100 to-white">
        <div className="-ml-6">
          <Link href="/">
            <img
              src="/image/glycowatchLogo.svg"
              alt="GlycoWatch Logo"
              width={150}
              height={32}
            />
          </Link>
        </div>
        <div className="mr-5">
          <button
            className="h-6 w-6 cursor-pointer md:hidden block"
            onClick={toggleMenu}
          >
            <img src="/image/icon-menu.png" alt="Menu" width={24} height={24} />
          </button>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen
              ? "block bg-gradient-to-br from-green-100 to-white"
              : "hidden"
          } fixed inset-0 z-30 md:relative md:flex md:items-center md:w-auto `}
          id="menu"
        >
          <div className="flex justify-between items-center w-full md:hidden p-4">
            <Link href="/" onClick={handleLinkClick}>
              <img
                src="/image/glycowatchLogo.svg"
                alt="GlycoWatch Logo"
                width={150}
                height={32}
              />
            </Link>
            <button onClick={toggleMenu} className="h-6 w-6">
              <img
                src="/image/icon-close.png"
                alt="Close"
                width={24}
                height={24}
              />
            </button>
          </div>
          <ul className="flex flex-col items-center gap-4 mt-4 text-gray-700 md:flex-row md:mt-0">
            <li>
              <Link
                className="md:p-4 py-2 block hover:text-purple-400"
                href="#"
                onClick={handleLinkClick}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                className="md:p-4 py-2 block hover:text-purple-400"
                href="#"
                onClick={handleLinkClick}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className="md:p-4 py-2 block hover:text-purple-400"
                href="#"
                onClick={handleLinkClick}
              >
                Customers
              </Link>
            </li>
            <li>
              <Link
                className="md:p-4 py-2 block hover:text-purple-400"
                href="#"
                onClick={handleLinkClick}
              >
                Blog
              </Link>
            </li>

            {/* Afficher "Sign Up" uniquement si pas connecté */}
            {!session && (
              <li>
                <Link
                  className="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                  href="/signin"
                  onClick={handleLinkClick}
                >
                  Se connecter
                </Link>
              </li>
            )}
            {!session && (
              <li>
                <Link
                  className="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                  href="/signup"
                  onClick={handleLinkClick}
                >
                  S&rsquo;inscrire
                </Link>
              </li>
            )}
            {/* Afficher "Sign Up" uniquement si pas connecté */}
            {session && (
              <li>
                <Link
                  className=" text-purple-800"
                  href="/profile"
                  onClick={handleLinkClick}
                >
                  Profil
                </Link>
              </li>
            )}

            {/* Afficher "Sign Out" uniquement si connecté */}
            {session && (
              <li>
                <button
                  className="md:p-4 py-2 block hover:text-purple-400 text-purple-600"
                  onClick={handleSignOut}
                >
                  Se déconnecter
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
