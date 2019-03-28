import {
  // renderCards,
  renderFilters,
  // randomOrderInArrayAndSplice,
  clearChildEl,
  calculateStat,
  filterFilms,
  recordText,
  updateFilmData,
  setDefaulStyle,
  setBlockElem,
  setUnBlockElem,
  setErrorStyle
} from "./modules/util";
import {filters} from "./modules/data";
import Card from "./clases/card";
import CardExtra from "./clases/card-extra";
import PopupCard from "./clases/popup-card";
import Filter from "./clases/component-filter";
import getStaticCtx from "./modules/statistic";
import renderStatList from "./modules/make-stat-list";
import renderStatRankLabel from "./modules/make-stat-rank-label";
import {API} from "./clases/api";

const AUTHORIZATION = `Basic eo0w590ik29889a=Alte0=test2`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const LoadingMoviesText = `Loading movies...`;
const LoadingMoviesErorText = `Something went wrong while loading movies. Check your connection or try again later`;
const body = document.body;
const mainNav = body.querySelector(`.main-navigation`);
const films = body.querySelector(`.films`);
const statistic = body.querySelector(`.statistic`);
const statisticRank = body.querySelector(`.statistic__rank`);
const statisticList = body.querySelector(`.statistic__text-list`);
const statisticCtx = body.querySelector(`.statistic__chart`);
const filmsCardsContainer = body.querySelector(`.films .films-list .films-list__container`);
const filmsCardsContainerExtras = body.querySelectorAll(`.films .films-list--extra`);
const filmsCardsContainerExtraTop = filmsCardsContainerExtras[0].querySelector(`.films-list__container`);
const ffilmsCardsContainerExtraMost = filmsCardsContainerExtras[1].querySelector(`.films-list__container`);
const filterNameTopRated = `Most rated`;
const filterNameTopCommented = `Most commented`;
let initialCardsFilms;

/**
 * @param {Array} arr
 * @param {HTMLElement} el
 * @param {Function} ClsCard
 * @param {Function} ClsPopup
 */
const renderCards = (arr, el, ClsCard, ClsPopup) => {

  for (const dataCard of arr) {
    const cardComponent = new ClsCard(dataCard);
    const popupCardComponent = new ClsPopup(dataCard);

    cardComponent.popupOpen = () => {
      if (!body.querySelector(`.film-details`)) {
        popupCardComponent.render(body);
      }
    };
    cardComponent.onAddToWatchList = (bool) => {
      dataCard.isWatchlist = bool;
      api.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
        .then((newFilm) => {
          popupCardComponent.update(newFilm);
          recordCountForFilters(mainNav, initialCardsFilms);
        });
    };
    cardComponent.onMarkAsWatched = (bool) => {
      dataCard.isWatched = bool;
      api.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
        .then((newFilm) => {
          popupCardComponent.update(newFilm);
          recordCountForFilters(mainNav, initialCardsFilms);
        });
    };
    cardComponent.onFavorite = (bool) => {
      dataCard.isFavorite = bool;
      api.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
        .then((newFilm) => {
          popupCardComponent.update(newFilm);
          recordCountForFilters(mainNav, initialCardsFilms);
        });
    };

    popupCardComponent.closePopup = function () {
      this.unbind();
      this._element.remove();
      this._element = null;
    };

    popupCardComponent.onTextareaKeyDown = (newObject) => {
      const textArea = body.querySelector(`.film-details__comment-input`);
      const newDataCard = updateFilmData(arr, dataCard, newObject);

      api.updateMovie({id: newDataCard.id, data: newDataCard.toRAW()})
        .then((newDataFim) => {
          cardComponent.update(newDataFim);
          cardComponent.partialUpdate();
          cardComponent.unbind();
          cardComponent.bind();

          popupCardComponent.update(newDataFim);
          popupCardComponent.partialUpdateComments();

          textArea.value = ``;
          setUnBlockElem(textArea);
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

      api.updateMovie({id: newDataCard.id, data: newDataCard.toRAW()})
      .then((newDataFim) => {
        cardComponent.update(newDataFim);

        popupCardComponent.update(newDataFim);
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

    el.appendChild(cardComponent.render());
  }
};

/**
 * @param {Event} evt
 */
const filterCardsFilms = (evt) => {
  const target = evt.target;
  const targetTagName = target.tagName;

  if (targetTagName === `A` && !target.classList.contains(`main-navigation__item--active`)) {
    const navItems = body.querySelectorAll(`.main-navigation__item`);
    const filterName = target.getAttribute(`href`);

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
      renderCards(filterFilms(filterName, initialCardsFilms), filmsCardsContainer, Card, PopupCard);
    }
  }

  if ((targetTagName === `A` && target.classList.contains(`main-navigation__item--additional`))) {
    const statData = calculateStat(initialCardsFilms);
    clearChildEl(statisticList);
    clearChildEl(statisticRank);
    renderStatRankLabel(statData, statisticRank);
    renderStatList(statData, statisticList);
    getStaticCtx(statisticCtx, statData);
  }
};
/**
 * @param {HTMLElement} el
 * @param {Array} arr
 */
const recordCountForFilters = (el, arr) =>{
  const itemCounts = el.querySelectorAll(`.main-navigation__item-count`);

  Array.from(itemCounts).forEach((itemCount) => {
    const filterName = itemCount.parentElement.getAttribute(`href`);
    itemCount.textContent = filterFilms(filterName, arr).length;
  });
};

recordText(filmsCardsContainer, LoadingMoviesText);
api.getMovies()
  .then((dataFilms) => {
    renderFilters(filters, mainNav, Filter, filterCardsFilms);
    clearChildEl(filmsCardsContainer);
    initialCardsFilms = dataFilms;
    renderCards(initialCardsFilms, filmsCardsContainer, Card, PopupCard);
    renderCards(filterFilms(filterNameTopRated, initialCardsFilms).splice(0, 2), filmsCardsContainerExtraTop, CardExtra, PopupCard);
    renderCards(filterFilms(filterNameTopCommented, initialCardsFilms).splice(0, 2), ffilmsCardsContainerExtraMost, CardExtra, PopupCard);
    recordCountForFilters(mainNav, initialCardsFilms);
  })
  .catch((err) => {
    clearChildEl(filmsCardsContainer);
    recordText(filmsCardsContainer, LoadingMoviesErorText);
    // eslint-disable-next-line no-console
    console.error(`fetch error: ${err}`);
    throw err;
  });

