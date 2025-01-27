import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data));

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Country Information</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={handleSearch}
        className="block w-full max-w-md mx-auto p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
        {filteredCountries.map(country => (
          <li key={country.cca3} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Link href={`/country/${country.cca3}`} legacyBehavior>
              <a className="text-lg font-semibold text-blue-600 hover:underline">{country.name.common}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}