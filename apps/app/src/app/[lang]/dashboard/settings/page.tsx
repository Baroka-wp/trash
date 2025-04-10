// src/app/[lang]/dashboard/settings/page.tsx

"use client"

import { useState } from "react"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

      {/* Section Profil */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Profil</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Nom complet" className="input input-bordered w-full" />
          <input type="email" placeholder="Email" className="input input-bordered w-full" />
          <input type="tel" placeholder="Téléphone" className="input input-bordered w-full" />
        </div>
      </section>

      {/* Section Préférences */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Préférences</h2>
        <div className="space-y-4">
          <select className="select select-bordered w-full">
            <option>Français</option>
            <option>Anglais</option>
          </select>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="toggle"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span>Mode sombre</span>
          </label>
        </div>
      </section>

      {/* Section Sécurité */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Sécurité</h2>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="input input-bordered w-full"
          />
        </div>
      </section>

      {/* Section Supprimer compte */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Gestion de compte</h2>
        <button className="btn btn-error">Supprimer mon compte</button>
      </section>
    </div>
  )
}
