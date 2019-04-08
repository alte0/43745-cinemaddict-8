import {
  renderFilters,
  clearChildEl,
  filterFilmsForStatictic,
  filterFilms,
  updateFilmData,
  setBlockElem,
  setUnBlockElem,
  setDefaulStyle,
  setErrorStyle,
  sliceForShowMovies,
  setRankUser,
  recordNumberOfFilterValues
} from "./modules/util";
import {navFilters} from "./modules/data";
import Card from "./clases/card";
import CardExtra from "./clases/card-extra";
import PopupCard from "./clases/popup-card";
import Filter from "./clases/component-filter";
import {getStaticCtx} from "./modules/statistic";
import {renderStatList} from "./modules/make-stat-list";
import {renderStatRankLabel} from "./modules/make-stat-rank-label";
import {API} from "./clases/api";
import {Provider} from "./clases/provider";
import {Store} from "./clases/store";
import {showMessage, TypeMessage} from "./modules/show-user-message";
import Search from "./clases/search";


const AUTHORIZATION = `Basic eo0w590ik29889a=Alte0=test7`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;
const FILMS_STORE_KEY = `films-store-key-dev`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const store = new Store({key: FILMS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store});

const Text = {
  LOADING: `Loading movies...`,
  ERORR: `Something went wrong while loading movies. Check your connection or try again later`,
  WATCH: `Added to watch list!`,
  VIEWED: `Added to viewed!`,
  FAVORITES: `Added to favorites!`,
  REMOVE_FAVORITES: `Removed from favorites!`,
  ALREADY_IN_LIST: `Already in the list!`,
  ALREADY_VIEWED: `Already viewed!`,
};
const COUNT_START_SHOW_MOVIES = 0;
const COUNT_END_SHOW_MOVIES = 5;
const COUNT_END_SHOW_MOVIES_EXTRA = 2;
const FILTER_NAME_TOP_RATED = `Most rated`;
const FILTER_NAME_TOP_COMMENTED = `Most commented`;
const INCREMENT_CARD = 5;
const FILTER_NAME_WATCHED = `#history`;

const body = document.body;
const mainNav = body.querySelector(`.main-navigation`);
const films = body.querySelector(`.films`);
const filmsCardsContainer = films.querySelector(`.films-list .films-list__container`);
const filmsCardsContainerExtras = films.querySelectorAll(`.films-list--extra`);
const filmsCardsContainerExtraTop = filmsCardsContainerExtras[0].querySelector(`.films-list__container`);
const filmsCardsContainerExtraMost = filmsCardsContainerExtras[1].querySelector(`.films-list__container`);
const btnShowMore = films.querySelector(`.films-list__show-more`);
const statistic = body.querySelector(`.statistic`);
const statisticFilters = statistic.querySelector(`.statistic__filters`);
const statisticRank = statistic.querySelector(`.statistic__rank`);
const statisticList = statistic.querySelector(`.statistic__text-list`);
const statisticCtx = statistic.querySelector(`.statistic__chart`);
const footerStat = body.querySelector(`.footer__statistics`);
const profile = body.querySelector(`.profile`);
let countEndNextShowMovies = 5;
let initialMovies;
let filterName;
/**
 * Отрисовка карточек с фильмами
 * @param {Array} arr
 * @param {HTMLElement} el
 * @param {Function} ClsCard
 * @param {Function} ClsPopup
 */
