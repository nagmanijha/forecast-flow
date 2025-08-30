import React, { useState, useEffect } from 'react';
import { Zap, AlertTriangle } from 'lucide-react';
import Card from '../components/Card';
import KPI from '../components/KPI';

const RiskSimulator = ({ disruptionLevel }) => {
  const [results, setResults] = useState({ stockoutRate: 0, riskReduction: 0 });
  const baseStockoutRisk = 47;

  useEffect(() => {
    const simulationResults = runMonteCarloSimulation({ disruptionLevel });
    setResults(simulationResults);
  }, [disruptionLevel]);

  const optimizedRisk = (baseStockoutRisk - results.riskReduction).toFixed(1);

  return (
    <Card title="Digital Twin Risk Simulator" icon={<AlertTriangle className="text-amber-400" />}>
      <p className="text-sm text-slate-400 mb-4">
        Monte Carlo disruption modeling optimizes safety-stock levels against supply chain shocks.
      </p>
      <div className="space-y-6">
        <KPI value={`${results.riskReduction}%`} label="Stockout Risk Reduction" color="bg-amber-500/20" icon={<Zap size={20} className="text-amber-400" />} />
        <div className="w-full">
          <h4 className="font-semibold text-slate-200 mb-2">Safety Stock Optimization</h4>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{baseStockoutRisk}%</div>
              <div className="text-xs text-slate-400">Baseline Risk</div>
            </div>
            <div className="flex-grow h-4 bg-slate-700 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-sm z-10">
                  &rarr; {optimizedRisk}% Optimized Risk &rarr;
                </span>
              </div>
              <div
                className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-500"
                style={{ width: `${100 - optimizedRisk}%` }}
              ></div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{optimizedRisk}%</div>
              <div className="text-xs text-slate-400">Optimized Risk</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

function runMonteCarloSimulation({ disruptionLevel, baseDemand = 100, safetyStock = 120, iterations = 10000 }) {
  let stockouts = 0;

  for (let i = 0; i < iterations; i++) {
    const randomDemand = baseDemand * (1 + (Math.random() * 0.4 - 0.2));
    const disruptedDemand = randomDemand * (1 + disruptionLevel);
    if (disruptedDemand > safetyStock) stockouts++;
  }

  const stockoutRate = stockouts / iterations;
  const riskReduction = (1 - stockoutRate) * 100;
  return {
    stockoutRate: (stockoutRate * 100).toFixed(1),
    riskReduction: riskReduction.toFixed(1),
  };
}

export default RiskSimulator;
