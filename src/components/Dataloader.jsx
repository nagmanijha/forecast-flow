import React from 'react';
import { Loader2 } from 'lucide-react';

const DataLoader = () => (
  <div className="fixed inset-0 bg-slate-900/90 flex items-center justify-center z-50">
    <div className="text-center">
      <Loader2 className="w-16 h-16 text-cyan-400 animate-spin mx-auto" />
      <p className="mt-4 text-lg text-slate-300">Loading real supply chain data...</p>
      <p className="text-sm text-slate-500 mt-2">
        Connecting to DTDC logistics API and public data sources
      </p>
    </div>
  </div>
);

export default DataLoader;