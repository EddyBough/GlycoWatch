import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Route pour récupérer toutes les mesures
export async function GET(req: NextRequest) {
  try {
    const measurements = await prisma.measurement.findMany();
    return NextResponse.json(measurements);
  } catch (error) {
    console.error("Erreur lors du chargement des mesures :", error);
    return NextResponse.json(
      { message: "Erreur lors du chargement des mesures" },
      { status: 500 }
    );
  }
}
//Route pour ajouter les nouvelles mesures
export async function POST(req: NextRequest) {
  const body = await req.json(); // Récupère le corps de la requête
  const { userId, insulinLevel, date } = body; // Récupère la date envoyée par le front dans le body

  try {
    // Créé la mesure dans la bdd
    const newMeasurement = await prisma.measurement.create({
      data: {
        userId,
        insulinLevel,
        date: new Date(date), // Prendra la date envoyée côté front
      },
    });

    return NextResponse.json(newMeasurement, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la mesure :", error);
    return NextResponse.json(
      { message: "Erreur lors de l'ajout de la mesure" },
      { status: 500 }
    );
  }
}

// Route pour modifier les mesures
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, insulinLevel } = body; // on utilise l'id de la mesure à modifier

  try {
    const updatedMeasurement = await prisma.measurement.update({
      where: { id: parseInt(id) },
      data: { insulinLevel },
    });

    return NextResponse.json(updatedMeasurement, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la modification de la mesure :", error);
    return NextResponse.json(
      { message: "Erreur lors de la modification de la mesure" },
      { status: 500 }
    );
  }
}

// Route pour supprimer les mesures
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Vérifier si l'ID est valide
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { message: "ID invalide ou manquant" },
        { status: 400 }
      );
    }

    // Supprimer la mesure en fonction de l'ID
    await prisma.measurement.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Mesure supprimée" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression de la mesure :", error);
    return NextResponse.json(
      { message: "Erreur lors de la suppression de la mesure" },
      { status: 500 }
    );
  }
}
