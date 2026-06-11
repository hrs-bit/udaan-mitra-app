import { Info } from 'lucide-react';
import Link from 'next/link';

export default function BookCab() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-center max-w-md mx-auto bg-card p-8 rounded-xl shadow-lg border-2 border-primary/20">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Info className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">Coming Soon</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          We are currently integrating this feature. Please check back later!
        </p>
        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
