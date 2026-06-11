'use client';

import { useState, useEffect } from 'react';
import { getAirports } from './api';

export interface Airport {
  icao: string;
  iata: string;
  name: string;
  city: string;
  country: string;
}

// Global cache to avoid re-fetching across components
let cachedAirports: Airport[] | null = null;

export function useAirports() {
  const [airports, setAirports] = useState<Airport[]>(cachedAirports || []);
  const [loading, setLoading] = useState(!cachedAirports);

  useEffect(() => {
    if (cachedAirports) return;

    async function loadAirports() {
      const data = await getAirports();
      if (data) {
        // Convert object to array and filter out small airports without IATA codes
        const airportArray = Object.values(data) as Airport[];
        const validAirports = airportArray.filter(a => a.iata && a.iata !== '' && a.iata !== '\\N');
        cachedAirports = validAirports;
        setAirports(validAirports);
      }
      setLoading(false);
    }

    loadAirports();
  }, []);

  const searchAirports = (query: string) => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return airports
      .filter(
        a =>
          a.city?.toLowerCase().includes(lowerQuery) ||
          a.name?.toLowerCase().includes(lowerQuery) ||
          a.iata?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 10); // Return top 10 matches
  };

  return { airports, loading, searchAirports };
}
