'use client';

import { useState } from 'react';
import { CloudRain, MapPin, Search, Wind, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCoordinates, getWeather } from '@/lib/api';

export default function DestinationWeather() {
  const [destination, setDestination] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!destination.trim()) return;
    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const coords = await getCoordinates(`${destination} Airport`);
      if (!coords) {
        setError('Location not found. Try another airport name.');
        setLoading(false);
        return;
      }

      const weather = await getWeather(coords.lat, coords.lon);
      if (weather && weather.current_weather) {
        setWeatherData({
          location: coords.displayName.split(',')[0],
          temp: weather.current_weather.temperature,
          windSpeed: weather.current_weather.windspeed,
          time: new Date(weather.current_weather.time).toLocaleString(),
        });
      } else {
        setError('Could not fetch weather data.');
      }
    } catch (err) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-12 px-4 bg-background" aria-label="Destination Weather">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <CloudRain className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">गंतव्य का मौसम | Destination Weather</h2>
        </div>

        <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter destination city (e.g., Jammu)"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary bg-background text-foreground"
              />
            </div>
            <Button onClick={handleSearch} disabled={loading} className="bg-primary text-primary-foreground">
              {loading ? 'Searching...' : <><Search className="w-4 h-4 mr-2" /> Check Weather</>}
            </Button>
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          {weatherData && (
            <div className="bg-primary/5 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between border border-primary/20">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{weatherData.location} Airport</h3>
                <p className="text-sm text-muted-foreground mt-1">Last updated: {weatherData.time}</p>
              </div>
              <div className="flex gap-8 mt-4 md:mt-0">
                <div className="flex flex-col items-center">
                  <Thermometer className="w-8 h-8 text-accent mb-2" />
                  <span className="text-2xl font-bold text-foreground">{weatherData.temp}°C</span>
                  <span className="text-xs text-muted-foreground">Temperature</span>
                </div>
                <div className="flex flex-col items-center">
                  <Wind className="w-8 h-8 text-blue-400 mb-2" />
                  <span className="text-2xl font-bold text-foreground">{weatherData.windSpeed} km/h</span>
                  <span className="text-xs text-muted-foreground">Wind Speed</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
