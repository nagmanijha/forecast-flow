import React, { useMemo } from 'react';
import { Leaf, DollarSign, Network } from 'lucide-react';
import Card from '../components/Card';
import KPI from '../components/KPI';
import initialNetworkNodes from '../data/networkNodes';
import initialNetworkLinks from '../data/networkLinks';

const NetworkOptimizer = ({ scenario }) => {
  const costReduction = scenario === 'eco' ? 18 : 22;
  const co2Reduction = scenario === 'eco' ? 35 : 15;
  const nodeMap = useMemo(() => new Map(initialNetworkNodes.map(n => [n.id, n])), []);

  const nodeColors = {
    supplier: 'fill-blue-500',
    factory: 'fill-purple-500',
    port: 'fill-sky-500',
    dc: 'fill-indigo-500',
    retail: 'fill-fuchsia-500',
  };
  
  const nodeIcons = {
    supplier: '📦',
    factory: '🏭',
    port: '⚓',
    dc: '🏢',
    retail: '🏬',
  };

  return (
    <Card title="Graph-Based Network Optimizer" icon={<Network className="text-violet-400" />} className="row-span-2">
      <div className="flex flex-col h-full">
        <p className="text-sm text-slate-400 mb-4">3D scenario planning and CO₂ emissions tracking to balance cost and sustainability.</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <KPI value={`${costReduction}%`} label="Annual Logistics Spend Cut" color="bg-green-500/20" icon={<DollarSign size={20} className="text-green-400" />} />
          <KPI value={`${co2Reduction}%`} label="CO₂ Emissions Reduction" color="bg-emerald-500/20" icon={<Leaf size={20} className="text-emerald-400" />} />
        </div>
        <div className="flex-grow bg-slate-900/50 rounded-lg p-2 border border-slate-700 relative min-h-[300px]">
          <svg viewBox="0 0 700 300" width="100%" height="100%">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
              </marker>
            </defs>
            {initialNetworkLinks.map((link, i) => {
              const sourceNode = nodeMap.get(link.source);
              const targetNode = nodeMap.get(link.target);
              if (!sourceNode || !targetNode) return null;
              const isEcoRoute = scenario === 'eco' && (link.source === 'Supplier B' || link.target === 'DC South');
              return (
                <line
                  key={i}
                  x1={sourceNode.x} y1={sourceNode.y}
                  x2={targetNode.x} y2={targetNode.y}
                  stroke={isEcoRoute ? "#34d399" : "#64748b"}
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                  className="transition-all duration-500"
                />
              );
            })}
            {initialNetworkNodes.map(node => (
              <g key={node.id} transform={`translate(${node.x},${node.y})`}>
                <circle r="15" className={`${nodeColors[node.type]} stroke-2 stroke-slate-900`} />
                <text textAnchor="middle" y="5" fill="white" fontSize="14">{nodeIcons[node.type]}</text>
                <text textAnchor="middle" y="30" fill="#cbd5e1" fontSize="12" className="font-semibold">{node.id}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default NetworkOptimizer;