"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Dossier, TypeLogement } from "@/app/models/Dossier"

export default function CreerDossierPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    adresse: "",
    numeroAllee: "",
    numeroPorte: "",
    typeLogement: "Appartement" as TypeLogement,
    nomLocataire: "",
    telephone: "",
    email: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // Appel à l'API pour créer un nouveau dossier
      const response = await fetch("/api/dossiers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la création du dossier")
      }

      const nouveauDossier = await response.json()
      setSuccessMessage("Dossier créé avec succès!")

      // Rediriger vers la page de liste des dossiers
      router.push("/dashboard/liste-dossiers")
    } catch (err) {
      setError("Une erreur est survenue lors de la création du dossier.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Créer un nouveau dossier</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Adresse */}
            <div className="col-span-2">
              <label
                htmlFor="adresse"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Adresse
              </label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                required
                value={formData.adresse}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* N° d'allée */}
            <div>
              <label
                htmlFor="numeroAllee"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                N° d&apos;allée
              </label>
              <input
                type="text"
                id="numeroAllee"
                name="numeroAllee"
                value={formData.numeroAllee}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* N° de porte */}
            <div>
              <label
                htmlFor="numeroPorte"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                N° de porte
              </label>
              <input
                type="text"
                id="numeroPorte"
                name="numeroPorte"
                value={formData.numeroPorte}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Type de logement */}
            <div>
              <label
                htmlFor="typeLogement"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Type de logement
              </label>
              <select
                id="typeLogement"
                name="typeLogement"
                value={formData.typeLogement}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Appartement">Appartement</option>
                <option value="Maison">Maison</option>
                <option value="Studio">Studio</option>
                <option value="Duplex">Duplex</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            {/* Nom complet du locataire */}
            <div className="col-span-2">
              <label
                htmlFor="nomLocataire"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nom complet du locataire
              </label>
              <input
                type="text"
                id="nomLocataire"
                name="nomLocataire"
                required
                value={formData.nomLocataire}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label
                htmlFor="telephone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Téléphone
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                required
                value={formData.telephone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/liste-dossiers")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? "Création en cours..." : "Créer le dossier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}