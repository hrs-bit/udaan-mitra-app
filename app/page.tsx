'use client';

import HeroSection from '@/components/HeroSection';
import FlightPrices from '@/components/FlightPrices';
import CabBooking from '@/components/CabBooking';
import AirportAssistance from '@/components/AirportAssistance';
import InfoSection from '@/components/InfoSection';

export default function Page() {
  return (
    <main className="w-full h-[100dvh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">
      <HeroSection />
      <FlightPrices />
      <CabBooking />
      <AirportAssistance />
      <InfoSection />
    </main>
  );
}
