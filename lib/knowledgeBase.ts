export const knowledgeBase = {
  powerBank: {
    keyword: ['power', 'bank', 'baggage', 'battery', 'charge'],
    hindi: 'पावर बैंक एक सुरक्षित यात्रा सहायक है। आप प्रति यात्री 2 पावर बैंक ले सकते हैं। कुल क्षमता 160 Wh तक होनी चाहिए। बड़ी पावर बैंक को अलग बैग में रखें।',
    english: 'Power banks are allowed in carry-on baggage only. You can bring 2 power banks per person. Total capacity should not exceed 160Wh. Always keep them in your carry-on bag, not checked luggage.',
    dogri: 'पावर बैंक सुरक्षित छ। प्रति यात्री 2 पावर बैंक लेइ सकदा ऐ। कुल क्षमता 160 Wh तकी होनी चाहिए। हमेश कैरी-ऑन बैग च राखु।'
  },
  jmmuDocuments: {
    keyword: ['jammu', 'documents', 'document', 'papers', 'id', 'passport', 'aadhar'],
    hindi: 'जम्मू हवाई अड्डे के लिए आपको वैलिड आईडी प्रूफ चाहिए। आधार कार्ड, पासपोर्ट, या ड्राइविंग लाइसेंस मान्य है। मास्क पहनना अनिवार्य है। चेक-इन से 2 घंटे पहले आएं।',
    english: 'For Jammu Airport, you need a valid ID proof like Aadhaar, Passport, or Driving License. Wear a mask at all times. Reach the airport 2 hours before domestic flights. Carry a soft copy of your ticket on your phone.',
    dogri: 'जम्मू हवाई अड्डे लई मान्य आईडी चाहिए। आधार, पासपोर्ट, या ड्राइविंग लाइसेंस ठीक ऐ। मास्क पहनू। फ्लाइट से 2 घंटे पहले आउ।'
  },
  bagageTransfer: {
    keyword: ['baggage', 'luggage', 'transfer', 'multiple', 'cities', 'flight', 'through'],
    hindi: 'बहु-शहर यात्रा में आपका सामान सभी गंतव्यों तक जाता है। पहली फ्लाइट से चेक करें कि आपका बैग अंतिम गंतव्य तक संलग्न है। छोटे हवाई अड्डों पर स्टॉप-ओवर के लिए सामान निकालना पड़ सकता है।',
    english: 'For multi-city journeys, your checked baggage can be transferred through to your final destination. Confirm with the first airline that your baggage is tagged through. At smaller airports, you may need to collect and re-check your bags.',
    dogri: 'बहु-शहर यात्रा च तुहाडा सामान अंतिम गंतव्य तकी जंदा ऐ। पहली फ्लाइट ते पक्का करु। छोटे हवाई अड्डें पर सामान फिर से चेक करवना पड़ी सकदा ऐ।'
  }
};

export const getResponseByQuery = (query: string, language: 'hindi' | 'english' | 'dogri' = 'english'): string | null => {
  const lowerQuery = query.toLowerCase();
  
  for (const [key, entry] of Object.entries(knowledgeBase)) {
    const keywords = entry.keyword;
    if (keywords.some(kw => lowerQuery.includes(kw.toLowerCase()))) {
      return entry[language as keyof typeof entry] as string;
    }
  }
  
  return null;
};
