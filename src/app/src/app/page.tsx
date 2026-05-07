"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PageAccueil() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Redirection simple pour le moment
    router.push("/enrolement");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* Logo */}
      <div className="w-24 h-24 bg-[#0047AB] rounded-full flex items-center justify-center mb-6">
        <span className="text-white text-3xl font-bold">FRUD</span>
      </div>

      <h1 className="text-2xl font-bold text-[#0047AB] mb-2">FRUD - Espoir Mauritanie</h1>
      <p className="text-gray-600 mb-8 text-center">
        الجبهة الجمهورية للوحدة والديمقراطية
      </p>

      {/* Formulaire de connexion */}
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email de l&apos;agent</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-base"
            placeholder="agent@frud.mr"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-base"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0047AB] text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition"
        >
          Se connecter
        </button>
      </form>

      <p className="mt-6 text-xs text-gray-400">
        Application d&apos;enrôlement des membres
      </p>
    </div>
  );
}
