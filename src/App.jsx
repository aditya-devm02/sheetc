import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Grid from './components/Grid/Grid';
import FormulaeBar from './components/FormulaeBar/FormulaeBar';
import Toolbar from './components/Toolbar/Toolbar';
import { PiMicrosoftExcelLogoThin } from 'react-icons/pi';
import FileMenu from './menuHandlers/FileMenu.jsx';
import EditMenu from './menuHandlers/EditMenu.jsx';
import ViewMenu from './menuHandlers/ViewMenu.jsx';
import InsertMenu from './menuHandlers/InsertMenu.jsx';
import FormatMenu from './menuHandlers/FormatMenu.jsx';
import ChartComponent from './components/DataVisualization/ChartComponents.jsx';
import { evaluateFormulae } from './utils/formulaeEvaluator.js';

const App = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [chartData, setChartData] = useState([
    { name: "Jan", value: 40 },
    { name: "Feb", value: 55 },
    { name: "Mar", value: 75 },
    { name: "Apr", value: 60 },
    { name: "May", value: 90 },
  ]);
  const [cells, setCells] = useState({});
  const [history, setHistory] = useState([]);

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const getCellValue = (cellRef) => {
    return cells[cellRef] || "";
  };

  const updateCells = (newCells) => {
    setHistory([...history, cells]); // Save state for Undo
    setCells(newCells);
  };

  // Undo functionality
  const handleUndo = () => {
    if (history.length > 0) {
      setCells(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  // Redo functionality (future implementation)
  const handleRedo = () => {
    console.log("Redo action triggered");
  };

  // Trim function - Removes extra spaces from all cells
  const handleTrim = () => {
    const trimmedCells = Object.fromEntries(
      Object.entries(cells).map(([key, value]) => [key, value.trim()])
    );
    updateCells(trimmedCells);
  };

  // Convert text to Uppercase
  const handleUppercase = () => {
    const upperCells = Object.fromEntries(
      Object.entries(cells).map(([key, value]) => [key, value.toUpperCase()])
    );
    updateCells(upperCells);
  };

  // Convert text to Lowercase
  const handleLowercase = () => {
    const lowerCells = Object.fromEntries(
      Object.entries(cells).map(([key, value]) => [key, value.toLowerCase()])
    );
    updateCells(lowerCells);
  };

  // Remove duplicate values from all cells
  const handleRemoveDuplicates = () => {
    const uniqueValues = [...new Set(Object.values(cells))];
    const uniqueCells = Object.fromEntries(
      Object.keys(cells).map((key, index) => [key, uniqueValues[index] || ""])
    );
    updateCells(uniqueCells);
  };

  // Find and Replace function
  const handleFindAndReplace = () => {
    const searchText = prompt("Enter text to find:");
    const replaceText = prompt("Enter replacement text:");

    if (searchText !== null && replaceText !== null) {
      const replacedCells = Object.fromEntries(
        Object.entries(cells).map(([key, value]) => [key, value.replace(new RegExp(searchText, "g"), replaceText)])
      );
      updateCells(replacedCells);
    }
  };

  return (
    <Provider store={store}>
      <div className="h-screen flex flex-col">
        <header className="flex items-center border-b border-gray-200 h-12 shrink-0">
          <div className='flex items-center px-4'>
            <PiMicrosoftExcelLogoThin size={40} />
            <h1 className="text-lg font-medium text-green-700">Sheets</h1>
          </div>
        </header>

        <div className="relative flex items-center border-b border-gray-200 h-8 px-2 bg-gray-50">
          <div className="flex space-x-4">
            <button onClick={() => handleMenuClick('File')} className="text-sm text-gray-600 hover:text-gray-900">File</button>
            <button onClick={() => handleMenuClick('Edit')} className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
            <button onClick={() => handleMenuClick('View')} className="text-sm text-gray-600 hover:text-gray-900">View</button>
            <button onClick={() => handleMenuClick('Insert')} className="text-sm text-gray-600 hover:text-gray-900">Insert</button>
            <button onClick={() => handleMenuClick('Format')} className="text-sm text-gray-600 hover:text-gray-900">Format</button>
          </div>
        </div>

        {activeMenu === 'File' && <FileMenu />}
        {activeMenu === 'Edit' && (<EditMenu
    key="edit-menu"
    onUndo={handleUndo}
    onRedo={handleRedo}
    onTrim={handleTrim}
    onUpper={handleUppercase}
    onLower={handleLowercase}
    onRemoveDuplicates={handleRemoveDuplicates}
    onFindAndReplace={handleFindAndReplace}
  />
)}

        {activeMenu === 'View' && <ViewMenu />}
        {activeMenu === 'Insert' && <InsertMenu />}
        {activeMenu === 'Format' && <FormatMenu />}

        <Toolbar />
        <FormulaeBar />

        <main className="flex-1 overflow-hidden bg-gray-50">
          <Grid />
          <div className="spreadsheet">
            <table>
              <tbody>
                {["A", "B", "C"].map((col) => (
                  <tr key={col}>
                    {[1, 2, 3].map((row) => {
                      const cellRef = `${col}${row}`;
                      return (
                        <td key={cellRef}>
                          <input
                            type="text"
                            value={cells[cellRef] || ""}
                            onChange={(e) => updateCells({ ...cells, [cellRef]: e.target.value })}
                            onBlur={() => updateCells({ ...cells, [cellRef]: evaluateFormulae(cells[cellRef], getCellValue) })}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <div className="p-4 bg-white border-t flex items-center space-x-4">
  <button
    className="px-4 py-2 bg-green-200 text-green-800 rounded-md hover:bg-green-300 transition"
    onClick={() => setShowChart(!showChart)}
  >
    {showChart ? "Hide Chart" : "Show Chart"}
  </button>
</div>

        {showChart && (
          <div className="p-4 bg-gray-100">
            <div className="mb-4 flex items-center space-x-4">
              <span className="text-sm font-semibold">Select Chart Type:</span>
              <select
                className="p-2 border border-gray-300 rounded-md"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              >
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="area">Area Chart</option>
              </select>
            </div>
            <ChartComponent type={chartType} data={chartData} width={600} height={400} />
          </div>
        )}
      </div>
    </Provider>
  );
};

export default App;
