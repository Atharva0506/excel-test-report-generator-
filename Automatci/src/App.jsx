import React, { useState, useRef } from "react";
import ExcelJS from "exceljs";

const ExcelReportGenerator = () => {
  const [formData, setFormData] = useState({
    fromUnit: "",
    toUnit: "",
    date: "",
    product: "LED LIGHT : 1 W, 12 V", 
  });

  const formRef = useRef(null);

  const productTemplates = {
    "LED LIGHT : 1 W, 12 V": {
      header: ["SR. NO", "UNIT NO", "CURRENT CONSUMPTION", "OVP DISCONNECT", "OVP RECONNECT", "OVP SUSTAINING"],
      columns: [
        { width: 10 }, { width: 10 }, { width: 25 }, { width: 25 }, { width: 25 }, { width: 25 },
      ],
      data: (units) => {
        return units.map((unit, index) => {
          const amp = (Math.random() * (0.08 - 0.06) + 0.06).toFixed(2);
          return [
            index + 1,
            unit,
            amp,
            "✔",
            "✔",
            "✔",
          ];
        });
      },
    },
    "Solar Panel": {
      header: ["SR. NO", "UNIT NO", "VOLTAGE", "CURRENT", "EFFICIENCY", "ENERGY PRODUCTION"],
      columns: [
        { width: 10 }, { width: 10 }, { width: 25 }, { width: 25 }, { width: 25 }, { width: 25 },
      ],
      data: (units) => {
        return units.map((unit, index) => {
          const voltage = (Math.random() * (22 - 18) + 18).toFixed(2);
          const current = (Math.random() * (5 - 3) + 3).toFixed(2);
          const efficiency = (Math.random() * (95 - 80) + 80).toFixed(2);
          return [
            index + 1,
            unit,
            voltage,
            current,
            efficiency,
            "High", // Just an example
          ];
        });
      },
    },
    // Add more products and their templates here as needed
  };

  // Handle form input changes
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

    // Generate unit numbers
    const units = Array.from({ length: to - from + 1 }, (_, i) => from + i);

    // Shuffle the unit numbers (optional)
    for (let i = units.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [units[i], units[j]] = [units[j], units[i]];
    }

    const template = productTemplates[product];
    const data = template.data(units);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Test Report");

    // Set Arial font for the entire worksheet
    worksheet.properties.defaultFont = { name: "Arial", size: 12 };

    // Header Section
    worksheet.mergeCells("A1:B1");
    worksheet.getCell("A1").value = `Date: ${date}`;
    worksheet.getCell("A1").alignment = { horizontal: "center" };

    worksheet.mergeCells("E1:F1");
    worksheet.getCell("E1").value = "DOC No.: SAM/QA/80 R2";
    worksheet.getCell("E1").alignment = { horizontal: "center" };

    worksheet.mergeCells("A2:F2");
    worksheet.getCell("A2").value = "SAM INTEGRATIONS PVT.LTD.";
    worksheet.getCell("A2").alignment = { horizontal: "center" };
    worksheet.getCell("A2").font = { bold: true, size: 16 };

    worksheet.mergeCells("A3:C3");
    worksheet.getCell("A3").value = `TEST REPORT: PRODUCTION`;

    worksheet.mergeCells("A4:C4");
    worksheet.getCell("A4").value = `PRODUCT: ${product}`;

    worksheet.addRow([]); // Empty row

    worksheet.mergeCells("A5:F5");
    worksheet.getCell("A5").value =
      "CURRENT CONSUMPTION, OVER VOLTAGE PROTECTION LEVELS, POWER CONSUMPTION AND ON/OFF REPORT";

    worksheet.addRow([]); // Empty row

    // Add Table Header
    worksheet.addRow(template.header);

    // Apply styling for the header row
    const headerRow = worksheet.getRow(6); // The header is in row 6 after adding
    headerRow.eachCell((cell) => {
      cell.alignment = { horizontal: "center", vertical: "middle" }; // Center-align text
      cell.font = { bold: true }; // Make text bold
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFCCCCCC" }, // Light gray
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Add Data Rows
    data.forEach((row) => {
      worksheet.addRow(row);
    });

    // Footer Section (CHECKED BY, APPROVED BY and NAME in the correct order)
    worksheet.mergeCells(`A${data.length + 10}:C${data.length + 10}`);
    worksheet.getCell(`A${data.length + 10}`).value = "CHECKED BY:";
    worksheet.getCell(`A${data.length + 10}`).alignment = {
      horizontal: "center",
    };

    worksheet.mergeCells(`D${data.length + 10}:F${data.length + 10}`);
    worksheet.getCell(`D${data.length + 10}`).value = "APPROVED BY:";
    worksheet.getCell(`D${data.length + 10}`).alignment = {
      horizontal: "center",
    };

    worksheet.mergeCells(`A${data.length + 11}:C${data.length + 11}`);
    worksheet.getCell(`A${data.length + 11}`).value = "NAME:";
    worksheet.getCell(`A${data.length + 11}`).alignment = {
      horizontal: "center",
    };

    // Set Column Widths based on the product format
    worksheet.columns = template.columns;

    // Apply Border Styles with padding
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      
      // Create an anchor tag and trigger the download/print action
      const link = document.createElement('a');
      link.href = url;
      link.download = `Test_Report_${date}.xlsx`;  // File name
      link.click();
      
      // Optionally open the file in a new tab for printing
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
          newWindow.focus();
      }
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
              <option value="LED LIGHT : 1 W, 12 V">LED LIGHT : 1 W, 12 V</option>
              <option value="Solar Panel">Solar Panel</option>
              {/* Add more product options here */}
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
