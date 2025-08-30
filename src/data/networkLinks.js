const initialNetworkLinks = [
  { source: 'Supplier A', target: 'Factory' },
  { source: 'Supplier B', target: 'Factory' },
  { source: 'Factory', target: 'Port' },
  { source: 'Port', target: 'DC North' },
  { source: 'Port', target: 'DC South' },
  { source: 'DC North', target: 'Retail Hub 1' },
  { source: 'DC North', target: 'Retail Hub 2' },
  { source: 'DC South', target: 'Retail Hub 3' },
];

export default initialNetworkLinks;