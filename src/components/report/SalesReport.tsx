import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { salesData } from "../../data/Sales";
import { ArrowLeft } from "lucide-react";

type Props = {
  onBack: () => void;
};

function SalesReport({ onBack }: Props) {
  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Monthly Sales Report</h2>
        <button onClick={onBack}>
            <ArrowLeft size={10} />Back</button>
      </div>
<br />
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis dataKey="sales"/>
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#4f46e5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesReport;
