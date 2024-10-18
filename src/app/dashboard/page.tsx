"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useMeasurements } from "@/services/useMeasurements";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Définir une interface pour typer Measurement et éviter les erreurs type
interface Measurement {
  id: number;
  date: string;
  insulinLevel: number;
}

const Dashboard = () => {
  const { data: session, status } = useSession(); // On
  const router = useRouter();
  const {
    fetchMeasurements,
    addMeasurement,
    editMeasurement,
    deleteMeasurement,
  } = useMeasurements();

  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [insulinLevel, setInsulinLevel] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Autorise null

  // Redirection si non authentifié
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status]);

  // Chargement des mesures
  useEffect(() => {
    const loadMeasurements = async () => {
      const data: Measurement[] = await fetchMeasurements();
      setMeasurements(data);
    };
    if (session) {
      loadMeasurements();
    }
  }, [session]);

  // Gestion de l'ajout de mesure
  const handleAddMeasurement = async (e: React.FormEvent) => {
    e.preventDefault();

    if (insulinLevel === "" || isNaN(parseFloat(insulinLevel))) {
      alert("Veuillez entrer une valeur valide pour le taux d'insuline");
      return;
    }

    const insulinLevelFloat = parseFloat(insulinLevel); // Conversion en float

    // Vérifier si selectedDate n'est pas null avant de l'utiliser
    if (!selectedDate) {
      alert("Veuillez sélectionner une date");
      return;
    }

    console.log("Date sélectionnée :", selectedDate);

    // La date sélectionnée est envoyée ici et stockée dans selectedDate
    const newMeasurement = await addMeasurement(
      session?.user?.id,
      insulinLevelFloat,
      selectedDate // Utilisation de la date sélectionnée
    );
    if (newMeasurement) {
      setMeasurements((prev) => [...prev, newMeasurement]);
      setInsulinLevel(""); // Réinitialise le champ après ajout
    }
  };

  // Fonction pour obtenir les mesures d'une date donnée
  const getMeasurementsForDate = (date: Date) => {
    return measurements.filter(
      (measurement) =>
        format(new Date(measurement.date), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
    );
  };

  // Function pour afficher uniquement les mesures de la date selectionnée dans le calendrier
  const getMeasurementsForSelectedDate = () => {
    return measurements.filter(
      (measurement) =>
        format(new Date(measurement.date), "yyyy-MM-dd") ===
        format(selectedDate ?? new Date(), "yyyy-MM-dd")
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Bienvenue, {session?.user?.name} !</h1>

      {/* Sélection de la date avec le calendrier */}
      <Calendar
        locale="fr"
        onChange={(value: Date | Date[] | null) => {
          if (value && !Array.isArray(value)) {
            setSelectedDate(value); // Mettre à jour selectedDate
          }
        }}
        value={selectedDate ?? new Date()} // Utiliser la date sélectionnée ou la date actuelle
        tileContent={({ date }) => {
          const dayMeasurements = getMeasurementsForDate(date);
          return (
            <div>
              {dayMeasurements.length > 0 && (
                <ul>
                  {dayMeasurements.map((measurement) => (
                    <li key={measurement.id}>{measurement.insulinLevel} g/L</li>
                  ))}
                </ul>
              )}
            </div>
          );
        }}
      />
      {/* form et input pour AJOUTER une mesure */}
      <form onSubmit={handleAddMeasurement}>
        <input
          type="number"
          value={insulinLevel}
          onChange={(e) => setInsulinLevel(e.target.value)}
          placeholder="Taux d'insuline"
        />
        {/* Bouton pour AJOUTER une mesure */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Ajouter une mesure
        </button>
      </form>

      <ul>
        {/* Pour afficher seulement les mesures du jour du calendrier selectionné */}
        {getMeasurementsForSelectedDate().map((measurement) => (
          <li key={measurement.id}>
            {format(new Date(measurement.date), "dd/MM/yyyy", { locale: fr })} :{" "}
            {measurement.insulinLevel} g/L
            <div className="flex space-x-4">
              {/* Button pour SUPPRIMER les mesures */}
              <button
                className="bg-red-500 text-white py-1 px-2 rounded"
                onClick={() =>
                  deleteMeasurement(measurement.id, (id) =>
                    // Vient mettre à jour sans avoir à rafraichir la page
                    setMeasurements((prev) => prev.filter((m) => m.id !== id))
                  )
                }
              >
                Supprimer
              </button>

              {/* Button pour MODIFIER les mesures */}
              <button
                className="bg-green-500 text-white py-1 px-2 rounded"
                // au clic, newInsulineLevel ouvre une modal ou on saisi la nvlle valeur
                onClick={() => {
                  const newInsulinLevel = prompt(
                    "Entrez la nouvelle valeur de l'insuline",
                    measurement.insulinLevel.toString()
                  );
                  if (newInsulinLevel) {
                    editMeasurement(
                      measurement.id,
                      parseFloat(newInsulinLevel)
                    );
                    // Vient mettre à jour sans avoir à rafraichir la page
                    setMeasurements((prev) =>
                      prev.map((m) =>
                        m.id === measurement.id
                          ? { ...m, insulinLevel: parseFloat(newInsulinLevel) }
                          : m
                      )
                    );
                  }
                }}
              >
                Modifier
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
