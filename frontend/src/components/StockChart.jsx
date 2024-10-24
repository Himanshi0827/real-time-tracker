// src/components/StockChart.jsx
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from 'recharts';
  
  function StockChart({ data }) {
    return (
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#2563eb"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default StockChart;