import Link from "next/link";
import { WaveBackground } from "@/components/WaveBackground";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params?.token;

  return (
    <div className="relative min-h-screen isolate">
      <WaveBackground />
      <div className="relative flex min-h-screen items-center justify-center p-4 -mt-[60px] lg:-mt-[50px]">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-xl rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-xl font-medium">
              Créer un nouveau mot de passe
            </h1>
          </div>

          <form
            action="/api/reset-password"
            method="POST"
            className="space-y-6"
          >
            <input type="hidden" name="token" value={token || ""} />
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Nouveau mot de passe"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00cba9] text-white py-3 px-4 rounded-lg hover:bg-[#9333EA] transition-colors duration-200 font-medium"
            >
              Réinitialiser le mot de passe
            </button>
          </form>

          <div className="text-center mt-4">
            <Link href="/" className="text-sm text-[#00cba9] hover:underline">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
