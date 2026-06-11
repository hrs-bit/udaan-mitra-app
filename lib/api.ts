// OpenSky Network API - Live flights over India
export async function getLiveFlights() {
  try {
    const response = await fetch(
      'https://opensky-network.org/api/states/all?lamin=8.0&lomin=68.0&lamax=37.0&lomax=97.0'
    );
    if (!response.ok) throw new Error('Failed to fetch live flights');
    const data = await response.json();
    return data.states || [];
  } catch (error) {
    console.error('Error fetching live flights:', error);
    return [];
  }
}

// Open-Meteo API - Live weather
export async function getWeather(lat: number, lon: number) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    if (!response.ok) throw new Error('Failed to fetch weather');
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

// OurAirports JSON - Airport Database
export async function getAirports() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/mwgg/Airports/master/airports.json'
    );
    if (!response.ok) throw new Error('Failed to fetch airports');
    return await response.json(); // Returns a dictionary { "ICAO": { ... } }
  } catch (error) {
    console.error('Error fetching airports:', error);
    return null;
  }
}

// Nominatim Geocoding via local Proxy
export async function getCoordinates(query: string) {
  try {
    const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to fetch coordinates');
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        displayName: data[0].display_name,
      };
    }
    return null;
  } catch (error) {
    console.error('Error geocoding:', error);
    return null;
  }
}

// Frankfurter API - Currency Conversion
export async function convertCurrency(amount: number, from: string = 'USD', to: string = 'INR') {
  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );
    if (!response.ok) throw new Error('Failed to convert currency');
    const data = await response.json();
    return data.rates[to];
  } catch (error) {
    console.error('Error converting currency:', error);
    return null;
  }
}
