"use client";

import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getMonthlyMeasurements } from "../../lib/getMonthlyMeasurements";

interface Measurement {
  userId: number;
  id: number;
  glycemyLevel: number;
  insulinDose?: number | null;
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
    const doc = new jsPDF({ orientation: "landscape" }); // Mode paysage pour plus d'espace

    //  Titre du document
    doc.setFontSize(18);
    doc.setTextColor("#00cba9");
    doc.text(`Mesures Mensuelles - ${month + 1}/${year}`, 148, 15, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setTextColor("#333");
    doc.text("Rapport généré par GlycoWatch®", 148, 25, { align: "center" });

    //  Regrouper les mesures par date
    const groupedMeasurements: Record<string, Measurement[]> = {};
    monthlyMeasurements.forEach((measure) => {
      const date = new Date(measure.date).toLocaleDateString("fr-FR");
      if (!groupedMeasurements[date]) groupedMeasurements[date] = [];
      groupedMeasurements[date].push(measure);
    });

    // Création du tableau avec 6 colonnes maximum par jour
    const tableBody: any[] = [];

    Object.entries(groupedMeasurements).forEach(([date, measures]) => {
      // Trier les mesures par heure
      measures.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Créer une ligne avec les 6 premières mesures
      const row: string[] = [date];
      measures.slice(0, 6).forEach((measure) => {
        row.push(
          `${new Date(measure.date).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}\n${measure.glycemyLevel} mg/L\n${
            measure.insulinDose ? measure.insulinDose + " U" : "—"
          }`
        );
      });

      // Compléter les cellules vides s'il y a moins de 6 mesures dans la journée
      while (row.length < 7) {
        row.push("—");
      }

      tableBody.push(row);
    });

    // Générer le tableau
    autoTable(doc, {
      startY: 35,
      head: [
        [
          "Date",
          "Mesure 1",
          "Mesure 2",
          "Mesure 3",
          "Mesure 4",
          "Mesure 5",
          "Mesure 6",
        ],
      ],
      body: tableBody,
      styles: {
        font: "helvetica",
        fontSize: 9,
        cellPadding: 2,
        halign: "center",
      },
      headStyles: {
        fillColor: [0, 203, 169],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
    });

    doc.setFontSize(10);
    doc.setTextColor("#555");
    doc.text(
      `© GlycoWatch® - ${new Date().getFullYear()}`,
      148,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );

    doc.save(`mesures_mensuelles_${month + 1}_${year}.pdf`);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg p-6 lg:mt-0 mt-8 mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Mesures du mois</h2>

      <div className="flex space-x-2 mb-4">
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i} className="bg-gray-900">
              {new Date(0, i).toLocaleString("fr", { month: "long" })}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded text-white"
          min="2024"
          max={new Date().getFullYear()}
        />
      </div>

      <button
        onClick={generatePdf}
        className="mt-6 w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/50"
      >
        Télécharger en PDF
      </button>
    </div>
  );
}
