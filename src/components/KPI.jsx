import React from 'react';

const KPI = ({ value, label, color, icon }) => (
  <div className="flex items-center">
    <div className={`p-2 rounded-full mr-3 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-50">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  </div>
);

export default KPI;