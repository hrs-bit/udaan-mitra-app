'use client';

import { AlertCircle, CheckCircle2, Clock, FileText, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InfoSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'arrival',
      title: 'Before You Arrive at Airport',
      icon: Clock,
      items: [
        'Arrive at least 2-3 hours before your domestic flight',
        'Arrive 3-4 hours before international flight',
        'Have a valid government ID ready (Aadhaar, Passport, PAN)',
        'Have printed or digital copy of your boarding pass',
        'Complete web check-in 24-48 hours before flight'
      ]
    },
    {
      id: 'checkin',
      title: 'Check-in Process',
      icon: FileText,
      items: [
        'Find your airline counter at the airport',
        'Place baggage on the conveyor belt',
        'Get your boarding pass if not already checked in',
        'Keep a copy of your baggage tag',
        'Maximum carry-on baggage: 7kg',
        'Checked baggage: Usually 15-20kg included'
      ]
    },
    {
      id: 'security',
      title: 'Security Checkpoint',
      icon: AlertCircle,
      items: [
        'Remove shoes and keep them ready',
        'Empty your pockets completely',
        'Remove liquids/gels if more than 100ml',
        'Remove power banks from bags',
        'Remove electronics (laptop, mobile) from bag',
        'Keep your ID ready for verification'
      ]
    },
    {
      id: 'restrictions',
      title: 'Prohibited Items',
      icon: Package,
      items: [
        'Fuel, lighter fluid, and flammable materials',
        'Firearms and ammunition',
        'Sharp objects (knives, scissors)',
        'Explosives of any kind',
        'Lithium batteries (except in devices)',
        'Animals (except service animals)',
        'Banned food items in carry-on'
      ]
    },
    {
      id: 'baggage',
      title: 'Baggage Rules',
      icon: Package,
      items: [
        'Power banks: 2 per person, max 160Wh capacity',
        'Power banks MUST go in carry-on baggage only',
        'Liquids: Max 100ml bottles in transparent bag',
        'Heavy items should go in checked baggage',
        'Fragile items: Pack securely',
        'Medications: Keep in original containers'
      ]
    },
    {
      id: 'boarding',
      title: 'Boarding & Gates',
      icon: MapPin,
      items: [
        'Gate numbers can change - check announcements',
        'Boarding usually starts 30-45 minutes before departure',
        'Listen for your boarding group',
        'Have ID and boarding pass ready',
        'Walk to your gate - can take 10-15 minutes',
        'Last call is 10 minutes before departure'
      ]
    }
  ];

  return (
    <section className="w-full py-20 px-4 bg-primary/5" aria-label="First-Time Flyer Information">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <AlertCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            First Time Flying? | पहली बार उड़ रहे हैं?
          </h2>
        </div>

        <p className="text-foreground mb-8 text-center">
          Everything you need to know about your first airport experience. Click on each section to learn more.
        </p>

        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSection === section.id;

            return (
              <div
                key={section.id}
                className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4 text-left">
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-foreground">{section.title}</h3>
                  </div>
                  <div className="text-2xl text-muted-foreground">
                    {isExpanded ? '−' : '+'}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-muted/30 border-t border-border">
                        <ul className="space-y-3">
                          {section.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                              <span className="text-sm text-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-accent/10 rounded-lg p-6 border border-accent/30">
          <h3 className="font-semibold text-foreground mb-3">Emergency Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Jammu Airport Information</p>
              <p className="font-mono text-primary font-semibold">+91-191-2435-2435</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Delhi Airport Information</p>
              <p className="font-mono text-primary font-semibold">+91-11-2437-1111</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Airport Authority India</p>
              <p className="font-mono text-primary font-semibold">+91-11-2941-7777</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Airline Support (General)</p>
              <p className="font-mono text-primary font-semibold">Contact your airline</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Website designed by harshit sharma
          </p>
        </div>
      </motion.div>
    </section>
  );
}
