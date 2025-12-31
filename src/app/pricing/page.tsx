"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BackgroundDashboard } from "@/components/BackgroundDashboard";
import { Check, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

const PricingPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // Gérer les retours de Stripe Checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      toast.success("Abonnement réussi ! Redirection en cours...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
    if (params.get("canceled") === "true") {
      toast.info("Paiement annulé");
    }
  }, [router]);

  const handleSubscribe = async (plan: string) => {
    if (plan !== "IA_PLUS") return;

    setLoading(plan);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors de la création de la session"
        );
      }

      // Rediriger vers Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de checkout manquante");
      }
    } catch (error: any) {
      console.error("Erreur checkout:", error);
      toast.error(
        error.message || "Erreur lors de l'abonnement. Veuillez réessayer."
      );
      setLoading(null);
    }
  };

  const plans = [
    {
      name: "Gratuit",
      plan: "FREE",
      price: "0",
      period: "toujours",
      description: "Parfait pour commencer votre suivi glycémique",
      features: [
        "Suivi illimité de vos mesures",
        "Graphiques et statistiques",
        "Export PDF de vos données",
        "Calendrier interactif",
        "Historique complet",
      ],
      cta: "Cliquez ici",
      ctaDisabled: true,
      icon: Zap,
      popular: false,
    },
    {
      name: "IA+",
      plan: "IA_PLUS",
      price: "2.99",
      period: "mois",
      description:
        "Accès à l'assistant IA GlycoBot pour des conseils personnalisés",
      features: [
        "Tout du plan Gratuit",
        "Jusqu'à 50 analyses IA personnalisées par jour",
        "Conseils personnalisés sur votre diabète",
        "Prise en compte de votre type de diabète (T1, T2, LADA…)",
        "Analyse IA de vos données réelles",
        "Recommandations personnalisées pour votre diabète",
        "Support prioritaire",
      ],
      cta: "S'abonner",
      ctaDisabled: false,
      icon: Sparkles,
      popular: true,
    },
  ];

  const currentPlan = session?.user?.plan || "FREE";

  return (
    <div className="min-h-screen relative">
      <BackgroundDashboard />
      <div className="container relative mx-auto p-4 sm:p-6 lg:p-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choisissez votre plan
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Des fonctionnalités adaptées à vos besoins
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = plan.plan === currentPlan;

            return (
              <div
                key={plan.plan}
                className={`relative bg-white/10 backdrop-blur-md rounded-2xl border shadow-xl p-8 transition-all duration-300 h-full flex flex-col ${
                  plan.popular ? "border-[#00cba9]/50" : "border-white/20"
                } ${isCurrentPlan ? "ring-2 ring-[#00cba9]/50" : ""}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#00cba9] to-cyan-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Le plus populaire
                    </span>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrentPlan && (
                  <div className="absolute top-2 right-4">
                    <span className="bg-[#00cba9]/20 text-[#00cba9] text-xs font-semibold px-3 py-1 rounded-full border border-[#00cba9]/40">
                      Plan actuel
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 rounded-xl ${
                      plan.popular ? "bg-[#00cba9]/20" : "bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        plan.popular ? "text-[#00cba9]" : "text-white/80"
                      }`}
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">
                      {plan.price}€
                    </span>
                    {plan.period !== "toujours" && (
                      <span className="text-white/60">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-white/70 mt-2">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#00cba9] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan.plan)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isCurrentPlan
                      ? "bg-white/10 text-white/60 border border-white/20 cursor-not-allowed"
                      : plan.plan === "IA_PLUS"
                      ? "bg-gradient-to-r from-[#00cba9] to-cyan-500 text-white hover:from-[#00b598] hover:to-cyan-600 shadow-lg shadow-[#00cba9]/30 hover:shadow-[#00cba9]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      : "bg-white/10 text-white/60 border border-white/20 cursor-not-allowed opacity-70"
                  }`}
                  disabled={
                    isCurrentPlan ||
                    plan.plan !== "IA_PLUS" ||
                    loading === plan.plan
                  }
                >
                  {loading === plan.plan
                    ? "Chargement..."
                    : isCurrentPlan
                    ? "Plan actuel"
                    : plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors"
          >
            ← Retour au dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
