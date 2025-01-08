import { useState } from "react";

interface ModificationModalProps {
  isOpen: boolean;
  title: string;
  initialValue: number;
  insulinValue?: number | null;
  onSubmit: (newGlycemyLevel: number, newInsulinDose: number) => void;
  onCancel: () => void;
}

const ModificationModal: React.FC<ModificationModalProps> = ({
  isOpen,
  title,
  initialValue,
  insulinValue,
  onSubmit,
  onCancel,
}) => {
  const [newGlycemyLevel, setNewGlycemyLevel] = useState(initialValue);
  const [newInsulinDose, setNewInsulinDose] = useState(insulinValue || 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nouveau taux de glycémie
            </label>
            <input
              type="number"
              value={newGlycemyLevel}
              onChange={(e) => setNewGlycemyLevel(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nouvelle dose d&apos;insuline
            </label>
            <input
              type="number"
              value={newInsulinDose}
              onChange={(e) => setNewInsulinDose(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => onSubmit(newGlycemyLevel, newInsulinDose)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Confirmer
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModificationModal;
