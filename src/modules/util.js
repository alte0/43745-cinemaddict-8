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
 * @param {Function} fn
 */
const renderData = (arr, el, fn) => {
  let template = ``;

  for (const data of arr) {
    template = template + fn(data);
  }

  renderTempate(template, el);
};
// /**
//  * @param {Array} arr
//  * @param {HTMLElement} el
//  * @param {Function} ClsCard
//  * @param {Function} ClsPopup
//  */
// const renderCards = (arr, el, ClsCard, ClsPopup) => {
//   const body = document.body;

//   for (const dataCard of arr) {
//     const card = new ClsCard(dataCard);
//     const popupCard = new ClsPopup(dataCard);

//     card.popupOpen = () => {
//       if (!body.querySelector(`.film-details`)) {
//         popupCard.render(body);
//       }
//     };
//     card.onAddToWatchList = (bool) => {
//       dataCard.isWatchlist = bool;
//       popupCard.update(dataCard);
//     };
//     card.onMarkAsWatched = (bool) => {
//       dataCard.isWatched = bool;
//       popupCard.update(dataCard);
//     };
//     card.onFavorite = (bool) => {
//       dataCard.isFavorite = bool;
//       popupCard.update(dataCard);
//     };

//     popupCard.closePopup = function () {
//       this.unbind();
//       this._element.remove();
//       this._element = null;
//     };

//     popupCard.onChangeFormData = (newObject) => {
//       const newDataCard = updateFilmData(arr, dataCard, newObject);

//       api.updateMovie({id: newDataCard.id, data: newDataCard.toRAW()})
//         .then((newFilm)=> {
//           card.update(newFilm);
//           card.partialUpdate();
//           card.unbind();
//           card.bind();
//         });
//     };

//     el.appendChild(card.render());
//   }
// };
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
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomBoolean = () => Math.random() >= 0.5;
/**
 * @param {Array} arr
 * @param {Boolean} isTwo
 * @return {Array} copyArr
 */
const randomOrderInArrayAndSplice = (arr, isTwo = false) => {
  const copyArr = arr.slice();

  copyArr.sort((a, b) => a.title.length > b.title.length);

  if (isTwo) {
    copyArr.splice(2);
  } else {
    const randomNum = Math.random() * copyArr.length - 1;
    copyArr.splice(0, randomNum);
  }
  return copyArr;
};
/**
 * @param {String} template
 * @return {HTMLElement} HTMLElement
 */
const createElement = (template) => {
  const wrapperTemplate = document.createElement(`div`);
  wrapperTemplate.innerHTML = template;
  return wrapperTemplate.firstChild;
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
 * @return {Array}
 */
const filterFilms = (filterName, initialFilms) => {
  switch (filterName) {
    case `#all`:
      return initialFilms;
    case `#watchlist`:
      return initialFilms.filter((film) => film.isWatchlist);
    case `#history`:
      return initialFilms.filter((film) => film.isWatched);
    case `#favorites`:
      return initialFilms.filter((film) => film.isFavorite);
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
 * @param {String} str
 */
const recordText = (el, str) => {
  el.textContent = str;
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
 */
const setDefaulStyle = (el) => {
  el.style.border = ``;
  el.classList.remove(`shake`);
};
/**
 * @param {HTMLElement} el
 */
const setErrorStyle = (el) => {
  el.style.border = `5px solid red`;
  el.classList.add(`shake`);
};
export {
  getRndInteger,
  clearChildEl,
  renderData,
  // renderCards,
  renderFilters,
  getRandomBoolean,
  randomOrderInArrayAndSplice,
  createElement,
  calculateStat,
  deleteEl,
  renderTempate,
  filterFilms,
  recordText,
  updateFilmData,
  setBlockElem,
  setUnBlockElem,
  setDefaulStyle,
  setErrorStyle
};
