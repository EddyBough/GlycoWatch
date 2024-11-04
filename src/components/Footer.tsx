"use client";

import Link from "next/link";
import { Heart, Mail, MapPin, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:contact@diabetica.com"
                className="flex items-center text-gray-600 hover:text-[#00cba9] transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                ebdeveloper@outlook.fr
              </a>

              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                Marseille, France
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Liens rapides
            </h3>
            <div className="space-y-3">
              <Link
                href="/"
                className="block text-gray-600 hover:text-[#00cba9] transition-colors"
              >
                À propos
              </Link>
              <Link
                href="https://glyco-watch.vercel.app/privacy"
                className="block text-gray-600 hover:text-[#00cba9] transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="https://glyco-watch.vercel.app/terms"
                className="block text-gray-600 hover:text-[#00cba9] transition-colors"
              >
                Conditions d&apos;utilisation
              </Link>
              <Link
                href="https://ebdeveloper.vercel.app/"
                className="block text-gray-600 hover:text-[#00cba9] transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/EddyBough"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#00cba9] hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/eddy-boughanmi/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#00cba9] hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-gray-600 text-sm">
              © {currentYear} GlycoWatch. Tous droits réservés.
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              Fait avec <Heart className="h-4 w-4 mx-1 text-purple-600" /> à
              Marseille
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
