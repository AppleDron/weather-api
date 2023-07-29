// const BASE_URL = 'https://the-one-api.dev/v2';
// const END_POINT = 'character';
// const KEY = 'iiV9hREM10W3rPS2VIK4';

// function getCharacter() {
//   const param = new URLSearchParams({
//     limit: 30,
//     page: 1,
//   });

//   const option = {
//     method: 'GET',
//     Headers: {
//       Authorization: `{Bearer ${KEY}}`,
//     },
//   };

//   fetch(`${BASE_URL}${END_POINT}?${param}`, option).then(response =>
//     console.log(response)
//   );
// }

// getCharacter();

// const target = document.querySelector('.js-guard');

// let options = {
//   root: null,
//   rootMargin: '200px',
//   threshold: 1.0,
// };

// let observer = new IntersectionObserver(callback, options);

// const BASE_URL = 'https://api.themoviedb.org/3/';
// const END_POINT = 'trending/movie/day';
// const API_KEY = '345007f9ab440e5b86cef51be6397df1';
// const list = document.querySelector('.js-list');
// const button = document.querySelector('.js-load');
// let currentPage = 1;

// button.addEventListener('click', onLoad);

// function callback() {}

// function onLoad() {
//   currentPage += 1;
//   getTrending(currentPage)
//     .then(data => {
//       list.insertAdjacentHTML('beforeend', createMarkup(data.results));
//       observer.observe(target);
//       if (data.page === data.total_pages) {
//         button.hidden = true;
//       }
//     })
//     .catch(console.error());
// }

// function getTrending(page = 1) {
//   return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=${page}`).then(
//     response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.json();
//     }
//   );
// }

// getTrending()
//   .then(data => {
//     list.insertAdjacentHTML('beforeend', createMarkup(data.results));
//     observer.observe(target);

//     if (data.page !== data.total_pages) {
//       button.hidden = false;
//     }
//   })
//   .catch(console.error());

// function createMarkup(arr) {
//   return arr
//     .map(({ poster_path, title }) => {
//       return `
//       <li>
//         <img src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}" />
//         <h2>${title}</h2>
//       </li>`;
//     })
//     .join('');
// }

const target = document.querySelector('.js-guard');
let options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};
let observer = new IntersectionObserver(onLoad, options);

const BASE_URL = 'https://api.themoviedb.org/3/';
const END_POINT = 'trending/movie/day';
const API_KEY = '345007f9ab440e5b86cef51be6397df1';
const list = document.querySelector('.js-list');
let currentPage = 1;

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;

      getTrending(currentPage)
        .then(data => {
          list.insertAdjacentHTML('beforeend', createMarkup(data.results));

          if (data.page === data.total_pages) {
            observer.unobserve(target);
          }
        })
        .catch(console.error());
    }
  });
}

function createMarkup(arr) {
  return arr
    .map(({ poster_path, title }) => {
      return `
      <li>
        <img src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}" />
        <h2>${title}</h2>
      </li>`;
    })
    .join('');
}

function getTrending(page = 1) {
  return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=${page}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}

getTrending()
  .then(data => {
    list.insertAdjacentHTML('beforeend', createMarkup(data.results));
    observer.observe(target);
  })
  .catch(console.error());
