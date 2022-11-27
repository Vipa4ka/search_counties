import fetchCountries from './fetchCountries';
import countriesCardsHbs from './countries.hbs';
import countryCardHbs from './country.hbs';
import refs from './get-refs';
import debounce from 'lodash.debounce';
import './style.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

refs.input.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
  onClear();
  const formName = e.target.value;
  fetchCountries(formName)
    .then(country => {
      if (country.length === 1) {
        renderCountries(country, countryCardHbs);
        return;
      }
      if (country.length <= 10 && country.length > 1) {
        renderCountries(country, countriesCardsHbs);
        return;
      }
      if (country.length > 10) {
        onError('Too many matches found. Please enter a more specific query!');
        return;
      }
    })
    .catch(onError);
}

function renderCountries(nameCountry, Hbs) {
  refs.countainerCards.innerHTML = Hbs(nameCountry);
}

function onError(e) {
  error({
    text: `${e}`,
    hide: true,
    sticker: false,
    delay: 2000,
    addClass: 'errorMessage',
  });
}

function onClear() {
  refs.countainerCards.innerHTML = '';
}
