"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lock, FileText, LayoutDashboard, User, LogOut } from "lucide-react";
import Image from "next/image";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
      <nav className="flex items-center justify-between w-full py-4 px-4 text-lg">
        <div className="-ml-6">
          <Link href="/">
            <Image
              src="/image/glycoWatchLogo1.svg"
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
            <Image
              src="/image/icon-menu.png"
              alt="Menu"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Menu mobile et desktop */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } fixed inset-0 md:relative md:flex md:items-center md:w-auto md:bg-transparent flex-col items-center justify-center mt-8`}
        >
          {/* Overlay sombre avec flou */}
          <div
            className="fixed inset-0 bg-white/90 backdrop-blur-sm -z-10 md:hidden"
            onClick={toggleMenu}
          />

          <div
            className="
              min-h-screen w-[100%] ml-auto
              bg-transparent shadow-lg
              flex flex-col
              md:min-h-0 md:w-auto md:shadow-none md:bg-transparent
              md:flex-row md:items-center
            "
          >
            <div className="flex justify-between items-center backdrop-blur-md md:hidden">
              <Link href="/" onClick={handleLinkClick}>
                <Image
                  src="/image/glycoWatchLogo1.svg"
                  alt="GlycoWatch Logo"
                  width={150}
                  height={32}
                />
              </Link>
              <button onClick={toggleMenu} className="h-6 w-6 mr-8">
                <Image
                  src="/image/icon-close.png"
                  alt="Close"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <ul className="flex flex-col items-center gap-6 p-4 md:flex-row md:p-0">
              <li>
                <Link
                  className=" py-2 text-purple-800 hover:text-purple-600 flex items-center"
                  href="/privacy"
                  onClick={handleLinkClick}
                >
                  <Lock className="mr-2 w-5 h-5" />
                  Vie privée
                </Link>
              </li>
              <li>
                <Link
                  className=" py-2 text-purple-800 hover:text-purple-600 flex items-center"
                  href="/terms"
                  onClick={handleLinkClick}
                >
                  <FileText className="mr-2 w-5 h-5" />
                  Conditions d&apos;utilisation
                </Link>
              </li>
              {session && (
                <li>
                  <Link
                    className=" py-2 text-purple-800 hover:text-purple-600 flex items-center"
                    href="/dashboard"
                    onClick={handleLinkClick}
                  >
                    <LayoutDashboard className="mr-2 w-5 h-5" />
                    Dashboard
                  </Link>
                </li>
              )}
              {!session && (
                <li>
                  <Link
                    className=" py-2 text-purple-800 hover:text-purple-400 flex items-center"
                    href="/signin"
                    onClick={handleLinkClick}
                  >
                    <LogOut className="mr-2 w-5 h-5" />
                    Se connecter
                  </Link>
                </li>
              )}
              {!session && (
                <li>
                  <Link
                    className=" py-2 text-purple-800 hover:text-purple-400 flex items-center"
                    href="/signup"
                    onClick={handleLinkClick}
                  >
                    <User className="mr-2 w-5 h-5" />
                    S&apos;inscrire
                  </Link>
                </li>
              )}
              {session && (
                <li>
                  <Link
                    className=" py-2 text-purple-800 hover:text-purple-600 flex items-center"
                    href="/profile"
                    onClick={handleLinkClick}
                  >
                    <User className="mr-2 w-5 h-5" />
                    Profil
                  </Link>
                </li>
              )}
              {session && (
                <li>
                  <button
                    className=" w-full py-2 text-purple-800 text-center hover:text-purple-400 flex items-center"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 w-5 h-5" />
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
