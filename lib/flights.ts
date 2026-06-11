export const flightRoutes = [
  { code: 'IXJ', city: 'Jammu' },
  { code: 'DEL', city: 'Delhi' },
  { code: 'BOM', city: 'Mumbai' },
  { code: 'BLR', city: 'Bangalore' },
  { code: 'HYD', city: 'Hyderabad' },
  { code: 'IDR', city: 'Indore' },
  { code: 'LKO', city: 'Lucknow' },
  { code: 'PNQ', city: 'Pune' }
];

export interface FlightPrice {
  from: string;
  to: string;
  fromCode: string;
  toCode: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  currency: string;
}

const generatePriceRange = (from: string, to: string): { min: number; max: number; avg: number } => {
  // Simple hash-based price generation for consistency
  const route = `${from}-${to}`;
  let hash = 0;
  for (let i = 0; i < route.length; i++) {
    hash = ((hash << 5) - hash) + route.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  const normalized = Math.abs(hash) % 100;
  const basePrice = 3000 + normalized * 50;
  
  return {
    min: Math.round(basePrice),
    max: Math.round(basePrice + 2000 + normalized * 30),
    avg: Math.round(basePrice + 1000 + normalized * 15)
  };
};

export const getFlightPrices = (fromCode: string, toCode: string): FlightPrice => {
  const fromAirport = flightRoutes.find(r => r.code === fromCode);
  const toAirport = flightRoutes.find(r => r.code === toCode);
  
  if (!fromAirport || !toAirport) {
    throw new Error('Invalid airport codes');
  }
  
  const prices = generatePriceRange(fromCode, toCode);
  
  return {
    from: fromAirport.city,
    to: toAirport.city,
    fromCode,
    toCode,
    minPrice: prices.min,
    maxPrice: prices.max,
    avgPrice: prices.avg,
    currency: '₹'
  };
};

export const getTopRoutes = (): FlightPrice[] => {
  const routes = [
    { from: 'IXJ', to: 'DEL' },
    { from: 'DEL', to: 'BOM' },
    { from: 'IXJ', to: 'BLR' },
    { from: 'DEL', to: 'HYD' },
    { from: 'BOM', to: 'BLR' }
  ];
  
  return routes.map(r => getFlightPrices(r.from, r.to));
};
