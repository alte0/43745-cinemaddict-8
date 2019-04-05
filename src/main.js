import {
  renderFilters,
  clearChildEl,
  calculateStat,
  filterFilms,
  updateFilmData,
  setDefaulStyle,
  setBlockElem,
  setUnBlockElem,
  setErrorStyle,
  sliceForShowMovies,
  setRankUser,
  recordNumberOfFilterValues
} from "./modules/util";
import {filters} from "./modules/data";
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

const AUTHORIZATION = `Basic eo0w590ik29889a=Alte0=test3`;
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
  REMOVE_FAVORITES: `Removed from favorites!`
};
const COUNT_START_SHOW_MOVIES = 0;
const COUNT_END_SHOW_MOVIES = 5;
const COUNT_END_SHOW_MOVIES_EXTRA = 2;
const FILTER_NAME_TOP_RATED = `Most rated`;
const FILTER_NAME_TOP_COMMENTED = `Most commented`;

const body = document.body;
const searchForm = body.querySelector(`.search`);
const searchField = body.querySelector(`.search__field`);
const mainNav = body.querySelector(`.main-navigation`);
const films = body.querySelector(`.films`);
const btnShowMore = films.querySelector(`.films-list__show-more`);
const statistic = body.querySelector(`.statistic`);
const statisticRank = body.querySelector(`.statistic__rank`);
const statisticList = body.querySelector(`.statistic__text-list`);
const statisticCtx = body.querySelector(`.statistic__chart`);
const filmsCardsContainer = body.querySelector(`.films .films-list .films-list__container`);
const filmsCardsContainerExtras = body.querySelectorAll(`.films .films-list--extra`);
const filmsCardsContainerExtraTop = filmsCardsContainerExtras[0].querySelector(`.films-list__container`);
const filmsCardsContainerExtraMost = filmsCardsContainerExtras[1].querySelector(`.films-list__container`);
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
        popupCardComponent.render(body);
      }
    };

    cardComponent.onAddToWatchList = (boolValue) => {
      dataCard.isWatchlist = boolValue;
      provider.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
        .then((newDataMovie) => {
          popupCardComponent.update(newDataMovie);
          recordNumberOfFilterValues(mainNav, initialMovies);
          showMessage(TypeMessage.SUCCESS, Text.WATCH);
        });
    };

    cardComponent.onMarkAsWatched = (boolValue) => {
      dataCard.isWatched = boolValue;
      provider.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
        .then((newDataMovie) => {
          popupCardComponent.update(newDataMovie);
          recordNumberOfFilterValues(mainNav, initialMovies);
          showMessage(TypeMessage.SUCCESS, Text.VIEWED);
        });
    };

    cardComponent.onFavorite = (boolValue) => {
      dataCard.isFavorite = boolValue;
      provider.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
        .then((newDataMovie) => {
          popupCardComponent.update(newDataMovie);
          recordNumberOfFilterValues(mainNav, initialMovies);
          if (dataCard.isFavorite) {
            showMessage(TypeMessage.SUCCESS, Text.FAVORITES);
          } else {
            showMessage(TypeMessage.SUCCESS, Text.REMOVE_FAVORITES);
          }
        });
    };

    popupCardComponent.close = function () {
      this.unbind();
      this._element.remove();
      this._element = null;
    };

    popupCardComponent.onTextareaKeyDown = (newObject) => {
      const textArea = body.querySelector(`.film-details__comment-input`);
      const userRatingControls = body.querySelector(`.film-details__user-rating-controls`);
      const newDataCard = updateFilmData(arr, dataCard, newObject);

      provider.updateMovie({id: newDataCard.id, data: newDataCard.toRAW()})
        .then((newDataMovie) => {
          userRatingControls.classList.remove(`visually-hidden`);
          cardComponent.update(newDataMovie);
          cardComponent.partialUpdate();
          cardComponent.unbind();
          cardComponent.bind();

          popupCardComponent.update(newDataMovie);
          popupCardComponent.partialUpdateComments();

          textArea.value = ``;
          setUnBlockElem(textArea);
          clearChildEl(filmsCardsContainerExtraMost);
          renderCards(sliceForShowMovies(filterFilms(FILTER_NAME_TOP_COMMENTED, initialMovies), COUNT_START_SHOW_MOVIES, COUNT_END_SHOW_MOVIES_EXTRA), filmsCardsContainerExtraMost, CardExtra, PopupCard);
        })
        .catch(() => {
          setErrorStyle(textArea.parentElement);
          setUnBlockElem(textArea);
        });
    };

    popupCardComponent.onRadioRatingChange = (newObject, evt) => {
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

      const newDataCard = updateFilmData(arr, dataCard, newObject);

      provider.updateMovie({id: newDataCard.id, data: newDataCard.toRAW()})
      .then((newDataMovie) => {
        cardComponent.update(newDataMovie);

        popupCardComponent.update(newDataMovie);
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

    popupCardComponent.onCheckboxControlClick = (newObject) => {
      const newDataCard = updateFilmData(arr, dataCard, newObject);

      provider.updateMovie({id: newDataCard.id, data: newDataCard.toRAW()})
        .then((newDataMovie) => {
          cardComponent.update(newDataMovie);
          popupCardComponent.update(newDataMovie);
          popupCardComponent.partialUpdateStatus();
          recordNumberOfFilterValues(mainNav, initialMovies);
        });
    };

    popupCardComponent.onButtonUndoCommentClick = (newObject) => {
      const newDataCard = updateFilmData(arr, dataCard, newObject);

      provider.updateMovie({id: newDataCard.id, data: newDataCard.toRAW()})
        .then((newDataMovie) => {
          cardComponent.update(newDataMovie);
          cardComponent.partialUpdate();
          cardComponent.unbind();
          cardComponent.bind();

          popupCardComponent.update(newDataMovie);
          popupCardComponent.partialUpdateComments();
          renderCards(sliceForShowMovies(filterFilms(FILTER_NAME_TOP_COMMENTED, initialMovies), COUNT_START_SHOW_MOVIES, COUNT_END_SHOW_MOVIES_EXTRA), filmsCardsContainerExtraMost, CardExtra, PopupCard);
        });
    };

    el.appendChild(cardComponent.render());
  }
};

const filterCardsFilms = (evt) => {
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
    const statData = calculateStat(initialMovies);
    clearChildEl(statisticList);
    clearChildEl(statisticRank);
    renderStatRankLabel(statData, statisticRank);
    renderStatList(statData, statisticList);
    getStaticCtx(statisticCtx, statData);
  }
};

