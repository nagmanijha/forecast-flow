import React from 'react';

const Card = ({ title, icon, children, className = '' }) => (
  <div className={`bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-lg p-6 flex flex-col ${className}`}>
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-slate-100 ml-3">{title}</h3>
    </div>
    <div className="flex-grow">
      {children}
    </div>
  </div>
);

export default Card;