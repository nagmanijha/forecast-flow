import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Target, BrainCircuit } from 'lucide-react';
import Card from '../components/Card';
import KPI from '../components/KPI';
import { generateForecastData } from '../data/forecastData';
import shapData from '../data/shapData';

const DemandForecasting = () => {
  const forecastData = useMemo(() => generateForecastData(), []);

  return (
    <Card title="Demand Forecasting" icon={<BrainCircuit className="text-cyan-400" />}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        <div className="lg:col-span-2 h-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  borderColor: '#475569',
                  borderRadius: '0.75rem',
                }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Legend wrapperStyle={{fontSize: "14px"}} />
              <Line type="monotone" dataKey="Historical Sales" stroke="#6366f1" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Forecast" stroke="#22d3ee" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h4 className="font-semibold text-slate-200 mb-2">Forecasting Models</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-cyan-900 text-cyan-300 px-2 py-1 rounded-full">Prophet</span>
              <span className="bg-teal-900 text-teal-300 px-2 py-1 rounded-full">XGBoost</span>
              <span className="bg-sky-900 text-sky-300 px-2 py-1 rounded-full">LSTM</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-200 mb-2">Model Performance</h4>
            <KPI value="< 8%" label="MAPE across 500+ SKUs" color="bg-green-500/20" icon={<Target size={20} className="text-green-400" />} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-200 mb-2">SHAP Interpretability</h4>
            <div className="text-slate-300 text-sm space-y-1">
              {shapData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span>{item.name}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${item.value * 100 / 0.5}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DemandForecasting;