const onButtonMoreClick = (evt) => {
  const count = 5;
  const currentMovies = filterFilms(filterName, initialMovies);
  const doNeedDrawData = () => countEndNextShowMovies >= currentMovies.length;

  if (!doNeedDrawData()) {
    renderCards(sliceForShowMovies(currentMovies, countEndNextShowMovies, countEndNextShowMovies = countEndNextShowMovies + count), filmsCardsContainer, Card, PopupCard);

    if (doNeedDrawData()) {
      evt.target.style = `display: none`;
    }
  }
};

const onInputSearchInput = (evt) => {
  const textSearch = evt.target.value;

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

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncTasks();
});
btnShowMore.addEventListener(`click`, onButtonMoreClick);
searchField.addEventListener(`input`, onInputSearchInput);
searchForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
});

provider.getMovies()
  .then((dataFilms) => {
    showMessage(TypeMessage.INFO, Text.LOADING);
    renderFilters(filters, mainNav, Filter, filterCardsFilms);
    clearChildEl(filmsCardsContainer);
    initialMovies = dataFilms;
    renderCards(sliceForShowMovies(initialMovies, COUNT_START_SHOW_MOVIES, COUNT_END_SHOW_MOVIES), filmsCardsContainer, Card, PopupCard);
    renderCards(sliceForShowMovies(filterFilms(FILTER_NAME_TOP_RATED, initialMovies), COUNT_START_SHOW_MOVIES, COUNT_END_SHOW_MOVIES_EXTRA), filmsCardsContainerExtraTop, CardExtra, PopupCard);
    renderCards(sliceForShowMovies(filterFilms(FILTER_NAME_TOP_COMMENTED, initialMovies), COUNT_START_SHOW_MOVIES, COUNT_END_SHOW_MOVIES_EXTRA), filmsCardsContainerExtraMost, CardExtra, PopupCard);
    recordNumberOfFilterValues(mainNav, initialMovies);
    footerStat.innerHTML = `<p>${initialMovies.length} movies inside</p>`;
    setRankUser(profile, initialMovies);
  })
  .catch((err) => {
    clearChildEl(filmsCardsContainer);
    showMessage(TypeMessage.ERROR, Text.ERORR);
    throw err;
  });

