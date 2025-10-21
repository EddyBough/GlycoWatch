"use client";

import Link from "next/link";
import { Heart, Mail, MapPin, Github, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-white/5 backdrop-blur-md border-t border-white/10 text-center mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:ebdeveloper@outlook.fr"
                className="flex items-center justify-center text-white/70 hover:text-emerald-400 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                contact@innov8digital.fr
              </a>

              <div className="flex items-center justify-center text-white/70">
                <MapPin className="h-5 w-5 mr-2" />
                Marseille, France
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Liens rapides</h3>
            <div className="space-y-3">
              <Link
                href="/"
                className="block text-white/70 hover:text-emerald-400 transition-colors"
              >
                À propos
              </Link>
              <Link
                href="https://glyco-watch.vercel.app/privacy"
                className="block text-white/70 hover:text-emerald-400 transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="https://glyco-watch.vercel.app/terms"
                className="block text-white/70 hover:text-emerald-400 transition-colors"
              >
                Conditions d&apos;utilisation
              </Link>
              <Link
                href="https://ebdeveloper.vercel.app/"
                className="block text-white/70 hover:text-emerald-400 transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Suivez-nous</h3>
            <div className="flex space-x-4 justify-center">
              <a
                href="https://github.com/EddyBough"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/eddy-boughanmi/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
            <div className="text-white/60 text-sm">
              © {currentYear} GlycoWatch®. Tous droits réservés.
            </div>
            <div className="flex items-center text-white/60 text-sm">
              Fait avec{" "}
              <Heart className="h-4 w-4 mx-1 text-emerald-400 fill-emerald-400" />{" "}
              à Marseille
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