const renderCards = (arr, el, ClsCard, ClsPopup) => {

  for (const dataCard of arr) {
    const cardComponent = new ClsCard(dataCard);
    const popupCardComponent = new ClsPopup(dataCard);

    cardComponent.open = () => {
      if (!body.querySelector(`.film-details`)) {
        body.appendChild(popupCardComponent.render());
      }
    };

    cardComponent.onAddToWatchList = (boolValue) => {
      if (dataCard.isWatchlist) {
        showMessage(TypeMessage.INFO, Text.ALREADY_IN_LIST);
      } else {
        dataCard.isWatchlist = boolValue;
        provider.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
          .then((dataMovie) => {
            popupCardComponent.update(dataMovie);
            recordNumberOfFilterValues(mainNav, initialMovies);
            showMessage(TypeMessage.SUCCESS, Text.WATCH);
          });
      }
    };

    cardComponent.onMarkAsWatched = (boolValue) => {
      if (dataCard.isWatched) {
        showMessage(TypeMessage.INFO, Text.ALREADY_VIEWED);
      } else {
        dataCard.isWatched = boolValue;
        dataCard.watchingDate = +new Date();
        provider.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
          .then((dataMovie) => {
            popupCardComponent.update(dataMovie);
            recordNumberOfFilterValues(mainNav, initialMovies);
            showMessage(TypeMessage.SUCCESS, Text.VIEWED);
            const filmsWatched = filterFilms(FILTER_NAME_WATCHED, initialMovies);
            setRankUser(profile, filmsWatched);
          });
      }
    };

    cardComponent.onFavorite = (boolValue) => {
      dataCard.isFavorite = boolValue;
      provider.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
        .then((dataMovie) => {
          popupCardComponent.update(dataMovie);
          recordNumberOfFilterValues(mainNav, initialMovies);
          if (dataMovie.isFavorite) {
            showMessage(TypeMessage.SUCCESS, Text.FAVORITES);
          } else {
            showMessage(TypeMessage.SUCCESS, Text.REMOVE_FAVORITES);
          }
        });
    };

    popupCardComponent.close = () => {
      popupCardComponent.unrender();
    };

    popupCardComponent.onTextareaKeyDown = (newData) => {
      const textArea = body.querySelector(`.film-details__comment-input`);
      const userRatingControls = body.querySelector(`.film-details__user-rating-controls`);
      const newDataMovie = updateFilmData(arr, dataCard, newData);

      provider.updateMovie({id: newDataMovie.id, data: newDataMovie.toRAW()})
        .then((dataMovie) => {
          userRatingControls.classList.remove(`visually-hidden`);
          cardComponent.update(dataMovie);
          cardComponent.partialUpdate();
          cardComponent.unbind();
          cardComponent.bind();

          popupCardComponent.update(dataMovie);
          popupCardComponent.partialUpdateComments();
          popupCardComponent.setStatusCommentAdd();
          popupCardComponent.unbind();
          popupCardComponent.bind();

          textArea.value = ``;
          setUnBlockElem(textArea);
          clearChildEl(filmsCardsContainerExtraMost);
          const filterFilmsTopComment = filterFilms(FILTER_NAME_TOP_COMMENTED, initialMovies);
          renderCards(sliceForShowMovies(filterFilmsTopComment, COUNT_START_SHOW_MOVIES, COUNT_END_SHOW_MOVIES_EXTRA), filmsCardsContainerExtraMost, CardExtra, PopupCard);
        })
        .catch(() => {
          setErrorStyle(textArea.parentElement);
          setUnBlockElem(textArea);
        });
    };

    popupCardComponent.onRadioRatingChange = (newData, evt) => {
      const target = evt.target;
      const ratingInputs = evt.target.parentElement.querySelectorAll(`[name="score"]`);
      const ratingLabels = evt.target.parentElement.querySelectorAll(`.film-details__user-rating-label`);
      const nextEl = target.nextElementSibling;

      ratingLabels.forEach((elem) => {
        setDefaulStyle(elem, false);
      });
      ratingInputs.forEach((elem) => {
        setBlockElem(elem);
      });

      const newDataMovie = updateFilmData(arr, dataCard, newData);

      provider.updateMovie({id: newDataMovie.id, data: newDataMovie.toRAW()})
      .then((dataMovie) => {
        cardComponent.update(dataMovie);

        popupCardComponent.update(dataMovie);
        popupCardComponent.partialUpdateRating();

        ratingInputs.forEach((elem) => {
          setUnBlockElem(elem);
        });
      })
        .catch(() => {
          setErrorStyle(nextEl, false);
          ratingInputs.forEach((elem) => {
            setUnBlockElem(elem);
          });
        });
    };

    popupCardComponent.addWatchlist = (newData) => {
      const newDataMovie = updateFilmData(arr, dataCard, newData);

      provider.updateMovie({id: newDataMovie.id, data: newDataMovie.toRAW()})
        .then((dataMovie) => {
          cardComponent.update(dataMovie);
          popupCardComponent.update(dataMovie);
          recordNumberOfFilterValues(mainNav, initialMovies);
        });
    };

    popupCardComponent.addWatched = (newData) => {
      if (newData.isWatched) {
        Object.assign(newData, {watchingDate: +new Date()});
      } else {
        Object.assign(newData, {watchingDate: null});
      }

      const newDataMovie = updateFilmData(arr, dataCard, newData);

      provider.updateMovie({id: newDataMovie.id, data: newDataMovie.toRAW()})
        .then((dataMovie) => {
          cardComponent.update(dataMovie);
          popupCardComponent.update(dataMovie);
          recordNumberOfFilterValues(mainNav, initialMovies);
        });
    };

    popupCardComponent.toggleFavorites = (newData) => {
      const newDataMovie = updateFilmData(arr, dataCard, newData);

      provider.updateMovie({id: newDataMovie.id, data: newDataMovie.toRAW()})
        .then((dataMovie) => {
          cardComponent.update(dataMovie);
          popupCardComponent.update(dataMovie);
          recordNumberOfFilterValues(mainNav, initialMovies);
          if (dataMovie.isFavorite) {
            showMessage(TypeMessage.SUCCESS, Text.FAVORITES);
          } else {
            showMessage(TypeMessage.SUCCESS, Text.REMOVE_FAVORITES);
          }
        });
    };

    popupCardComponent.onButtonUndoCommentClick = (newData) => {
      const newDataMovie = updateFilmData(arr, dataCard, newData);

      provider.updateMovie({id: newDataMovie.id, data: newDataMovie.toRAW()})
        .then((dataMovie) => {
          cardComponent.update(dataMovie);
          cardComponent.partialUpdate();
          cardComponent.unbind();
          cardComponent.bind();

          popupCardComponent.update(dataMovie);
          popupCardComponent.partialUpdateComments();
          clearChildEl(filmsCardsContainerExtraMost);
          const newMoviesTopComments = filterFilms(FILTER_NAME_TOP_COMMENTED, initialMovies);
          renderCards(sliceForShowMovies(newMoviesTopComments, COUNT_START_SHOW_MOVIES, COUNT_END_SHOW_MOVIES_EXTRA), filmsCardsContainerExtraMost, CardExtra, PopupCard);
        });
    };

    el.appendChild(cardComponent.render());
  }
};
/**
 * Функция определяюшая что показывать в <main>
 * @param {Event} evt
 */
