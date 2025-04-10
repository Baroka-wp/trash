// app/api/dossiers/route.ts
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid" 

import { dossiers } from "@/app/lib/dossierStore"  // Importer depuis le store
import { Dossier } from "@/app/models/Dossier"

// GET - Récupérer tous les dossiers
export async function GET() {
  return NextResponse.json(dossiers)
}

// POST - Créer un nouveau dossier
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const nouveauDossier: Dossier = {
      id: uuidv4(), // Générer un ID unique
      ...data,
      dateCreation: new Date().toISOString() // Ajouter la date et heure de création
    }
    
    dossiers.push(nouveauDossier)
    return NextResponse.json(nouveauDossier, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création du dossier" },
      { status: 400 }
    )
  }
}