import React, { useState } from 'react';
import DemandForecasting from './features/DemandForecasting';
import RiskSimulator from './features/RiskSimulator';
import NetworkOptimizer from './features/NetworkOptimizer';
import LiveDashboard from './features/LiveDashboard';

export default function App() {
  const [disruptionLevel, setDisruptionLevel] = useState(0.2);
  const [scenario, setScenario] = useState('cost');

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div 
        className="absolute inset-0 z-0 opacity-10" 
        style={{
          backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>
      <div className="relative z-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 text-transparent bg-clip-text">
            ForecastFlow
          </h1>
          <p className="text-slate-400 mt-2 text-lg">The Intelligent Supply Chain Optimization Platform</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <DemandForecasting />
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <RiskSimulator disruptionLevel={disruptionLevel} />
            <LiveDashboard 
              disruptionLevel={disruptionLevel} 
              setDisruptionLevel={setDisruptionLevel}
              scenario={scenario}
              setScenario={setScenario}
            />
          </div>

          <div className="lg:col-span-1">
            <NetworkOptimizer scenario={scenario} />
          </div>
        </main>

        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>ForecastFlow &copy; 2024. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}