const onNavLinkClick = (evt) => {
  const target = evt.target;
  const targetTagName = target.tagName;

  if (targetTagName === `A` && !target.classList.contains(`main-navigation__item--active`)) {
    const navItems = body.querySelectorAll(`.main-navigation__item`);
    filterName = target.getAttribute(`href`);
    countEndNextShowMovies = 5;

    for (const navItem of navItems) {
      navItem.classList.remove(`main-navigation__item--active`);
    }

    target.classList.add(`main-navigation__item--active`);
    clearChildEl(filmsCardsContainer);

    if (filterName === `#stats`) {
      films.classList.add(`visually-hidden`);
      statistic.classList.remove(`visually-hidden`);
    } else {
      statistic.classList.add(`visually-hidden`);
      films.classList.remove(`visually-hidden`);
      const filteredMovie = filterFilms(filterName, initialMovies);

      if (filteredMovie.length <= COUNT_END_SHOW_MOVIES) {
        btnShowMore.style = `display: none`;
      } else {
        btnShowMore.style = ``;
      }

      renderCards(sliceForShowMovies(filteredMovie, COUNT_START_SHOW_MOVIES, COUNT_END_SHOW_MOVIES), filmsCardsContainer, Card, PopupCard);
    }
  }

  if ((targetTagName === `A` && target.classList.contains(`main-navigation__item--additional`))) {
    const filterNameStat = Array.from(new FormData(statisticFilters).entries())[0][1];
    clearChildEl(statisticList);
    clearChildEl(statisticRank);
    const statData = filterFilmsForStatictic(filterNameStat, initialMovies);
    renderStatRankLabel(statData, statisticRank);
    renderStatList(statData, statisticList);
    getStaticCtx(statisticCtx, statData);
  }
};
/**
 * Кнопка Show more показываюшая еще след||до 5 карточек с фильмами.
 * @param {Event} evt
 */
