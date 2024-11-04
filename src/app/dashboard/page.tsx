"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  getMeasurements,
  addMeasurement,
  editMeasurement,
  deleteMeasurement,
} from "../../../lib/measurements";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { BackgroundDashboard } from "@/components/BackgroundDashboard";
import GetMeasurementMonthly from "@/components/GetMeasurementMonthly";
import MeasurementChart from "@/components/MeasurementChart";

interface Measurement {
  id: number;
  date: Date;
  insulinLevel: number;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [insulinLevel, setInsulinLevel] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const loadMeasurements = async () => {
      if (session?.user?.id) {
        try {
          const data = await getMeasurements(session.user.id);
          setMeasurements(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Erreur lors de la récupération des mesures :", error);
        }
      }
    };

    if (status === "authenticated" && session?.user?.id) {
      loadMeasurements();
    }
  }, [status, session?.user?.id]);

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

    // Créer une nouvelle date en combinant la date sélectionnée et l'heure actuelle
    const currentTime = new Date();
    const dateWithTime = new Date(
      selectedDate.setHours(currentTime.getHours(), currentTime.getMinutes())
    );

    const newMeasurement = await addMeasurement(
      session?.user?.id,
      insulinLevelFloat,
      dateWithTime
    );
    if (newMeasurement) {
      setMeasurements((prev) => [...prev, newMeasurement]);
      setInsulinLevel("");
    }
  };

  const getMeasurementsForDate = (date: Date) => {
    if (!Array.isArray(measurements)) return [];
    return measurements.filter(
      (measurement) =>
        format(new Date(measurement.date), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
    );
  };

  const getMeasurementsForSelectedDate = () => {
    if (!Array.isArray(measurements)) return [];
    return measurements.filter(
      (measurement) =>
        format(new Date(measurement.date), "yyyy-MM-dd") ===
        format(selectedDate ?? new Date(), "yyyy-MM-dd")
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00cba9]/10 to-white/50">
      <BackgroundDashboard />

      <div className="container relative mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue,{" "}
            {session?.user?.firstname
              ? `${session.user.firstname} ${session.user.name}`
              : session?.user?.name}{" "}
            !
          </h1>
          <p className="text-gray-600">
            Suivez vos mesures de glycémie quotidiennes
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            <div className="calendar-container">
              <Calendar
                locale="fr"
                onChange={(value) => {
                  if (value && !Array.isArray(value)) {
                    setSelectedDate(value);
                  } else if (Array.isArray(value)) {
                    setSelectedDate(value[0]);
                  }
                }}
                value={selectedDate ?? new Date()}
                tileContent={({ date }) => {
                  const dayMeasurements = getMeasurementsForDate(date);
                  return dayMeasurements.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {dayMeasurements.map((_, index) => (
                        <div
                          key={index}
                          className="w-1.5 h-1.5 bg-[#00cba9] rounded-full"
                        />
                      ))}
                    </div>
                  ) : null;
                }}
                className="!w-full !border-none !rounded-xl shadow-sm"
              />
            </div>

            <form onSubmit={handleAddMeasurement} className="mt-6 space-y-4">
              <div>
                <input
                  type="number"
                  value={insulinLevel}
                  onChange={(e) => setInsulinLevel(e.target.value)}
                  placeholder="Taux de glycémie"
                  step="0.1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00cba9] focus:border-transparent outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#00cba9] hover:bg-[#00b598] text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium"
              >
                Ajouter une mesure
              </button>
            </form>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4">
              Mesures du{" "}
              {format(selectedDate ?? new Date(), "dd MMMM yyyy", {
                locale: fr,
              })}
            </h2>
            <div className="space-y-3">
              {getMeasurementsForSelectedDate().map((measurement) => (
                <div
                  key={measurement.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm"
                >
                  <div>
                    <p className="text-lg font-medium">
                      {measurement.insulinLevel} mg/L
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(measurement.date), "HH:mm", {
                        locale: fr,
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        const newInsulinLevel = prompt(
                          "Entrez la nouvelle valeur de l'insuline",
                          measurement.insulinLevel.toString()
                        );
                        if (newInsulinLevel) {
                          await editMeasurement(
                            measurement.id,
                            parseFloat(newInsulinLevel)
                          );
                          setMeasurements((prev) =>
                            prev.map((m) =>
                              m.id === measurement.id
                                ? {
                                    ...m,
                                    insulinLevel: parseFloat(newInsulinLevel),
                                  }
                                : m
                            )
                          );
                        }
                      }}
                      className="p-2 text-gray-600 hover:text-[#00cba9] transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      </svg>
                    </button>
                    <button
                      onClick={async () => {
                        if (
                          confirm(
                            "Êtes-vous sûr de vouloir supprimer cette mesure ?"
                          )
                        ) {
                          await deleteMeasurement(measurement.id);
                          setMeasurements((prev) =>
                            prev.filter((m) => m.id !== measurement.id)
                          );
                        }
                      }}
                      className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {getMeasurementsForSelectedDate().length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  Aucune mesure pour cette date
                </p>
              )}
            </div>
          </div>
          <div>
            {session?.user.id && (
              <MeasurementChart
                measurements={measurements}
                selectedDate={selectedDate}
              />
            )}
          </div>
          {session?.user?.id && (
            <GetMeasurementMonthly userId={session.user.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
