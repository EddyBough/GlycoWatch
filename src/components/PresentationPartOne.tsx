import Image from "next/image";
import {
  Activity,
  TrendingUp,
  Shield,
  Zap,
  Bot,
  Star,
  BarChart,
} from "lucide-react";

export function PresentationPartOne() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-8 pb-20 md:py-20 max-w-7xl mx-auto">
      {/* Badge social proof */}
      <div className="relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 backdrop-blur-md border border-emerald-400/30 rounded-full px-6 py-3 mb-8 hover:from-emerald-500/20 hover:via-cyan-500/20 hover:to-emerald-500/20 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 group">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400">
          <Star className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="text-sm md:text-base text-white font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Approuvé par +150 diabétiques
        </span>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/0 via-cyan-400/5 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Titre principal */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 max-w-6xl leading-tight">
        Gérez votre diabète en{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500">
          toute simplicité
        </span>
      </h1>

      {/* Sous-titre */}
      <p className="text-xl md:text-2xl text-white/70 max-w-3xl mb-3 leading-relaxed">
        L&apos;application gratuite de suivi glycémique la plus complète du web
        pour diabétiques
      </p>
      <p className="text-base md:text-lg text-white/50 max-w-2xl mb-12">
        Suivez, analysez et partagez vos données en toute sécurité
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <a
          href="/signup"
          className="group inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-lg px-10 py-4 rounded-full hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-105"
        >
          Commencer gratuitement
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </a>
        <a
          href="/signin"
          className="inline-flex items-center justify-center bg-white/5 backdrop-blur-sm text-white font-semibold text-lg px-10 py-4 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          Se connecter
        </a>
      </div>

      <p className="text-sm text-white/40 mb-20">
        100% gratuit • Sans publicité • Inscription en 30 secondes
      </p>

      {/* Features Grid - 3 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 w-full max-w-5xl">
        <div className="flex items-start gap-4 text-left bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/[0.07] transition-all">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">
              Suivi en temps réel
            </h3>
            <p className="text-sm text-white/60">
              Ajoutez vos mesures en 1 clic et suivez vos tendances
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 text-left bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/[0.07] transition-all">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">
              Analyse intelligente
            </h3>
            <p className="text-sm text-white/60">
              Identifiez vos patterns et optimisez votre routine
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 text-left bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/[0.07] transition-all">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">
              Données sécurisées
            </h3>
            <p className="text-sm text-white/60">
              Cryptage de bout en bout, vos données restent privées
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="w-full max-w-6xl mb-20">
        <div className="">
          <Image
            src="/image/Galaxy-Tab-S7-localhost.png"
            alt="Interface GlycoWatch - Suivi glycémique pour diabète Type 1, Type 2 et gestationnel"
            width={1400}
            height={900}
            className="lg:w-1/2 lg:h-1/2 mx-auto"
            priority
          />
        </div>
      </div>

      {/* Stats row - sous le dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 mb-3">
            <Activity className="w-7 h-7 text-emerald-400" />
          </div>
          <h4 className="text-white font-semibold mb-2">Export PDF</h4>
          <p className="text-sm text-white/60">
            Partagez vos rapports avec votre médecin
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 mb-3">
            <Bot className="w-7 h-7 text-cyan-400" />
          </div>
          <h4 className="text-white font-semibold mb-2">GlycoBot</h4>
          <p className="text-sm text-white/60">
            Assistant intelligent disponible 24/7
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 mb-3">
            <BarChart className="w-7 h-7 text-purple-400" />
          </div>
          <h4 className="text-white font-semibold mb-2">
            Graphiques détaillés
          </h4>
          <p className="text-sm text-white/60">
            Visualisez vos tendances glycémiques sur plusieurs périodes
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Prêt à reprendre le contrôle ?
        </h2>
        <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
          Rejoignez des centaines de diabétiques qui font confiance à GlycoWatch
        </p>
        <a
          href="/signup"
          className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-lg px-12 py-5 rounded-full hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:scale-105"
        >
          Créer mon compte gratuit
        </a>
      </div>
    </section>
  );
}
