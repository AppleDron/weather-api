import { getWeatherData } from './weather-api';

const search = document.querySelector('.js-search-form');
const list = document.querySelector('.js-list');

const convertSecondsToHoursAndMinutes = seconds => {
  const date = new Date(seconds * 1000);

  return `${date.getHours()} : ${date.getMinutes()}`;
};

const handleWeatherFormSearch = evt => {
  evt.preventDefault();

  const searchQuery = evt.target.firstElementChild.value.trim();

  if (!searchQuery) {
    return;
  }

  getWeatherData(searchQuery).then(data => {
    console.log(object);
  });
};

search.addEventListener('submit', handleWeatherFormSearch);
