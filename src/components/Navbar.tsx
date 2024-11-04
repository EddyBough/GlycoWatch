"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Empêcher le défilement du body quand le menu est ouvert
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      toast.success("Déconnexion réussie");
      setTimeout(() => {
        router.push("/home");
        handleLinkClick();
      }, 2000);
    });
  };

  return (
    <header className="relative z-50">
      <ToastContainer />
      <nav className="flex items-center justify-between w-full py-4 px-4 text-lg text-gray-700 border border-gray-200/30 shadow-lg">
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

        {/* Menu mobile et desktop */}
        <div
          className={`
            ${isOpen ? "flex" : "hidden"}
            fixed inset-0 md:relative
            md:flex md:items-center md:w-auto
            md:bg-transparent bg-transparent
          `}
        >
          {/* Overlay sombre avec flou */}
          <div
            className={`
              fixed inset-0 
              bg-white/90 backdrop-blur-sm
              -z-10 
              md:hidden
            `}
            onClick={toggleMenu}
          />

          {/* Container du menu mobile */}
          <div
            className="
            min-h-screen w-[100%] ml-auto
            bg-transparent shadow-lg
            flex flex-col
            md:min-h-0 md:w-auto md:shadow-none md:bg-transparent
            md:flex-row md:items-center
          "
          >
            {/* Header du menu mobile */}
            <div className="flex justify-between items-center backdrop-blur-md md:hidden">
              <Link href="/" onClick={handleLinkClick}>
                <img
                  src="/image/glycowatchLogo.svg"
                  alt="GlycoWatch Logo"
                  width={150}
                  height={32}
                />
              </Link>
              <button onClick={toggleMenu} className="h-6 w-6 mr-7">
                <img
                  src="/image/icon-close.png"
                  alt="Close"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            {/* Liste des liens */}
            <ul className="flex flex-col text-center lg:space-x-6 gap-4 p-4 md:flex-row md:p-0">
              <li>
                <Link
                  className="block py-2 text-purple-600 hover:text-purple-600"
                  href="/privacy"
                  onClick={handleLinkClick}
                >
                  Vie privée
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 text-purple-600 hover:text-purple-600"
                  href="/terms"
                  onClick={handleLinkClick}
                >
                  Condition d'&apos;utilisation
                </Link>
              </li>
              {session && (
                <li>
                  <Link
                    className="block py-2 text-purple-600 hover:text-purple-600"
                    href="/dashboard"
                    onClick={handleLinkClick}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {!session && (
                <li>
                  <Link
                    className="block py-2 text-purple-600 hover:text-purple-400"
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
                    className="block py-2 text-purple-600 hover:text-purple-400"
                    href="/signup"
                    onClick={handleLinkClick}
                  >
                    S&apos;inscrire
                  </Link>
                </li>
              )}
              {session && (
                <li>
                  <Link
                    className="block py-2 text-purple-600 hover:text-purple-600"
                    href="/profile"
                    onClick={handleLinkClick}
                  >
                    Profil
                  </Link>
                </li>
              )}
              {session && (
                <li>
                  <button
                    className="block w-full py-2 text-purple-600 text-center hover:text-purple-400"
                    onClick={handleSignOut}
                  >
                    Se déconnecter
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
