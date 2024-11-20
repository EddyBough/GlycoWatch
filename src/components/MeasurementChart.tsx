"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Measurement {
  date: Date;
  glycemyLevel: number;
}

export default function MeasurementChart({
  measurements,
  selectedDate,
}: {
  measurements: Measurement[];
  selectedDate: Date | null;
}) {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [
      {
        label: "Niveau d'insuline",
        data: [],
        fill: false,
        borderColor: "#00cba9",
        tension: 0.2,
      },
    ],
  });

  useEffect(() => {
    const filteredMeasurements = measurements
      .filter(
        (m) =>
          selectedDate &&
          new Date(m.date).toLocaleDateString() ===
            selectedDate.toLocaleDateString()
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const labels = filteredMeasurements.map((m) =>
      new Date(m.date).toLocaleTimeString()
    );
    const data = filteredMeasurements.map((m) => m.glycemyLevel);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Niveau de glycémie",
          data: data,
          fill: false,
          borderColor: "#00cba9",
          tension: 0.2,
        },
      ],
    });
  }, [measurements, selectedDate]);

  return (
    <div className="container bg-white p-6 rounded-xl shadow-lg w-full max-h-[400px]">
      <h2 className="text-xl font-semibold mb-4">
        Évolution du niveau de glycémie - {selectedDate?.toLocaleDateString()}
      </h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            },
          },
          scales: {
            x: {
              display: true,
              title: { display: true, text: "Heure" },
              ticks: {
                maxRotation: 45,
                minRotation: 0,
                autoSkip: true,
                font: {
                  size: 10,
                },
              },
            },
            y: {
              display: true,
              title: { display: true, text: "Niveau de glycémie (mg/L)" },
              ticks: {
                font: {
                  size: 10,
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
