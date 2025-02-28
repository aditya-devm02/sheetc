import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRow, deleteColumn, deleteRow, addColumn } from '../../store/slices/spreadSheetSlice';

const DimensionControls = () => {
  const dispatch = useDispatch();
  const { columnCount, rowCount } = useSelector((state) => state.spreadSheet);

  const [addRowCount, setAddRowCount] = useState(1);
  const [addColumnCount, setAddColumnCount] = useState(1);
  const [lastDeleted, setLastDeleted] = useState(null);

  // Delete Row
  const handleDeleteRow = () => {
    if (rowCount > 1) {
      setLastDeleted({ type: "row", index: rowCount - 1 });
      dispatch(deleteRow({ index: rowCount - 1 }));
    }
  };

  // Delete Column
  const handleDeleteColumn = () => {
    if (columnCount > 1) {
      setLastDeleted({ type: "column", index: columnCount - 1 });
      dispatch(deleteColumn({ index: columnCount - 1 }));
    }
  };

  // Undo Last Delete
  const handleUndo = () => {
    if (lastDeleted) {
      if (lastDeleted.type === "row") {
        dispatch(addRow({ index: lastDeleted.index }));
      } else {
        dispatch(addColumn({ index: lastDeleted.index }));
      }
      setLastDeleted(null);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 border-b bg-[#f8f9fa]">
      {/* Row & Column Count */}
      <div className="text-sm text-gray-700 flex items-center space-x-3">
        <span>Rows: <strong>{rowCount}</strong></span>
        <span>Columns: <strong>{columnCount}</strong></span>
      </div>

      {/* Add Rows & Columns */}
      <div className="flex items-center space-x-2">
        <input 
          type="number" 
          value={addRowCount} 
          onChange={(e) => setAddRowCount(e.target.value)}
          className="w-14 text-center px-2 py-1 border border-gray-300 rounded-sm text-sm"
        />
        <button 
          onClick={() => dispatch(addRow({ index: rowCount }))}
          className="px-3 py-1 text-sm border border-gray-300 bg-white hover:bg-gray-200 rounded-sm"
        >
          + Add Rows
        </button>

        <input 
          type="number" 
          value={addColumnCount} 
          onChange={(e) => setAddColumnCount(e.target.value)}
          className="w-14 text-center px-2 py-1 border border-gray-300 rounded-sm text-sm"
        />
        <button 
          onClick={() => dispatch(addColumn({ index: columnCount }))}
          className="px-3 py-1 text-sm border border-gray-300 bg-white hover:bg-gray-200 rounded-sm"
        >
          + Add Columns
        </button>
      </div>

      {/* Delete & Undo Controls */}
      <div className="flex space-x-2">
        <button 
          onClick={handleDeleteRow}
          disabled={rowCount <= 1}
          className="px-3 py-1 text-sm border border-gray-300 bg-white hover:bg-gray-200 rounded-sm disabled:opacity-50"
        >
          - Delete Row
        </button>

        <button 
          onClick={handleDeleteColumn}
          disabled={columnCount <= 1}
          className="px-3 py-1 text-sm border border-gray-300 bg-white hover:bg-gray-200 rounded-sm disabled:opacity-50"
        >
          - Delete Column
        </button>

        {lastDeleted && (
          <button 
            onClick={handleUndo}
            className="px-3 py-1 text-sm border border-gray-300 bg-white hover:bg-gray-200 rounded-sm"
          >
            ⏪ Undo
          </button>
        )}
      </div>
    </div>
  );
};

export default DimensionControls;
