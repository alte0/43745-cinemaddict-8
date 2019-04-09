/**
 * Отрисовка template
 * @param {String} template
 * @param {HTMLElement} el
 */
const renderTempate = (template, el = document.body) => {
  el.insertAdjacentHTML(`beforeend`, template);
};
/**
 * Отрисовка фильтров в навигации
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
 * Очишает внутри элемента
 * @param {HTMLElement} el
 */
const clearChildEl = (el) => {
  el.innerHTML = ``;
};
/**
 * Удаление ребенка в родителе
 * @param {HTMLElement} parent
 * @param {HTMLElement} deleteElement
 */
const deleteEl = (parent, deleteElement) => {
  parent.removeChild(deleteElement);
};
/**
 * Создание элемента
 * @param {String} template
 * @return {HTMLElement} HTMLElement
 */
const createElement = (template) => {
  const wrapperTemplate = document.createElement(`template`);
  wrapperTemplate.innerHTML = template;
  return wrapperTemplate.content.cloneNode(true).firstChild;
};
/**
 * Калькульция для статистики
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
  initiaStaticList.topGenre = initiaStaticList.statForCanvas.labels[0] !== undefined ? initiaStaticList.statForCanvas.labels[0] : `n/d`;

  return initiaStaticList;
};
/**
 * Фильтрация фильмов по параметру filterName
 * @param {String} filterName
 * @param {Array} initialFilms
 * @param {String} text для поиска по введеным данным
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
 * Обновление данных о фильме
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
 * Блокировка элемента
 * @param {HTMLElement} el
 */
const setBlockElem = (el) => {
  el.disabled = true;
};
/**
 * Сннятие блокировки
 * @param {HTMLElement} el
 */
const setUnBlockElem = (el) => {
  el.disabled = false;
};
/**
 * Установка дефолтных стилей/удаление стилей об ошибке
 * @param {HTMLElement} el
 * @param {Boolean} bool
 */
const setDefaulStyle = (el, bool = true) => {
  el.style[bool ? `border` : `backgroundColor`] = ``;
  el.classList.remove(`shake`);
};
/**
 * Установка стилей при ошибке
 * @param {HTMLElement} el
 * @param {Boolean} bool
 */
const setErrorStyle = (el, bool = true) => {
  el.style[bool ? `border` : `backgroundColor`] = `${bool ? `5px solid red` : `red`}`;
  el.classList.add(`shake`);
};
/**
 * Делает копию данных, для показа их по 5 штук или меньше
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
 * Устанавливает ранк пользователя
 * @param {HTMLElement} el
 * @param {Array} arr
 */
const setRankUser = (el, arr) => {
  const RankType = {
    NOVICE: {
      TEXT: `Novice`,
      START_RANK: 1,
      END_RANK: 10
    },
    FAN: {
      TEXT: `Fan`,
      START_RANK: 11,
      END_RANK: 20
    },
    MOVIE_BUF: {
      TEXT: `Movie buff`,
      START_RANK: 21,
    },
  };
  const length = arr.length;
  let rank = ``;

  if (length > RankType.NOVICE.START_RANK && length <= RankType.NOVICE.END_RANK) {
    rank = RankType.NOVICE.TEXT;
  } else if (length > RankType.FAN.START_RANK && length <= RankType.FAN.END_RANK) {
    rank = RankType.FAN.TEXT;
  } else if (length > RankType.MOVIE_BUF.START_RANK) {
    rank = RankType.MOVIE_BUF.TEXT;
  }

  el.innerHTML = `<p class="profile__rating">${rank}</p>`;
};
/**
 * Записывает количество отфильтрованых значений в навигации
 * @param {HTMLElement} el
 * @param {Array} arr
 */
const recordNumberOfFilterValues = (el, arr) => {
  const itemCounts = el.querySelectorAll(`.main-navigation__item-count`);

  Array.from(itemCounts).forEach((itemCount) => {
    const filterNameParent = itemCount.parentElement.getAttribute(`href`);
    itemCount.textContent = filterFilms(filterNameParent, arr).length;
  });
};
/**
 * Фильтрация фильмов по параметру filterName для статистики
 * @param {String} filterName
 * @param {Array} initialFilms
 * @return {Array}
 */
const filterFilmsForStatictic = (filterName, initialFilms) => {
  switch (filterName) {
    case `all-time`:
      return calculateStat(initialFilms);

    case `today`:
      const today = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
      const filmsToday = initialFilms.filter((film) => {
        const filmWatchDate = film.watchingDate;
        const filmDay = `${new Date(filmWatchDate).getFullYear()}${new Date(filmWatchDate).getMonth()}${new Date(filmWatchDate).getDate()}`;
        return filmDay === today;
      });
      return calculateStat(filmsToday);

    case `week`:
      const daysInWeek = 7;
      const startWeek = +new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - daysInWeek);
      const filmsWeek = initialFilms.filter((film) => +new Date(film.watchingDate) >= startWeek);
      return calculateStat(filmsWeek);

    case `month`:
      const todayMonthAndYear = `${new Date().getFullYear()}${new Date().getMonth()}`;
      const filmsMonth = initialFilms.filter((film) => {
        const filmWatchDate = film.watchingDate;
        const filmMonthAndYear = `${new Date(filmWatchDate).getFullYear()}${new Date(filmWatchDate).getMonth()}`;
        return filmMonthAndYear === todayMonthAndYear;
      });
      return calculateStat(filmsMonth);

    case `year`:
      const todayYear = new Date().getFullYear();
      const filmsYear = initialFilms.filter((film) => new Date(film.watchingDate).getFullYear() === todayYear);
      return calculateStat(filmsYear);

    default:
      return calculateStat(initialFilms);
  }
};

export {
  clearChildEl,
  renderFilters,
  createElement,
  filterFilmsForStatictic,
  deleteEl,
  renderTempate,
  filterFilms,
  updateFilmData,
  setBlockElem,
  setUnBlockElem,
  setDefaulStyle,
  setErrorStyle,
  sliceForShowMovies,
  setRankUser,
  recordNumberOfFilterValues
};
