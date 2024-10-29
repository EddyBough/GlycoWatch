"use client";

import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getMonthlyMeasurements } from "../../lib/getMonthlyMeasurements";

interface Measurement {
  userId: number;
  id: number;
  insulinLevel: number;
  date: Date;
}

export default function GetMeasurementMonthly({ userId }: { userId: number }) {
  const [monthlyMeasurements, setMonthlyMeasurements] = useState<Measurement[]>(
    []
  );
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    async function fetchData() {
      const data = await getMonthlyMeasurements(userId, month, year);
      setMonthlyMeasurements(data);
    }
    fetchData();
  }, [userId, month, year]);

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text(`Mesures Mensuelles - ${month + 1}/${year}`, 10, 10);
    autoTable(doc, {
      head: [["Date", "Heure", "Niveau de glycémie"]],
      body: monthlyMeasurements.map((measure) => [
        new Date(measure.date).toLocaleDateString(),
        new Date(measure.date).toLocaleTimeString(),
        `${measure.insulinLevel} g/L`,
      ]),
    });
    doc.save(`mesures_mensuelles_${month + 1}_${year}.pdf`);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Mesures du mois</h2>

      <div className="flex space-x-2 mb-4">
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="px-3 py-2 border rounded"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("fr", { month: "long" })}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="px-3 py-2 border rounded"
          min="2024"
          max={new Date().getFullYear()}
        />
      </div>

      <button
        onClick={generatePdf}
        className="mt-6 w-full bg-[#00cba9] text-white font-medium py-3 rounded-lg hover:bg-[#00b598] transition duration-200"
      >
        Télécharger en PDF
      </button>
    </div>
  );
}
