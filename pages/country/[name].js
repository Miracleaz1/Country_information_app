import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CountryDetails = () => {
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

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, [name]);

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

  if (!country) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">{country.name.common}</h1>
      <div className="flex flex-col items-center">
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