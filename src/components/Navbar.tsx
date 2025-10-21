"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, X } from "lucide-react";
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
    <header className="relative z-50 w-full">
      <ToastContainer />
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-5">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/image/glycoWatchLogo1.svg"
            alt="GlycoWatch Logo"
            width={220}
            height={50}
            className="h-20 md:h-14 lg:h-24 w-auto"
          />
        </Link>

        {/* Desktop Menu - Centre */}
        <ul className="hidden lg:flex items-center gap-8">
          {session && (
            <li>
              <Link
                href="/dashboard"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link
                href="/profile"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Profil
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/privacy"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Vie privée
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Conditions
            </Link>
          </li>
        </ul>

        {/* Desktop CTA - Droite */}
        <div className="hidden lg:flex items-center gap-4">
          {!session ? (
            <>
              <Link
                href="/signin"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Se connecter
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-emerald-500/50"
              >
                S&apos;inscrire
              </Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="inline-flex items-center bg-white/5 backdrop-blur-sm text-white text-sm font-medium px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 transition-all"
            >
              Se déconnecter
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-white/70 hover:text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={toggleMenu}
          />

          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-[280px] bg-gray-950 border-l border-white/10 lg:hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-white font-semibold">Menu</span>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <ul className="flex flex-col gap-2 p-4 flex-1">
                {session && (
                  <>
                    <li>
                      <Link
                        href="/dashboard"
                        onClick={handleLinkClick}
                        className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile"
                        onClick={handleLinkClick}
                        className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      >
                        Profil
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link
                    href="/privacy"
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    Vie privée
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    Conditions d&apos;utilisation
                  </Link>
                </li>
              </ul>

              {/* Bottom CTA */}
              <div className="p-4 border-t border-white/10 space-y-3">
                {!session ? (
                  <>
                    <Link
                      href="/signin"
                      onClick={handleLinkClick}
                      className="block text-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                      Se connecter
                    </Link>
                    <Link
                      href="/signup"
                      onClick={handleLinkClick}
                      className="block text-center bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium px-4 py-3 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all"
                    >
                      S&apos;inscrire
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleSignOut}
                    className="w-full text-center bg-white/5 backdrop-blur-sm text-white font-medium px-4 py-3 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Se déconnecter
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
