import React, { useState, useRef } from "react";
import ExcelJS from "exceljs";
import productTamplates from "./utils/productTamplates";

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    productName: "",
    unitNo: "",
    amp: "",
  });

  const unitNoRef = useRef(null);
  const ampRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefaults()
    if (formData.date && formData.productName && formData.unitNo && formData.amp) {
      setProducts([...products, formData]);
      setFormData({
        ...formData,
        unitNo: "",
        amp: "",
      });
      unitNoRef.current.focus();
    }
  };

  const handleRemoveProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const getAmpOptions = () => {
    if (formData.productName && productTamplates[formData.productName]) {
      return productTamplates[formData.productName].AMP;
    }
    return [];
  };

  // Handle Excel export
  const handleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Products");

    // Add header
    worksheet.addRow(["Unit No", "AMP", "Date", "Product Name"]);

    // Add product rows
    products.forEach((product) => {
      worksheet.addRow([product.unitNo, product.amp, product.date, product.productName]);
    });

    // Set column widths
    worksheet.columns = [
      { width: 15 },
      { width: 15 },
      { width: 15 },
      { width: 25 },
    ];

    // Write to Excel buffer and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "products.xlsx";
    link.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-2xl">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <select
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a product</option>
              {Object.keys(productTamplates).map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Unit No</label>
            <input
              type="text"
              name="unitNo"
              value={formData.unitNo}
              ref={unitNoRef}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">AMP</label>
            <select
              name="amp"
              value={formData.amp}
              ref={ampRef}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select AMP</option>
              {getAmpOptions().map((amp, index) => (
                <option key={index} value={amp}>
                  {amp}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleAddProduct}
            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </form>

        <table className="min-w-full mt-5 bg-white border border-gray-200 rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Unit No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">AMP</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{product.unitNo}</td>
                <td className="px-4 py-2">{product.amp}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleRemoveProduct(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Export to Excel Button */}
        <button
          onClick={handleExportToExcel}
          className="mt-4 w-full py-3 px-4 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Export to Excel
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
