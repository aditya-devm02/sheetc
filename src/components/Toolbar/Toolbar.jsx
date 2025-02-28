import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCellFormat } from "../../store/slices/spreadSheetSlice";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Trash2,
} from "lucide-react";

const Toolbar = () => {
  const dispatch = useDispatch();
  const activeCell = useSelector((state) => state.spreadSheet.activeCell);
  const cellData = useSelector((state) =>
    activeCell ? state.spreadSheet.cells[activeCell] : null
  );

  const updateFormat = (formatUpdate) => {
    if (!activeCell) return;

    const cellCurrentFormat = cellData?.format || {};
    const newFormat = {
      ...cellCurrentFormat,
      ...formatUpdate,
    };

    dispatch(
      updateCellFormat({
        id: activeCell,
        format: newFormat,
      })
    );
  };

  const resetFormatting = () => {
    if (!activeCell) return;
    dispatch(
      updateCellFormat({
        id: activeCell,
        format: {},
      })
    );
  };

  return (
    <div className="flex items-center space-x-2 px-3 py-2 border-b border-gray-300 bg-gray-100 shadow-sm">
      {/* Font Family & Size */}
      <div className="flex items-center space-x-2 border-r border-gray-300 pr-3">
        <select
          value={cellData?.format?.fontFamily || "Arial"}
          onChange={(e) => updateFormat({ fontFamily: e.target.value })}
          className="h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none"
        >
          <option>Arial</option>
          <option>Times New Roman</option>
          <option>Calibri</option>
          <option>Roboto</option>
          <option>Verdana</option>
        </select>
        <select
          className="h-8 w-16 border border-gray-300 rounded text-sm bg-white focus:outline-none"
          value={cellData?.format?.fontSize || 12}
          onChange={(e) => updateFormat({ fontSize: Number(e.target.value) })}
        >
          {[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Text Formatting */}
      <div className="flex items-center space-x-1 border-r border-gray-300 pr-3">
        {[
          { icon: Bold, format: "bold" },
          { icon: Italic, format: "italic" },
          { icon: Underline, format: "underline" },
          { icon: Strikethrough, format: "strikethrough" },
        ].map(({ icon: Icon, format }) => (
          <button
            key={format}
            onClick={() => updateFormat({ [format]: !cellData?.format?.[format] })}
            className={`p-1 rounded hover:bg-gray-200 ${
              cellData?.format?.[format] ? "bg-gray-300" : ""
            }`}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>

      {/* Color & Background Color */}
      <div className="flex items-center space-x-1 border-r border-gray-300 pr-3">
        <div className="flex items-center space-x-1">
          <Palette size={16} />
          <input
            type="color"
            className="w-6 h-6 p-0 border-0"
            value={cellData?.format?.color || "#000000"}
            onChange={(e) => updateFormat({ color: e.target.value })}
          />
        </div>
        <div className="flex items-center space-x-1">
          <Palette size={16} className="text-gray-500" />
          <input
            type="color"
            className="w-6 h-6 p-0 border-0"
            value={cellData?.format?.backgroundColor || "#ffffff"}
            onChange={(e) => updateFormat({ backgroundColor: e.target.value })}
          />
        </div>
      </div>

      {/* Text Alignment */}
      <div className="flex items-center space-x-1 border-r border-gray-300 pr-3">
        {[
          { icon: AlignLeft, align: "left" },
          { icon: AlignCenter, align: "center" },
          { icon: AlignRight, align: "right" },
        ].map(({ icon: Icon, align }) => (
          <button
            key={align}
            onClick={() => updateFormat({ align })}
            className={`p-1 rounded hover:bg-gray-200 ${
              cellData?.format?.align === align ? "bg-gray-300" : ""
            }`}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>

      {/* Reset Formatting */}
      <button
        onClick={resetFormatting}
        className="p-1 rounded hover:bg-red-200 bg-red-100 text-red-600 flex items-center space-x-1 transition"
      >
        <Trash2 size={16} />
        <span className="text-xs font-medium">Reset</span>
      </button>
    </div>
  );
};

export default Toolbar;