const onButtonMoreClick = (evt) => {
  const currentMovies = filterFilms(filterName, initialMovies);
  const doNeedDrawData = () => countEndNextShowMovies >= currentMovies.length;

  if (!doNeedDrawData()) {
    renderCards(sliceForShowMovies(currentMovies, countEndNextShowMovies, countEndNextShowMovies = countEndNextShowMovies + INCREMENT_CARD), filmsCardsContainer, Card, PopupCard);

    if (doNeedDrawData()) {
      evt.target.style = `display: none`;
    }
  }
};

const onInputSearchInput = (evt) => {
  const textSearch = evt.target.value;
  statistic.classList.add(`visually-hidden`);
  films.classList.remove(`visually-hidden`);
  clearChildEl(filmsCardsContainer);

  if (textSearch === ``) {
    renderCards(sliceForShowMovies(initialMovies, COUNT_START_SHOW_MOVIES, COUNT_END_SHOW_MOVIES), filmsCardsContainer, Card, PopupCard);
    btnShowMore.style = ``;
    body.querySelector(`.main-navigation__item`).classList.add(`main-navigation__item--active`);
    filterName = `#all`;
  } else {
    if (body.querySelector(`.main-navigation__item--active`)) {
      const navItems = body.querySelectorAll(`.main-navigation__item`);
      btnShowMore.style = `display: none`;

      for (const navItem of navItems) {
        navItem.classList.remove(`main-navigation__item--active`);
      }
    }

    const filteredMovies = filterFilms(`searchTitle`, initialMovies, textSearch);
    renderCards(filteredMovies, filmsCardsContainer, Card, PopupCard);
  }
};

const searchField = new Search();
searchField.search = onInputSearchInput;
profile.parentElement.insertBefore(searchField.render(), profile);

provider.getMovies()
  .then((dataFilms) => {
    initialMovies = dataFilms;
    const fiteredTopRatedFilms = filterFilms(FILTER_NAME_TOP_RATED, initialMovies);
    const fiteredTopCommentsFilms = filterFilms(FILTER_NAME_TOP_COMMENTED, initialMovies);

    clearChildEl(filmsCardsContainer);
    showMessage(TypeMessage.INFO, Text.LOADING);
    footerStat.innerHTML = `<p>${initialMovies.length} movies inside</p>`;
    setRankUser(profile, filterFilms(FILTER_NAME_WATCHED, initialMovies));

    renderFilters(navFilters, mainNav, Filter, onNavLinkClick);
    renderCards(sliceForShowMovies(initialMovies, COUNT_START_SHOW_MOVIES, COUNT_END_SHOW_MOVIES), filmsCardsContainer, Card, PopupCard);
    renderCards(sliceForShowMovies(fiteredTopRatedFilms, COUNT_START_SHOW_MOVIES, COUNT_END_SHOW_MOVIES_EXTRA), filmsCardsContainerExtraTop, CardExtra, PopupCard);
    renderCards(sliceForShowMovies(fiteredTopCommentsFilms, COUNT_START_SHOW_MOVIES, COUNT_END_SHOW_MOVIES_EXTRA), filmsCardsContainerExtraMost, CardExtra, PopupCard);
    recordNumberOfFilterValues(mainNav, initialMovies);
  })
  .catch((err) => {
    showMessage(TypeMessage.ERROR, Text.ERORR);
    throw err;
  });

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncMovies();
});
btnShowMore.addEventListener(`click`, onButtonMoreClick);

statisticFilters.addEventListener(`change`, (evt) => {
  clearChildEl(statisticList);
  clearChildEl(statisticRank);
  const statData = filterFilmsForStatictic(evt.target.value, initialMovies);
  renderStatRankLabel(statData, statisticRank);
  renderStatList(statData, statisticList);
  getStaticCtx(statisticCtx, statData);
});
