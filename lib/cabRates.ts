export interface CabRate {
  airport: string;
  airportCode: string;
  destination: string;
  distance: string;
  estimatedTime: string;
  fare: number;
  currency: string;
}

export const cabRates: CabRate[] = [
  {
    airport: 'Jammu',
    airportCode: 'IXJ',
    destination: 'City Center',
    distance: '12 km',
    estimatedTime: '20-25 mins',
    fare: 450,
    currency: '₹'
  },
  {
    airport: 'Jammu',
    airportCode: 'IXJ',
    destination: 'Hotel Radisson',
    distance: '8 km',
    estimatedTime: '15-20 mins',
    fare: 350,
    currency: '₹'
  },
  {
    airport: 'Jammu',
    airportCode: 'IXJ',
    destination: 'Railway Station',
    distance: '10 km',
    estimatedTime: '18-22 mins',
    fare: 400,
    currency: '₹'
  },
  {
    airport: 'Delhi',
    airportCode: 'DEL',
    destination: 'Central Delhi',
    distance: '15 km',
    estimatedTime: '30-40 mins',
    fare: 600,
    currency: '₹'
  },
  {
    airport: 'Bangalore',
    airportCode: 'BLR',
    destination: 'City Center',
    distance: '40 km',
    estimatedTime: '60-75 mins',
    fare: 850,
    currency: '₹'
  }
];

export const getCabRatesByAirport = (airportCode: string): CabRate[] => {
  return cabRates.filter(r => r.airportCode === airportCode);
};

export const generateWhatsappMessage = (cabRate: CabRate, passengerName: string = 'Passenger'): string => {
  return `Hi, I want to book a cab from ${cabRate.airport} Airport to ${cabRate.destination}. Distance: ${cabRate.distance}, Estimated time: ${cabRate.estimatedTime}, Fare: ${cabRate.currency}${cabRate.fare}. Passenger name: ${passengerName}.`;
};
