'use client';

import { Accessibility, Luggage, Sofa } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';

const CUSTOMER_CARE = {
  wheelchair: '14440 (AirSewa)',
  luggage: '+91-124-4797300 (Airport)',
  lounge: '1800-102-4606 (Lounges)',
};

export default function AirportAssistance() {
  const [wheelchair, setWheelchair] = useState(false);
  const [luggageHelper, setLuggageHelper] = useState(false);
  const [loungeAccess, setLoungeAccess] = useState(false);

  const handleBooking = (service: boolean, setState: (val: boolean) => void) => {
    setState(!service);
  };

  return (
    <section className="w-full min-h-[100dvh] snap-start flex flex-col justify-center py-12 px-4 bg-muted/30" aria-label="Airport Assistance Services">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full mx-auto"
      >
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          विशेष सेवाएँ | Special Assistance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Wheelchair Service */}
          <div className="bg-card rounded-lg border-2 border-border p-6 transition-all hover:border-primary hover:shadow-lg">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Accessibility className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Wheelchair</h3>
              <p className="text-sm text-muted-foreground mb-4">
                व्हीलचेयर सहायता
              </p>
              <Button
                onClick={() => handleBooking(wheelchair, setWheelchair)}
                className={`w-full mb-3 transition-colors ${
                  wheelchair
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {wheelchair ? '✓ Booked' : 'Book Now'}
              </Button>
              <div className="text-xs bg-muted/50 rounded p-2 w-full">
                <p className="font-mono text-primary">{CUSTOMER_CARE.wheelchair}</p>
              </div>
            </div>
          </div>

          {/* Luggage Helper Service */}
          <div className="bg-card rounded-lg border-2 border-border p-6 transition-all hover:border-primary hover:shadow-lg">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Luggage className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Luggage Helper</h3>
              <p className="text-sm text-muted-foreground mb-4">
                सामान सहायक
              </p>
              <Button
                onClick={() => handleBooking(luggageHelper, setLuggageHelper)}
                className={`w-full mb-3 transition-colors ${
                  luggageHelper
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {luggageHelper ? '✓ Booked' : 'Book Now'}
              </Button>
              <div className="text-xs bg-muted/50 rounded p-2 w-full">
                <p className="font-mono text-primary">{CUSTOMER_CARE.luggage}</p>
              </div>
            </div>
          </div>

          {/* Lounge Access Service */}
          <div className="bg-card rounded-lg border-2 border-border p-6 transition-all hover:border-primary hover:shadow-lg">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Sofa className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Lounge Access</h3>
              <p className="text-sm text-muted-foreground mb-4">
                लाउंज़ पहुंच
              </p>
              <Button
                onClick={() => handleBooking(loungeAccess, setLoungeAccess)}
                className={`w-full mb-3 transition-colors ${
                  loungeAccess
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {loungeAccess ? '✓ Booked' : 'Book Now'}
              </Button>
              <div className="text-xs bg-muted/50 rounded p-2 w-full">
                <p className="font-mono text-primary">{CUSTOMER_CARE.lounge}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Message */}
        {(wheelchair || luggageHelper || loungeAccess) && (
          <div className="mt-8 bg-accent/10 rounded-lg p-6 border-2 border-accent">
            <div className="flex items-start gap-4">
              <div className="text-3xl">✓</div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-3">सहायता बुकिंग पुष्टि | Booking Confirmed</h4>
                <div className="bg-card rounded p-4 mb-4">
                  <p className="text-sm text-foreground mb-3 font-medium">Booked Services:</p>
                  <ul className="text-sm text-foreground space-y-2">
                    {wheelchair && (
                      <li className="flex justify-between items-center">
                        <span>• व्हीलचेयर सहायता</span>
                        <span className="text-primary font-mono text-xs">{CUSTOMER_CARE.wheelchair}</span>
                      </li>
                    )}
                    {luggageHelper && (
                      <li className="flex justify-between items-center">
                        <span>• सामान सहायक</span>
                        <span className="text-primary font-mono text-xs">{CUSTOMER_CARE.luggage}</span>
                      </li>
                    )}
                    {loungeAccess && (
                      <li className="flex justify-between items-center">
                        <span>• लाउंज़ पहुंच</span>
                        <span className="text-primary font-mono text-xs">{CUSTOMER_CARE.lounge}</span>
                      </li>
                    )}
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground">
                  Call the provided customer care number if you need to modify your bookings or have any questions. हवाई अड्डे पर जाने से पहले कॉल करें।
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-primary/10 rounded-lg p-4 border border-primary/30">
          <p className="text-sm text-foreground">
            <span className="font-medium">📞 Important:</span> Have your flight number and booking reference ready when calling. Services are available 24/7.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
