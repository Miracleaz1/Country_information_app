// Import necessary hooks from React and Next.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const CountryDetails = () => {
  // Use Next.js router to get the dynamic route parameter
  const router = useRouter();
  const { name } = router.query;
  const [country, setCountry] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (name) {
      fetch(`https://restcountries.com/v3.1/alpha/${name}`)
        .then(response => response.json())
        .then(data => setCountry(data[0]));
    }
// Retrieve saved favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, [name]);

  // Function to toggle the country as a favorite
  const toggleFavorite = () => {
    let updatedFavorites;
    if (favorites.includes(country.cca3)) {
      updatedFavorites = favorites.filter(fav => fav !== country.cca3);
    } else {
      updatedFavorites = [...favorites, country.cca3];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
// Show a loading message if the country data is not yet available
if (!country) return <div>Loading...</div>;
  if (!country) return <div>Loading...</div>;

// Render the country details
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
      <h1 className="text-4xl font-bold text-center mb-8 text-white">{country.name.common}</h1>
      <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
        <img src={country.flags.svg} alt={`${country.name.common} flag`} className="w-32 h-32 mb-4" />
        <p className="text-lg"><strong>Population:</strong> {country.population}</p>
        <p className="text-lg"><strong>Region:</strong> {country.region}</p>
        <p className="text-lg"><strong>Capital:</strong> {country.capital}</p>
        <p className="text-lg"><strong>Subregion:</strong> {country.subregion}</p>
        <p className="text-lg"><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
        <p className="text-lg"><strong>Currencies:</strong> {Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
        <button
          onClick={toggleFavorite}
          className={`mt-4 px-4 py-2 rounded-md text-white ${favorites.includes(country.cca3) ? 'bg-red-500' : 'bg-blue-500'} hover:opacity-90 transition-opacity`}
        >
          {favorites.includes(country.cca3) ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    </div>
  );
};

export default CountryDetails;