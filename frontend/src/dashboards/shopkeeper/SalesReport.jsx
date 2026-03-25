import { useState } from "react";
import { getSalesReport } from "../../services/sales";

export default function SalesReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [report, setReport] = useState([]);

  const fetchReport = async () => {
    const data = await getSalesReport(startDate, endDate);
    setReport(data);
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <h2 className="text-lg font-semibold">Sales Report</h2>

      <div className="mt-4 flex gap-3">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          onClick={fetchReport}
          className="bg-emerald-600 text-white px-4 rounded"
        >
          Generate
        </button>
      </div>

      <table className="mt-6 w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left">Product</th>
            <th className="text-right">Sold</th>
          </tr>
        </thead>
        <tbody>
          {report.map((r, i) => (
            <tr key={i} className="border-b">
              <td>{r.product_name}</td>
              <td className="text-right">{r.total_sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
