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
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    fetchMeasurements,
    addMeasurement,
    editMeasurement,
    deleteMeasurement,
  } = useMeasurements();

  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [insulinLevel, setInsulinLevel] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Redirection si non authentifié
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // Chargement des mesures
  useEffect(() => {
    const loadMeasurements = async () => {
      if (session?.user?.id) {
        try {
          const data = await fetchMeasurements(session.user.id);
          setMeasurements(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Erreur lors de la récupération des mesures :", error);
        }
      }
    };

    // L'effet ne se déclenche que lorsque l'utilisateur est authentifié
    if (status === "authenticated" && session?.user?.id) {
      loadMeasurements();
    }
  }, [status, session?.user?.id]); // Utilise uniquement les dépendances nécessaires

  // Gestion de l'ajout de mesure
  const handleAddMeasurement = async (e: React.FormEvent) => {
    e.preventDefault();

    if (insulinLevel === "" || isNaN(parseFloat(insulinLevel))) {
      alert("Veuillez entrer une valeur valide pour le taux d'insuline");
      return;
    }

    const insulinLevelFloat = parseFloat(insulinLevel);

    if (!selectedDate) {
      alert("Veuillez sélectionner une date");
      return;
    }

    const newMeasurement = await addMeasurement(
      session?.user?.id,
      insulinLevelFloat,
      selectedDate
    );
    if (newMeasurement) {
      setMeasurements((prev) => [...prev, newMeasurement]);
      setInsulinLevel("");
    }
  };

  // Fonction pour obtenir les mesures d'une date donnée
  const getMeasurementsForDate = (date: Date) => {
    if (!Array.isArray(measurements)) return [];
    return measurements.filter(
      (measurement) =>
        format(new Date(measurement.date), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
    );
  };

  // Fonction pour afficher uniquement les mesures de la date sélectionnée dans le calendrier
  const getMeasurementsForSelectedDate = () => {
    if (!Array.isArray(measurements)) return [];
    return measurements.filter(
      (measurement) =>
        format(new Date(measurement.date), "yyyy-MM-dd") ===
        format(selectedDate ?? new Date(), "yyyy-MM-dd")
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1>
        Bienvenue,{" "}
        {session?.user?.firstname
          ? `${session.user.firstname} ${session.user.name}`
          : session?.user?.name}{" "}
        !
      </h1>

      {/* Sélection de la date avec le calendrier */}
      <Calendar
        locale="fr"
        onChange={(value: Date | Date[] | null) => {
          if (value && !Array.isArray(value)) {
            setSelectedDate(value);
          }
        }}
        value={selectedDate ?? new Date()}
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

      {/* Formulaire pour ajouter une mesure */}
      <form onSubmit={handleAddMeasurement}>
        <input
          type="number"
          value={insulinLevel}
          onChange={(e) => setInsulinLevel(e.target.value)}
          placeholder="Taux d'insuline"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Ajouter une mesure
        </button>
      </form>

      {/* Liste des mesures pour la date sélectionnée */}
      <ul>
        {getMeasurementsForSelectedDate().map((measurement) => (
          <li key={measurement.id}>
            {format(new Date(measurement.date), "dd/MM/yyyy", { locale: fr })} :{" "}
            {measurement.insulinLevel} g/L
            <div className="flex space-x-4">
              {/* Bouton pour supprimer une mesure */}
              <button
                className="bg-red-500 text-white py-1 px-2 rounded"
                onClick={() =>
                  deleteMeasurement(measurement.id, (id) =>
                    setMeasurements((prev) => prev.filter((m) => m.id !== id))
                  )
                }
              >
                Supprimer
              </button>

              {/* Bouton pour modifier une mesure */}
              <button
                className="bg-green-500 text-white py-1 px-2 rounded"
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
