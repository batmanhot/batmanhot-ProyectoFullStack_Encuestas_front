// components/ResultadosGrafico.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const COLORS = [
  '#D32F2F', // peruRed
  '#1565C0', // peruBlue
  '#2E7D32', // success
  '#ED6C02', // warning
  '#1E1E2F', // darkBg
];

export default function ResultadosGrafico({ data, xKey = "name", yKey = "value", color = "#1565C0" }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-peruGray dark:bg-darkCard rounded-lg">
        <p className="text-gray-500 dark:text-gray-400 text-lg">📊 No hay datos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="w-full h-auto bg-peruGray dark:bg-darkCard rounded-lg p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey={xKey}
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fill: '#666', fontSize: 12 }}
            interval={0}
          />
          <YAxis
            tick={{ fill: '#666', fontSize: 12 }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: `2px solid ${color}`,
              borderRadius: '8px',
              padding: '12px'
            }}
            formatter={(value) => [`${value}`, 'Cantidad']}
          />
          <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color} opacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
