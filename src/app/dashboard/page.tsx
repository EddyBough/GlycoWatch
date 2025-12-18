"use client";

import { useEffect, useState } from "react";
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
import ModificationModal from "@/components/ModificationModal";
import ConfirmationModal from "@/components/confirmationModal";
import ChatbotComponent from "@/components/Chatbot/ChatbotComponent";
import { toast } from "react-toastify";

interface Measurement {
  id: number;
  date: Date;
  glycemyLevel: number;
  insulinDose?: number | null;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [glycemyLevel, setGlycemyLevel] = useState<string>("");
  const [insulinDose, setInsulinDose] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedMeasurement, setSelectedMeasurement] =
    useState<Measurement | null>(null);
  const [showModificationModal, setModificationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
          toast.error("Erreur lors de la récupération des mesures");
        }
      }
    };

    if (status === "authenticated" && session?.user?.id) {
      loadMeasurements();
    }
  }, [status, session?.user?.id]);

  const handleAddMeasurement = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!glycemyLevel || isNaN(parseFloat(glycemyLevel))) {
      toast.error("Veuillez entrer une valeur valide pour le taux de glycémie");
      return;
    }

    const glycemyLevelFloat = parseFloat(glycemyLevel);
    const insulinDoseFloat = insulinDose ? parseFloat(insulinDose) : null;

    if (!selectedDate) {
      toast.error("Veuillez sélectionner une date");
      return;
    }

    // Combine selected date with current time
    const currentTime = new Date();
    const dateWithTime = new Date(selectedDate);
    dateWithTime.setHours(
      currentTime.getHours(),
      currentTime.getMinutes(),
      0,
      0
    );

    if (!session?.user?.id) {
      toast.error("Utilisateur non authentifié");
      return;
    }

    try {
      const newMeasurement = await addMeasurement(
        session.user.id,
        glycemyLevelFloat,
        insulinDoseFloat,
        dateWithTime
      );

      if (newMeasurement) {
        setMeasurements((prev) => [...prev, newMeasurement]);
        setGlycemyLevel("");
        setInsulinDose("");
      }
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la mesure");
    }
  };

  const handleEditMeasurement = async (
    newGlycemyLevel: number,
    newInsulinDose: number | null
  ) => {
    if (selectedMeasurement) {
      await editMeasurement(
        selectedMeasurement.id,
        newGlycemyLevel,
        newInsulinDose
      );
      setMeasurements((prev) =>
        prev.map((m) =>
          m.id === selectedMeasurement.id
            ? {
                ...m,
                glycemyLevel: newGlycemyLevel,
                insulinDose: newInsulinDose,
              }
            : m
        )
      );
      setModificationModal(false);
      setSelectedMeasurement(null);
    }
  };

  const handleDeleteMeasurement = async () => {
    if (selectedMeasurement) {
      await deleteMeasurement(selectedMeasurement.id);
      setMeasurements((prev) =>
        prev.filter((m) => m.id !== selectedMeasurement.id)
      );
      setShowDeleteModal(false);
      setSelectedMeasurement(null);
    }
  };

  const getMeasurementsForDate = (date: Date) =>
    measurements.filter(
      (measurement) =>
        format(new Date(measurement.date), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
    );

  const getMeasurementsForSelectedDate = () =>
    measurements.filter(
      (measurement) =>
        format(new Date(measurement.date), "yyyy-MM-dd") ===
        format(selectedDate ?? new Date(), "yyyy-MM-dd")
    );

  return (
    <div className="min-h-screen">
      <BackgroundDashboard />

      <div className="container relative mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Bienvenue,{" "}
            {session?.user?.firstname
              ? `${session.user.firstname} ${session.user.name}`
              : session?.user?.name}{" "}
            !
          </h1>
          <p className="text-white/70">
            Suivez vos mesures de glycémie quotidiennes
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
            <Calendar
              locale="fr"
              onChange={(value) => {
                setSelectedDate(value instanceof Date ? value : null);
              }}
              value={selectedDate ?? new Date()}
              tileContent={({ date }) => {
                const dayMeasurements = getMeasurementsForDate(date);
                return dayMeasurements.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dayMeasurements.map((_, index) => (
                      <div
                        key={index}
                        className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                      />
                    ))}
                  </div>
                ) : null;
              }}
              className="!w-full !border-none !rounded-xl shadow-sm"
            />

            <form onSubmit={handleAddMeasurement} className="mt-6 space-y-4">
              <input
                type="number"
                value={glycemyLevel}
                onChange={(e) => setGlycemyLevel(e.target.value)}
                placeholder="Taux de glycémie"
                step="0.1"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
              <input
                type="number"
                value={insulinDose || ""}
                onChange={(e) => setInsulinDose(e.target.value)}
                placeholder="Dose d'insuline (optionnelle)"
                step="0.1"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-emerald-500/50"
              >
                Ajouter une mesure
              </button>
            </form>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Mesures du{" "}
              {format(selectedDate ?? new Date(), "dd MMMM yyyy", {
                locale: fr,
              })}
            </h2>
            <div className="space-y-3">
              {getMeasurementsForSelectedDate().map((measurement) => (
                <div
                  key={measurement.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 shadow-sm"
                >
                  <div>
                    <p className="text-lg font-medium text-white">
                      {measurement.glycemyLevel} mg/L
                    </p>
                    {measurement.insulinDose && (
                      <p className="text-sm text-white/60">
                        {measurement.insulinDose} U d&apos;insuline
                      </p>
                    )}
                    <p className="text-sm text-white/60">
                      {format(new Date(measurement.date), "HH:mm", {
                        locale: fr,
                      })}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setSelectedMeasurement(measurement);
                        setModificationModal(true);
                      }}
                      className="text-green-400 hover:text-cyan-300 transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMeasurement(measurement);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {session?.user?.id && (
              <MeasurementChart
                measurements={measurements}
                selectedDate={selectedDate}
              />
            )}
          </div>

          {session?.user?.id && (
            <div>
              <GetMeasurementMonthly userId={session.user.id} />
            </div>
          )}

          <div className="fixed bottom-4 right-4 w-96 shadow-lg z-10">
            <ChatbotComponent />
          </div>
        </div>

        {showModificationModal && selectedMeasurement && (
          <ModificationModal
            isOpen={showModificationModal}
            title="Modifier la mesure"
            initialValue={selectedMeasurement.glycemyLevel}
            insulinValue={selectedMeasurement.insulinDose}
            onSubmit={handleEditMeasurement}
            onCancel={() => setModificationModal(false)}
          />
        )}

        {showDeleteModal && (
          <ConfirmationModal
            isOpen={showDeleteModal}
            title="Supprimer la mesure"
            message="Êtes-vous sûr de vouloir supprimer cette mesure ?"
            onConfirm={handleDeleteMeasurement}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
