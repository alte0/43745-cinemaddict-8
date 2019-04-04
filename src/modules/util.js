/**
 * @param {String} template
 * @param {HTMLElement} el
 */
const renderTempate = (template, el = document.body) => {
  el.insertAdjacentHTML(`beforeend`, template);
};
/**
 * @param {Array} arr
 * @param {HTMLElement} el
 * @param {Function} ClsFilter
 * @param {Function} filterCardsFilms
 */
const renderFilters = (arr, el, ClsFilter, filterCardsFilms) => {
  for (const dataFilter of arr) {
    const filter = new ClsFilter(dataFilter);
    filter.onFilter = filterCardsFilms;
    el.appendChild(filter.render());
  }
};
/**
 * @param {HTMLElement} el
 */
const clearChildEl = (el) => {
  el.innerHTML = ``;
};
/**
 * @param {HTMLElement} container
 * @param {HTMLElement} deleteElement
 */
const deleteEl = (container, deleteElement) => {
  container.removeChild(deleteElement);
};
/**
 * @param {String} template
 * @return {HTMLElement} HTMLElement
 */
const createElement = (template) => {
  const wrapperTemplate = document.createElement(`template`);
  wrapperTemplate.innerHTML = template;
  return wrapperTemplate.content.cloneNode(true).firstChild;
};
/**
 * @param {Array} arr
 * @return {Object}
 */
const calculateStat = (arr) => {
  let initiaStaticList = {
    watched: 0,
    duration: 0,
    genres: [],
    topGenre: `-`
  };

  const getStatForCanvas = (array) => {
    let result = {
      labels: [],
      data: []
    };
    let objGenre = {};

    array.forEach((genre) => {
      if (objGenre[genre] !== undefined) {
        ++objGenre[genre];
      } else {
        objGenre[genre] = 1;
      }
    });

    const sortArray = Object.entries(objGenre).sort((a, b) => {
      if (a[1] > b[1]) {
        return -1;
      }
      if (a[1] < b[1]) {
        return 1;
      }
      return 0;
    });

    sortArray.forEach((item) => {
      result.labels.push(item[0]);
      result.data.push(item[1]);
    });

    return result;
  };

  for (const film of arr) {
    initiaStaticList = Object.assign(
        {},
        initiaStaticList,
        {
          watched: initiaStaticList.watched + film.isWatched,
          duration: film.isWatched ? initiaStaticList.duration + film.duration : initiaStaticList.duration,
          genres: film.isWatched ? initiaStaticList.genres.concat(...film.genres) : initiaStaticList.genres
        }
    );
  }

  initiaStaticList.statForCanvas = getStatForCanvas(initiaStaticList.genres);
  initiaStaticList.topGenre = initiaStaticList.statForCanvas.labels[0];

  return initiaStaticList;
};
/**
 * @param {String} filterName
 * @param {Array} initialFilms
 * @param {String} text
 * @return {Array}
 */
const filterFilms = (filterName, initialFilms, text = ``) => {
  switch (filterName) {
    case `#all`:
      return initialFilms;
    case `#watchlist`:
      return initialFilms.filter((film) => film.isWatchlist);
    case `#history`:
      return initialFilms.filter((film) => film.isWatched);
    case `#favorites`:
      return initialFilms.filter((film) => film.isFavorite);
    case `searchTitle`:
      const regexpSearchText = new RegExp(`${text}`, `gi`);
      return initialFilms.filter((film) => {
        const resultSearch = film.title.match(regexpSearchText);
        return resultSearch !== null && resultSearch.length > 0;
      });
    case `Most rated`:
      return [...initialFilms].sort((a, b) => b.rating - a.rating);
    case `Most commented`:
      return [...initialFilms].sort((a, b) => b.comments.length - a.comments.length);
    default:
      return initialFilms;
  }
};
/**
 * @param {Array} films
 * @param {Object} film
 * @param {Object} newDataFilm
 * @return {Object}
 */
const updateFilmData = (films, film, newDataFilm) => {
  const index = films.findIndex((item) => item === film);
  films[index] = Object.assign(film, newDataFilm);
  return films[index];
};
/**
 * @param {HTMLElement} el
 */
const setBlockElem = (el) => {
  el.disabled = true;
};
/**
 * @param {HTMLElement} el
 */
const setUnBlockElem = (el) => {
  el.disabled = false;
};
/**
 * @param {HTMLElement} el
 * @param {Boolean} bool
 */
const setDefaulStyle = (el, bool = true) => {
  if (bool) {
    el.style.border = ``;
  } else {
    el.style.backgroundColor = ``;
  }
  el.classList.remove(`shake`);
};
/**
 * @param {HTMLElement} el
 * @param {Boolean} bool
 */
const setErrorStyle = (el, bool = true) => {
  if (bool) {
    el.style.border = `5px solid red`;
  } else {
    el.style.backgroundColor = `red`;
  }
  el.classList.add(`shake`);
};
/**
 * @param {Array} arr
 * @param {Number} start
 * @param {Number} end
 * @return {Array}
 */
const sliceForShowMovies = (arr, start = 0, end) => {
  if (end > arr.length) {
    end = arr.length;
  }

  return arr.slice(start, end);
};
/**
 * @param {HTMLElement} el
 * @param {Array} arr
 */
const setRankUser = (el, arr) => {
  const RankType = {
    novice: `Novice`,
    fan: `Fan`,
    movieBuff: `Movie buff`,
  };
  const length = arr.length;
  let rank = ``;

  if (length > 1 && length <= 10) {
    rank = RankType.novice;
  } else if (length > 11 && length <= 20) {
    rank = RankType.fan;
  } else if (length > 21) {
    rank = RankType.movieBuff;
  }

  el.innerHTML = `<p class="profile__rating">${rank}</p>`;
};

export {
  clearChildEl,
  renderFilters,
  createElement,
  calculateStat,
  deleteEl,
  renderTempate,
  filterFilms,
  updateFilmData,
  setBlockElem,
  setUnBlockElem,
  setDefaulStyle,
  setErrorStyle,
  sliceForShowMovies,
  setRankUser
};
