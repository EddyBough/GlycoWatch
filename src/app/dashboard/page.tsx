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
import ModificationModal from "@/components/ModificationModal";
import ConfirmationModal from "@/components/confirmationModal";
import ChatbotComponent from "@/components/Chatbot/ChatbotComponent";

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showModificationModal, setModificationModal] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] =
    useState<Measurement | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMeasurementForDelete, setSelectedMeasurementForDelete] =
    useState<Measurement | null>(null);

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

    if (glycemyLevel === "" || isNaN(parseFloat(glycemyLevel))) {
      alert("Veuillez entrer une valeur valide pour le taux de glycémie");
      return;
    }

    const glycemyLevelFloat = parseFloat(glycemyLevel);

    if (!selectedDate) {
      alert("Veuillez sélectionner une date");
      return;
    }

    // Create new date with date selected and current time
    const currentTime = new Date();
    const dateWithTime = new Date(
      selectedDate.setHours(currentTime.getHours(), currentTime.getMinutes())
    );

    const newMeasurement = await addMeasurement(
      session?.user?.id,
      glycemyLevelFloat,
      dateWithTime
    );
    if (newMeasurement) {
      setMeasurements((prev) => [...prev, newMeasurement]);
      setGlycemyLevel("");
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

  // Function for display the Modal on true and get the Measure selected
  const handleEditClick = (measurement: Measurement) => {
    setSelectedMeasurement(measurement);
    setModificationModal(true);
  };

  // Function for validation and actualization of the Glycemy Level without refresh the page
  const handleConfirmEdit = async (newValue: number) => {
    if (selectedMeasurement) {
      await editMeasurement(selectedMeasurement.id, newValue);
      setMeasurements((prev) =>
        prev.map((m) =>
          m.id === selectedMeasurement.id ? { ...m, glycemyLevel: newValue } : m
        )
      );
      setModificationModal(false);
      setSelectedMeasurement(null);
    }
  };

  // Function for display the confirmationModal on true and get the Measure selected
  const handleDeleteClick = (measurement: Measurement) => {
    setSelectedMeasurementForDelete(measurement);
    setShowDeleteModal(true);
  };

  // Function for validation of deletion and actualization of the Glycemy Level's array without refresh the page
  const handleConfirmDeleteMeasurement = async () => {
    if (selectedMeasurementForDelete) {
      await deleteMeasurement(selectedMeasurementForDelete.id);
      setMeasurements((prev) =>
        prev.filter((m) => m.id !== selectedMeasurementForDelete.id)
      );
      setShowDeleteModal(false);
      setSelectedMeasurementForDelete(null);
    }
  };

  const handleCancelDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedMeasurementForDelete(null);
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
                  value={glycemyLevel}
                  onChange={(e) => setGlycemyLevel(e.target.value)}
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
                      {measurement.glycemyLevel} mg/L
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(measurement.date), "HH:mm", {
                        locale: fr,
                      })}
                    </p>
                  </div>
                  <div className="flex flex-row space-x-10">
                    <div>
                      <div>
                        <button onClick={() => handleEditClick(measurement)}>
                          <svg
                            className=" mt-3"
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
                      </div>

                      {/* confirmation modal */}
                      {showModificationModal && selectedMeasurement && (
                        <ModificationModal
                          isOpen={showModificationModal}
                          title="Modifier la mesure"
                          initialValue={selectedMeasurement.glycemyLevel}
                          onSubmit={handleConfirmEdit}
                          onCancel={() => setModificationModal(false)}
                        />
                      )}
                    </div>

                    <div>
                      <button
                        onClick={() => handleDeleteClick(measurement)}
                        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                      >
                        <svg
                          className="mt-1"
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

                      {showDeleteModal && selectedMeasurementForDelete && (
                        <ConfirmationModal
                          isOpen={showDeleteModal}
                          title="Confirmation de suppression"
                          message="Êtes-vous sûr de vouloir supprimer cette mesure ?"
                          onConfirm={handleConfirmDeleteMeasurement}
                          onCancel={handleCancelDeleteModal}
                        />
                      )}
                    </div>
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
            <div>
              <GetMeasurementMonthly userId={session.user.id} />
            </div>
          )}
          <div className="fixed bottom-4 right-4 w-96 shadow-lg">
            <ChatbotComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
