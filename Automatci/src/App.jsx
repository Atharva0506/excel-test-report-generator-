import React, { useState, useRef } from "react";
import ExcelJS from "exceljs";
import productTemplates from "./utils/productTamplates";

const ExcelReportGenerator = () => {
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [formData, setFormData] = useState({
    fromUnit: "",
    toUnit: "",
    date: getTodayDate(),
    product: "LED LIGHT : 1 W, 12 V",
  });

  const formRef = useRef(null);
  const productMap = {
    "LED LIGHT : 1W, 12V": "M1A",
    "LED LIGHT : 1W, 24V": "M2A",
    "LED TUBE : 2W, 12V": "M1B 15 Diss",
    "LED TUBE : 2W, 12V (16V DISCONECT) (006037271H91)": "M1B 16 Diss",
    "LED TUBE : 2W, 24V": "M2B",
    "LED TUBE : 2W, 12V KOEL(K1B) (D8.079.48.0.PR)": "K1B",
    "LED TUBE : 2W, 24V KOEL(K2B) (D8.079.49.0.PR)": "K2B",
  };

  // Helper function to apply borders to a cell
  const applyBorders = (cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fromUnit, toUnit, date, product } = formData;
    const from = parseInt(fromUnit, 10);
    const to = parseInt(toUnit, 10);

    if (isNaN(from) || isNaN(to) || !date || !product) {
      alert("Please fill out all fields!");
      return;
    }

    const units = Array.from({ length: to - from + 1 }, (_, i) => from + i);

    // Shuffle units
    for (let i = units.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [units[i], units[j]] = [units[j], units[i]];
    }

    const template = productTemplates[product];
    const data = template.data(units);

    const workbook = new ExcelJS.Workbook();
    let worksheet;

    const sheetCount = Math.ceil((to - from + 1) / 50);
    for (let sheetIndex = 0; sheetIndex < sheetCount; sheetIndex++) {
      const start = sheetIndex * 50;
      const end = Math.min((sheetIndex + 1) * 50, units.length);

      worksheet = workbook.addWorksheet(`Sheet_${sheetIndex + 1}`);
      worksheet.properties.defaultFont = { name: "Arial", size: 12 };

      worksheet.mergeCells("A1:B1");
      worksheet.getCell("A1").value = `Date: ${template['date']}`;
      worksheet.getCell("A1").alignment = { horizontal: "center" };

      worksheet.mergeCells("E1:F1");
      worksheet.getCell("E1").value = `DOC No.: SAM/QA/${template['DOC NO']}`;
      worksheet.getCell("E1").alignment = { horizontal: "center" };

      worksheet.mergeCells("A2:F2");
      worksheet.getCell("A2").value = "SAM INTEGRATIONS PVT.LTD.";
      worksheet.getCell("A2").alignment = { horizontal: "center" };
      worksheet.getCell("A2").font = { bold: true, size: 16 };

      worksheet.mergeCells("A3:C3");
      worksheet.getCell("A3").value = `TEST REPORT: PRODUCTION`;
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const fullDate = `${dd}/${mm}/${yyyy}`;
      worksheet.getCell("F4").value = `DATE:${fullDate}`;
      worksheet.mergeCells("A4:C4");
      worksheet.getCell("A4").value = `PRODUCT: ${product}`;

      worksheet.addRow([]); // Empty row

      worksheet.mergeCells("A5:F5");
      worksheet.getCell("A5").value =
        "CURRENT CONSUMPTION, OVER VOLTAGE PROTECTION LEVELS, POWER CONSUMPTION AND ON/OFF REPORT";
      worksheet.addRow(template.header);

      const headerRow = worksheet.getRow(6);
      headerRow.eachCell((cell) => {
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.font = { bold: true };
        applyBorders(cell);
      });

      const rowsToAdd = data.slice(start, end);
      rowsToAdd.forEach((row) => {
        const addedRow = worksheet.addRow(row);
        addedRow.eachCell((cell) => {
          applyBorders(cell);
          cell.alignment = {
            vertical: "middle",
            horizontal: "center",
            wrapText: true,
          };
        });
      });

      const checkedByRow = worksheet.addRow(["CHECKED BY:", "", "", "APPROVED BY:"]);

      // Merge cells for "CHECKED BY" and "APPROVED BY"
      worksheet.mergeCells(`A${rowsToAdd.length + 10}:C${rowsToAdd.length + 10}`);
      worksheet.mergeCells(`D${rowsToAdd.length + 10}:F${rowsToAdd.length + 10}`);

      worksheet.getCell(`A${rowsToAdd.length + 10}`).alignment = { horizontal: "left", vertical: "middle" };
      worksheet.getCell(`D${rowsToAdd.length + 10}`).alignment = { horizontal: "right", vertical: "middle" };

      // Apply borders
      applyBorders(worksheet.getCell(`A${rowsToAdd.length + 10}`));
      applyBorders(worksheet.getCell(`D${rowsToAdd.length + 10}`));
      // Set column widths
      worksheet.columns = template.columns;

      // Apply borders and alignment across the sheet
      worksheet.eachRow((row) => {
        row.eachCell((cell) => {
          applyBorders(cell);
          cell.alignment = {
            vertical: "middle",
            horizontal: "center",
            wrapText: true,
          };
        });
      });
    }

    const shortForm = productMap[formData.product];

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${shortForm} - ${date}.xlsx`;
      link.click();
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const form = formRef.current;
      const index = Array.from(form.elements).indexOf(e.target);
      form.elements[index + 1]?.focus();
      e.preventDefault();
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Test Report Excel Generator</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-700">
              From Unit No:
            </label>
            <input
              type="number"
              id="fromUnit"
              value={formData.fromUnit}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="toUnit" className="block text-sm font-medium text-gray-700">
              To Unit No:
            </label>
            <input
              type="number"
              id="toUnit"
              value={formData.toUnit}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Test Date:
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700">
              Product Type:
            </label>
            <select
              id="product"
              value={formData.product}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select Value</option>
              {Object.keys(productMap).map((key) => (
                <option key={key} value={key}>
                  {productMap[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md font-medium focus:outline-none hover:bg-blue-700"
            >
              Generate Excel Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExcelReportGenerator;
