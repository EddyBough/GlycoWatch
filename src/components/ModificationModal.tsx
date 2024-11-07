import React, { useState } from "react";

interface ModificationModalProps {
  isOpen: boolean;
  title: string;
  initialValue: number;
  onSubmit: (newValue: number) => void;
  onCancel: () => void;
}

const ModificationModal: React.FC<ModificationModalProps> = ({
  isOpen,
  title,
  initialValue,
  onSubmit,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState(initialValue.toString());

  if (!isOpen) return null;

  const handleSubmit = () => {
    const parsedValue = parseFloat(inputValue);
    if (!isNaN(parsedValue)) {
      onSubmit(parsedValue);
    } else {
      alert("Veuillez entrer une valeur numérique valide.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Soumettre
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModificationModal;
