# 📊 React Spreadsheet Application

🚀 A powerful, responsive, and feature-rich web-based spreadsheet application built with **React** and **Redux**! Whether you're crunching numbers, analyzing data, or creating charts, this spreadsheet has everything you need.

---

## 📥 Getting Started

Clone the repository or download the folder, then follow these steps:

```bash
cd your-folder-name
pnpm install
pnpm run dev
```

Now, you're all set! 🚀

---

## ✨ Features

### 🏗️ Core Spreadsheet Functionality
✅ **Dynamic Grid:** Resizable rows and columns with smooth scrolling.  
✅ **Cell Operations:**
- Basic data entry & editing
- Formula support with real-time evaluation
- Cell referencing (e.g., `=A1+B1`)
- Drag to select cell ranges
- Double-click or press **F2** to edit

✅ **Dimension Controls:**
- Add/remove rows & columns dynamically
- Resize rows & columns with drag handles
- Customizable column widths & row heights

✅ **Cell Formatting:**
- Bold, Italic, Underline
- Font customization: Size, Family, Color
- Text alignment & background color
- Number formatting

📸 ![Alt text](https://github.com/aditya-devm02/sheetc/blob/main/assets/Screenshot%202025-02-28%20at%2011.18.39%E2%80%AFPM.png)


---

### 🧮 Formula Powerhouse 💡

🧠 The app supports **10+ complex mathematical functions** via a custom **Formula Engine**:

- `=SUM(A1:A5)` ➝ Calculates sum
- `=AVERAGE(A1:A5)` ➝ Computes average
- `=MAX(A1:A5)` / `=MIN(A1:A5)` ➝ Finds max/min
- `=COUNT(A1:A5)` ➝ Counts non-empty cells
- `=MEDIAN(A1:A5)`, `=STDDEV(A1:A5)`, `=VARIANCE(A1:A5)`
- `=PRODUCT(A1:A5)` ➝ Multiplies values
- `=MODE(A1:A5)`, `=RANGE(A1:A5)` ➝ Finds mode & range

📸 ![Alt text](https://github.com/aditya-devm02/sheetc/blob/main/assets/Screenshot%202025-02-28%20at%2011.19.16%E2%80%AFPM.png)

---

### 🛡️ Data Quality Functions

Keep your data clean and efficient! 🧹
- `=TRIM(A1)` ➝ Removes extra spaces
- `=UPPER(A1)` / `=LOWER(A1)` ➝ Converts text case
- `=REMOVE_DUPLICATES(A1:A10)` ➝ Removes duplicates
- `=FIND_AND_REPLACE(A1, "old", "new")` ➝ Text replacement

📸 ![Alt text](https://github.com/aditya-devm02/sheetc/blob/main/assets/Screenshot%202025-02-28%20at%2011.24.56%E2%80%AFPM.png)


---

### 📊 Data Visualization 🎨

Bring your data to life with charts! 📈
- `=BARCHART(A1:A10)` ➝ Bar chart
- `=PIECHART(A1:A10)` ➝ Pie chart
- `=LINECHART(A1:A10)` ➝ Line chart
- `=AREACHART(A1:A10)` ➝ Area chart



---

## 🔧 Technology Stack 🏗️

- **Frontend:** React.js, Redux Toolkit, Tailwind CSS, JavaScript
- **Libraries:**
  - `react-window` ➝ Virtualized grid rendering
  - `recharts` ➝ Data visualization
  - `react-icons` ➝ Web App icons



---

## 📐 Architecture Overview

### **State Management (Redux Store)**
- **Cell Data & Formatting**
- **Grid Dimensions**
- **Selection & Active Cell State**
- **Error Handling**

### **Components Structure**
- **App.jsx** ➝ Main component with toolbar, formula bar, grid, controls
- **Grid.jsx** ➝ Renders cells & charts
- **Cell.jsx** ➝ Handles cell input, formulas
- **FormulaBar.jsx** ➝ Displays and edits formulas
- **Toolbar.jsx** ➝ Formatting tools
- **ChartComponent.jsx** ➝ Renders visualizations
- **ResizeHandle.jsx** ➝ Controls column & row resizing



---

## 🎯 How to Use 🏹

🔹 **Editing Cells:**
- Double-click or press **F2** to edit
- Press **Enter** to save

🔹 **Entering Formulas:**
- Start with `=` (e.g., `=SUM(A1:A5)`)
- Use cell references (e.g., `=A1+B1`)

🔹 **Formatting Data:**
- Select cell(s) and use the toolbar for styling

🔹 **Creating Charts:**
- Type `=BARCHART(A1:A5)` and see the magic! ✨



---

## ⚠️ Important Notes 📝

🚀 **Formula Dependencies:**
- Cells update automatically when referenced cells change
- ❌ Circular references are not supported

⚡ **Performance Optimized:**
- Uses **grid virtualization** for handling large datasets
- Complex formulas may slow performance slightly

💾 **Data Persistence:**
- Currently operates **in-memory**
- Implement **your own persistence layer** if needed



---

## 💡 Tips & Best Practices 🏆

✅ Use **cell references** instead of hardcoded values
✅ Leverage **range operations** for bulk calculations
✅ Pick **appropriate chart types** for different data sets
✅ Regularly **check for formula errors**
✅ Use **data quality functions** to clean messy data



---

## 🎁 Bonus Features 🎉

✔️ Advanced **mathematical & data quality functions**  
✔️ Support for **complex formulas & cell dependencies**  
✔️ Integrated **data visualization capabilities**  



---

## 🤝 Contribute & Improve

Want to enhance the spreadsheet? Fork the repo, implement your feature, and submit a pull request! 🚀



---

💻 Built with ❤️ using React & Redux. Happy Spreadsheet-ing! 📊✨
