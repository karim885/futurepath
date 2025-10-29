import { NextResponse } from 'next/server';

// Enhanced proxy/transformer for Hipolabs Universities API
// Docs: http://universities.hipolabs.com/

interface HipolabsUniversity {
  name: string;
  country: string;
  'state-province': string | null;
  web_pages: string[];
  domains: string[];
  alpha_two_code: string;
}

// Popular countries for broader coverage
const POPULAR_COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Japan', 'Singapore', 'Netherlands', 'Switzerland',
  'Italy', 'Spain', 'Brazil', 'Mexico', 'India', 'South Korea',
  'China', 'Russia', 'Argentina', 'Chile'
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || '';
    const name = searchParams.get('name') || '';
    const limit = parseInt(searchParams.get('limit') || '100');

    // If no country specified, fetch from popular countries
    let countriesToFetch = country ? [country] : POPULAR_COUNTRIES;
    
    if (!country && !name) {
      // Fetch a diverse set globally
      const endpoints = countriesToFetch.slice(0, 10).map(c => {
        const url = new URL('http://universities.hipolabs.com/search');
        url.searchParams.set('country', c);
        return fetch(url.toString(), { cache: 'no-store' });
      });

      const results = await Promise.all(endpoints);
      const allData: HipolabsUniversity[] = [];
      
      for (const res of results) {
        if (res.ok) {
          const data = await res.json();
          allData.push(...data);
        }
      }

      // De-duplicate and limit
      const unique = Array.from(
        new Map(allData.map(u => [`${u.name}|${u.country}`, u])).values()
      );

      const transformed = unique.slice(0, limit).map((u) => ({
        name: u.name,
        country: u.country,
        city: u['state-province'] || null,
        website: u.web_pages?.[0] || null,
      }));

      return NextResponse.json({ universities: transformed, count: transformed.length });
    }

    // Specific country or name search
    const endpoint = new URL('http://universities.hipolabs.com/search');
    if (country) endpoint.searchParams.set('country', country);
    if (name) endpoint.searchParams.set('name', name);

    const res = await fetch(endpoint.toString(), { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch universities' },
        { status: res.status }
      );
    }

    const data: HipolabsUniversity[] = await res.json();

    // De-duplicate and transform
    const unique = Array.from(
      new Map(data.map(u => [`${u.name}|${u.country}`, u])).values()
    );

    const transformed = unique.slice(0, limit).map((u) => ({
      name: u.name,
      country: u.country,
      city: u['state-province'] || null,
      website: u.web_pages?.[0] || null,
    }));

    return NextResponse.json({ universities: transformed, count: transformed.length });
  } catch (error) {
    console.error('Hipolabs API error:', error);
    return NextResponse.json(
      { error: 'Unexpected error fetching universities' },
      { status: 500 }
    );
  }
}


