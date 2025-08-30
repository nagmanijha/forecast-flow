import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import Card from '../components/Card';
import KPI from '../components/KPI';

const LiveDashboard = ({ disruptionLevel, setDisruptionLevel, scenario, setScenario }) => {
  const sankeyData = {
    nodes: [
      { name: 'Suppliers' }, { name: 'Manufacturing' }, { name: 'Distribution' }, { name: 'Retail' }
    ],
    links: [
      { source: 0, target: 1, value: 100 - disruptionLevel * 40 },
      { source: 1, target: 2, value: 95 - disruptionLevel * 30 },
      { source: 2, target: 3, value: 90 - disruptionLevel * 20 },
    ]
  };

  return (
    <Card title="Live What-If Analysis" icon={<SlidersHorizontal className="text-rose-400" />}>
      <div className="flex flex-col h-full">
        <p className="text-sm text-slate-400 mb-4">On-demand controls to visualize the impact of disruptions and optimization scenarios.</p>
        
        <div className="flex-grow bg-slate-900/50 rounded-lg p-4 border border-slate-700 mb-4 min-h-[150px]">
          <h4 className="font-semibold text-slate-200 mb-2 text-center">Simulated Product Flow</h4>
          <div className="flex justify-between items-center h-full px-4">
            {sankeyData.nodes.map((node, i) => (
              <React.Fragment key={node.name}>
                <div className="text-center">
                  <div className="bg-slate-700 px-3 py-2 rounded-lg">{node.name}</div>
                </div>
                {i < sankeyData.links.length && (
                  <div className="flex-grow mx-2 h-1 bg-slate-600 relative">
                    <div className="bg-rose-400 h-1 absolute top-0 transition-all duration-300" style={{width: `${sankeyData.links[i].value}%`}}></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="disruption-slider" className="block text-sm font-medium text-slate-300 mb-1">Supplier Disruption Level: {Math.round(disruptionLevel * 100)}%</label>
            <input
              id="disruption-slider"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={disruptionLevel}
              onChange={(e) => setDisruptionLevel(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-slate-300 mb-2">Optimization Scenario</span>
            <div className="flex space-x-2">
              <button onClick={() => setScenario('cost')} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${scenario === 'cost' ? 'bg-violet-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}>
                Cost Optimized
              </button>
              <button onClick={() => setScenario('eco')} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${scenario === 'eco' ? 'bg-emerald-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}>
                Eco-Friendly
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveDashboard;