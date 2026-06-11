'use client';

import HeroSection from '@/components/HeroSection';
import FlightPrices from '@/components/FlightPrices';
import CabBooking from '@/components/CabBooking';
import AirportAssistance from '@/components/AirportAssistance';
import InfoSection from '@/components/InfoSection';
import FlightTracker from '@/components/FlightTracker';
import DestinationWeather from '@/components/DestinationWeather';

export default function Page() {
  return (
    <main className="w-full">
      <HeroSection />
      <FlightTracker />
      <FlightPrices />
      <DestinationWeather />
      <CabBooking />
      <AirportAssistance />
      <InfoSection />
    </main>
  );
}
