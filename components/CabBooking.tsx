'use client';

import { Car, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCabRatesByAirport, generateWhatsappMessage } from '@/lib/cabRates';
import { useAirports, Airport } from '@/lib/useAirports';
import { useState, useRef, useEffect } from 'react';

const CAB_APPS = [
  { name: 'Uber', color: 'bg-black', icon: '🚗', url: 'https://uber.com' },
  { name: 'Ola', color: 'bg-yellow-500', icon: '🟡', url: 'https://olaelectric.com' },
  { name: 'Rapido', color: 'bg-red-500', icon: '🔴', url: 'https://rapido.bike' },
  { name: 'Local Taxi', color: 'bg-green-600', icon: '🟢', url: 'tel:+919876543210' },
];

function AirportSearch({
  value,
  onChange,
  onSelect,
}: {
  value: string;
  onChange: (val: string) => void;
  onSelect: (airport: Airport) => void;
}) {
  const { searchAirports, loading } = useAirports();
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = searchAirports(value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative mb-4" ref={wrapperRef}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary bg-card text-foreground"
        placeholder={loading ? 'Loading airports database...' : 'Search any airport (e.g., IXJ)'}
        disabled={loading}
      />
      {showDropdown && value.length > 0 && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((airport) => (
            <li
              key={airport.icao}
              onClick={() => {
                onSelect(airport);
                onChange(`${airport.city} (${airport.iata})`);
                setShowDropdown(false);
              }}
              className="px-4 py-3 hover:bg-muted cursor-pointer"
            >
              <div className="font-medium text-foreground">{airport.city}</div>
              <div className="text-xs text-muted-foreground">{airport.name} ({airport.iata})</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CabBooking() {
  const [airportQuery, setAirportQuery] = useState('Jammu (IXJ)');
  const [selectedAirportCode, setSelectedAirportCode] = useState('IXJ');
  const [selectedCab, setSelectedCab] = useState(0);
  const [showAppOptions, setShowAppOptions] = useState(false);

  // Fallback to static cab rates or generate dynamically based on airport code
  const availableCabs = getCabRatesByAirport(selectedAirportCode) || [
    { destination: 'City Center', distance: '12 km', estimatedTime: '30 mins', fare: 450, currency: '₹' },
    { destination: 'Railway Station', distance: '8 km', estimatedTime: '20 mins', fare: 300, currency: '₹' },
  ];
  const currentCab = availableCabs[selectedCab] || availableCabs[0];

  const handleWhatsappBook = () => {
    const message = generateWhatsappMessage(currentCab, 'Traveler') || `I need a cab from ${selectedAirportCode} to ${currentCab.destination}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAppBooking = (app: any) => {
    window.open(app.url, '_blank');
  };

  return (
    <section className="w-full py-12 px-4 bg-card" aria-label="Cab Booking Service">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Car className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">हवाई अड्डे से कैब | Airport Cab Booking</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Airport Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Choose Airport / हवाई अड्डा चुनें</label>
            <AirportSearch
              value={airportQuery}
              onChange={setAirportQuery}
              onSelect={(airport) => {
                setSelectedAirportCode(airport.iata);
                setSelectedCab(0);
              }}
            />
            <div className="mt-2 text-sm text-muted-foreground">
              Currently Selected: <span className="font-semibold text-foreground">{selectedAirportCode}</span>
            </div>
          </div>

          {/* Cab Selection & Details */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Select Destination / मंजिल चुनें</label>
            <div className="space-y-2 mb-6">
              {availableCabs.map((cab, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCab(idx)}
                  className={`w-full px-4 py-3 text-left rounded-lg border-2 transition-colors ${
                    selectedCab === idx
                      ? 'border-accent bg-accent/10'
                      : 'border-border hover:border-accent/50'
                  }`}
                  aria-pressed={selectedCab === idx}
                >
                  <div className="font-medium text-foreground">{cab.destination}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {cab.distance} • {cab.estimatedTime}
                  </div>
                </button>
              ))}
            </div>

            {/* Fare Display */}
            {currentCab && (
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/30 mb-6">
                <div className="text-xs text-muted-foreground mb-1">Estimated Fare / अनुमानित किराया</div>
                <div className="text-3xl font-bold text-accent mb-4">{currentCab.currency}{currentCab.fare}</div>
                <div className="space-y-2">
                  <Button
                    onClick={handleWhatsappBook}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
                  >
                    WhatsApp से बुक करें / Book via WhatsApp
                  </Button>
                  <Button
                    onClick={() => setShowAppOptions(!showAppOptions)}
                    variant="outline"
                    className="w-full"
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    App से बुक करें / Book via App
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* App Booking Options */}
        {showAppOptions && (
          <div className="bg-muted/50 rounded-lg p-6 mb-8 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Available Cab Apps / उपलब्ध कैब ऐप्स</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CAB_APPS.map((app) => (
                <button
                  key={app.name}
                  onClick={() => handleAppBooking(app)}
                  className="bg-card rounded-lg p-4 border border-border hover:border-primary hover:shadow-md transition-all text-center"
                >
                  <div className="text-3xl mb-2">{app.icon}</div>
                  <p className="font-medium text-foreground text-sm">{app.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
