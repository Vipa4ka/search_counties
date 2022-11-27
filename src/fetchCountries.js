const BASE_URL = 'https://restcountries.com/v2';

export default function fetchCountries(nameCountry) {
  return fetch(`${BASE_URL}/name/${nameCountry}`).then(res => {
    {
      if (res.ok) return res.json();
      throw new Error('Error fatching data');
    }
  });
}
