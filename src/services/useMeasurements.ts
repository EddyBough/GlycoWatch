// src/services/useMeasurements.ts

export const useMeasurements = () => {
  const fetchMeasurements = async () => {
    const response = await fetch("/api/measurements");
    const data = await response.json();
    return data;
  };

  const addMeasurement = async (
    userId: number,
    insulinLevel: number,
    date: Date
  ) => {
    const response = await fetch("/api/measurements", {
      method: "POST",
      body: JSON.stringify({ userId, insulinLevel, date }),
      headers: { "Content-Type": "application/json" },
    });
    return response.ok ? await response.json() : null;
  };

  const editMeasurement = async (id: number, insulinLevel: number) => {
    const response = await fetch("/api/measurements", {
      method: "PUT",
      body: JSON.stringify({ id, insulinLevel }),
      headers: { "Content-Type": "application/json" },
    });
    return response.ok ? await response.json() : null;
  };

  const deleteMeasurement = async (
    id: number,
    onSuccess: (id: number) => void
  ) => {
    const response = await fetch(`/api/measurements?id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      onSuccess(id); // Execute the callback on success
    }
    return response.ok;
  };

  return {
    fetchMeasurements,
    addMeasurement,
    editMeasurement,
    deleteMeasurement,
  };
};
