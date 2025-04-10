import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Edit, Eye, Trash2 } from "lucide-react"

import { Dossier } from "@/app/models/Dossier"
import { Button } from "@nextui-org/button"

const tabs = ["Locataire/Emplacement", "Diagnostic Amiante", "Programmes & Plans"]

export default function DossierListPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const itemsPerPage = 10
  const [dossiers, setDossiers] = useState<Dossier[]>([])
  const [activeTab, setActiveTab] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Charger les dossiers depuis l'API
  const loadDossiers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/dossiers")

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des dossiers")
      }

      const data = await response.json()
      setDossiers(data)
    } catch (err) {
      console.error(err)
      setError("Impossible de charger les dossiers")
    } finally {
      setIsLoading(false)
    }
  }

  // Charger les dossiers au chargement de la page
  useEffect(() => {
    loadDossiers()
  }, [])

  // Fonction pour supprimer un dossier
  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce dossier ?")) {
      return
    }

    try {
      const response = await fetch(`/api/dossiers/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression")
      }

      // Recharger les dossiers après suppression
      loadDossiers()
    } catch (err) {
      console.error(err)
      alert("Erreur lors de la suppression du dossier")
    }
  }

  // Fonction pour éditer un dossier
  const handleEdit = (id: string) => {
    router.push(`/dashboard/modifier-dossier/${id}`)
  }

  // Fonction pour voir les détails d'un dossier
  const handleView = (id: string) => {
    router.push(`/dashboard/details-dossier/${id}`)
  }

  const totalPages = Math.ceil(dossiers.length / itemsPerPage)
  const currentItems = dossiers.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">📁 Fiche Logement Locataire</h1>
        <Button onClick={() => router.push("/dashboard/creer-dossier")} className="bg-green-600 text-white">
          Nouveau dossier
        </Button>
      </div>

      {error && <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">{error}</div>}

      {/* Onglets */}
      <div className="mb-4 flex border-b">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-6 py-2 font-medium ${activeTab === idx ? "bg-blue-700 text-white" : "text-gray-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chargement */}
      {isLoading ? (
        <div className="py-10 text-center">Chargement des dossiers...</div>
      ) : (
        /* Tableau */
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm font-semibold text-gray-600">
                <th className="p-3">Adresse</th>
                <th className="p-3">N° d&#39;allée</th>
                <th className="p-3">N° de porte</th>
                <th className="p-3">Type</th>
                <th className="p-3">Nom</th>
                <th className="p-3">Téléphone</th>
                <th className="p-3">Email</th>
                <th className="p-3">Date de création</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-5 text-center text-gray-500">
                    Aucun dossier trouvé
                  </td>
                </tr>
              ) : (
                currentItems.map((dossier) => (
                  <tr key={dossier.id}>
                    <td className="p-3">{dossier.adresse}</td>
                    <td className="p-3">{dossier.numeroAllee}</td>
                    <td className="p-3">{dossier.numeroPorte}</td>
                    <td className="p-3">{dossier.typeLogement}</td>
                    <td className="p-3">{dossier.nomLocataire}</td>
                    <td className="p-3">{dossier.telephone}</td>
                    <td className="p-3">{dossier.email}</td>
                    <td className="p-3">{formatDate(dossier.dateCreation)}</td>
                    <td className="flex items-center space-x-2 p-3">
                      <button title="Voir" onClick={() => handleView(dossier.id)}>
                        <Eye className="size-5 text-blue-500 hover:scale-110" />
                      </button>
                      <button title="Éditer" onClick={() => handleEdit(dossier.id)}>
                        <Edit className="size-5 text-green-500 hover:scale-110" />
                      </button>
                      <button title="Supprimer" onClick={() => handleDelete(dossier.id)}>
                        <Trash2 className="size-5 text-red-500 hover:scale-110" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {dossiers.length > 0 && (
        <div className="mt-4 flex justify-between">
          <Button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="bg-gray-200 text-gray-700"
          >
            Précédent
          </Button>
          <span className="self-center">
            Page {page} sur {totalPages || 1}
          </span>
          <Button
            onClick={() => setPage(Math.min(totalPages || 1, page + 1))}
            disabled={page >= totalPages}
            className="bg-gray-200 text-gray-700"
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  )
}
