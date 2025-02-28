import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCell } from "../../store/slices/spreadSheetSlice";
import DimenssionControls from "../Grid/DimenssionControls";
import { Undo, XCircle, CheckCircle } from "lucide-react"; // Icons for UI

const FormulaeBar = () => {
  const dispatch = useDispatch();
  const activeCell = useSelector((state) => state.spreadSheet.activeCell);
  const cellData = useSelector((state) =>
    activeCell ? state.spreadSheet.cells[activeCell] : null
  );

  const [formulae, setFormulae] = useState("");
  const [previousFormulae, setPreviousFormulae] = useState(""); // To store the last value for undo
  const [isSaving, setIsSaving] = useState(false); // For auto-save indicator

  useEffect(() => {
    if (cellData) {
      setFormulae(cellData.formulae || cellData.value || "");
      setPreviousFormulae(cellData.formulae || cellData.value || ""); // Store previous value
    } else {
      setFormulae("");
      setPreviousFormulae("");
    }
  }, [activeCell, cellData]);

  const handleFormulaeChange = useCallback((e) => {
    setFormulae(e.target.value);
  }, []);

  const handleFormulaeSubmit = useCallback(() => {
    if (!activeCell) return;

    const value = formulae.startsWith("=") ? evaluateFormulae(formulae) : formulae;

    dispatch(
      updateCell({
        id: activeCell,
        value: value,
        formulae: formulae.startsWith("=") ? formulae : "",
      })
    );

    setIsSaving(true); // Show saving indicator
    setTimeout(() => setIsSaving(false), 1000); // Remove after 1s
  }, [dispatch, activeCell, formulae]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleFormulaeSubmit();
      }
    },
    [handleFormulaeSubmit]
  );

  const handleUndo = () => {
    setFormulae(previousFormulae); // Restore previous value
  };

  const handleClear = () => {
    setFormulae("");
  };

  return (
    <div className="flex items-center border-b border-gray-300 px-2 py-2 bg-gray-50 shadow-sm">
      {/* Active Cell Indicator */}
      <div className="flex items-center mr-2">
        <div className="bg-green-200 px-3 py-1 rounded text-green-900 font-semibold min-w-[50px] flex items-center justify-center">
          {activeCell || ""}
        </div>
      </div>

      {/* Formula Label */}
      <span className="text-green-900 text-md font-semibold mr-2">fx</span>

      {/* Formula Input */}
      <input
        type="text"
        className="ml-2 flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition"
        value={formulae}
        onChange={handleFormulaeChange}
        onBlur={handleFormulaeSubmit}
        onKeyDown={handleKeyDown}
        placeholder="Enter a value or formula"
      />

      {/* Buttons: Undo, Clear, Save Indicator */}
      <div className="flex items-center space-x-2 ml-2">
        {/* Undo Button */}
        <button
          onClick={handleUndo}
          className="p-1 text-gray-600 hover:text-gray-800 transition"
          title="Undo"
        >
          <Undo size={18} />
        </button>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="p-1 text-red-600 hover:text-red-800 transition"
          title="Clear Formula"
        >
          <XCircle size={18} />
        </button>

        {/* Saving Indicator */}
        {isSaving && <CheckCircle size={18} className="text-green-600 animate-pulse" title="Saved" />}
      </div>

      {/* Dimension Controls */}
      <DimenssionControls />
    </div>
  );
};

export default FormulaeBar;
