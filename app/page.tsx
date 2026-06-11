'use client';

import HeroSection from '@/components/HeroSection';
import FlightPrices from '@/components/FlightPrices';
import CabBooking from '@/components/CabBooking';
import AirportAssistance from '@/components/AirportAssistance';
import InfoSection from '@/components/InfoSection';

export default function Page() {
  return (
    <main className="w-full">
      <HeroSection />
      <FlightPrices />
      <CabBooking />
      <AirportAssistance />
      <InfoSection />
    </main>
  );
}
