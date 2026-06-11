'use client';

import { Car, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CabBooking() {
  const router = useRouter();
  const [locationText, setLocationText] = useState('Detecting your location...');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocationText('Finding location name...');
          
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
            .then(res => res.json())
            .then(data => {
              if (data && (data.locality || data.city)) {
                setLocationText(`${data.locality || data.city}, ${data.principalSubdivision}`);
              } else if (data && data.countryName) {
                setLocationText(`${data.principalSubdivision}, ${data.countryName}`);
              } else {
                setLocationText(`Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`);
              }
            })
            .catch(() => {
              setLocationText(`Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`);
            });
        },
        (error) => {
          setLocationText('Location access denied');
        }
      );
    } else {
      setLocationText('Geolocation not supported');
    }
  }, []);

  const handleBookNow = () => {
    router.push('/coming-soon');
  };

  return (
    <section className="w-full py-16 px-4 bg-card" aria-label="Cab Booking Service">
      <div className="max-w-md mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Car className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">कैब बुक करें | Book a Cab</h2>
        </div>
        
        <div className="bg-muted/30 p-8 rounded-xl border-2 border-border mb-8 shadow-sm">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-medium">Pickup Location / पिकअप स्थान</span>
          </div>
          <div className="text-lg font-mono text-foreground bg-background py-4 px-4 rounded-lg border border-border">
            {locationText}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            We use your current device location to instantly find cabs near you.
          </p>
        </div>

        <Button 
          onClick={handleBookNow}
          className="w-full text-xl py-8 font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Book Now / अभी बुक करें
        </Button>
      </div>
    </section>
  );
}
