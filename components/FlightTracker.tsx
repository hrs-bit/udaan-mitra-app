'use client';

import { useState, useEffect } from 'react';
import { PlaneTakeoff, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLiveFlights } from '@/lib/api';

export default function FlightTracker() {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchFlights = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getLiveFlights();
      // data is an array of arrays. Structure according to OpenSky:
      // 0: icao24, 1: callsign, 2: origin_country, 3: time_position, 4: last_contact,
      // 5: longitude, 6: latitude, 7: baro_altitude, 8: on_ground, 9: velocity,
      // 10: true_track, 11: vertical_rate, 12: sensors, 13: geo_altitude, 14: squawk, 15: spi, 16: position_source
      if (data && data.length > 0) {
        // Filter to flights that have a valid callsign and altitude
        const validFlights = data
          .filter((f: any) => f[1] && f[1].trim() !== '' && f[7] !== null)
          .slice(0, 10); // Show max 10 to avoid clutter
        setFlights(validFlights);
      } else {
        setFlights([]);
      }
      setLastUpdated(new Date());
    } catch (err) {
      setError('Could not connect to flight network. Rate limit might be exceeded.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <section className="w-full py-12 px-4 bg-muted/20" aria-label="Live Flight Tracker">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <PlaneTakeoff className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">लाइव उड़ानें | Live Flights (India)</h2>
          </div>
          <Button onClick={fetchFlights} variant="outline" disabled={loading} size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
          {flights.length === 0 && !loading && !error ? (
            <div className="p-8 text-center text-muted-foreground">
              No active flights found in the region at the moment.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Callsign</th>
                    <th className="px-6 py-3">Origin Country</th>
                    <th className="px-6 py-3">Altitude (m)</th>
                    <th className="px-6 py-3">Speed (m/s)</th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map((flight, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium text-foreground">{flight[1]?.trim()}</td>
                      <td className="px-6 py-4 text-foreground">{flight[2]}</td>
                      <td className="px-6 py-4 text-accent font-semibold">{flight[7] ? Math.round(flight[7]) : 'N/A'}</td>
                      <td className="px-6 py-4 text-foreground">{flight[9] ? Math.round(flight[9]) : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {lastUpdated && (
          <p className="text-xs text-muted-foreground text-right mt-2">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>
    </section>
  );
}
