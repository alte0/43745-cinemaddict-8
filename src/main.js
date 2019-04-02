import {
  renderFilters,
  clearChildEl,
  calculateStat,
  filterFilms,
  recordText,
  updateFilmData,
  setDefaulStyle,
  setBlockElem,
  setUnBlockElem,
  setErrorStyle,
  sliceForShowMovies
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
import {Provider} from "./clases/provider";
import {Store} from "./clases/store";
import {showInfoMessage} from "./modules/showUserMessage";

const AUTHORIZATION = `Basic eo0w590ik29889a=Alte0=test2`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;
const FILMS_STORE_KEY = `films-store-key-dev`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const store = new Store({key: FILMS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store});

const LoadingMoviesText = `Loading movies...`;
const LoadingMoviesErorText = `Something went wrong while loading movies. Check your connection or try again later`;
const countStartShowMovies = 0;
const countEndShowMovies = 5;
const countEndShowMoviesExtra = 2;
const body = document.body;
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
const filterNameTopRated = `Most rated`;
const filterNameTopCommented = `Most commented`;
let initialCardsFilms;
let countEndNextShowMovies;

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
      provider.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
        .then((newFilm) => {
          popupCardComponent.update(newFilm);
          recordCountForFilters(mainNav, initialCardsFilms);
          showInfoMessage(`Added to watch list!`);
        });
    };
    cardComponent.onMarkAsWatched = (bool) => {
      dataCard.isWatched = bool;
      provider.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
        .then((newFilm) => {
          popupCardComponent.update(newFilm);
          recordCountForFilters(mainNav, initialCardsFilms);
          showInfoMessage(`Added to viewed!`);
        });
    };
    cardComponent.onFavorite = (bool) => {
      dataCard.isFavorite = bool;
      provider.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
        .then((newFilm) => {
          popupCardComponent.update(newFilm);
          recordCountForFilters(mainNav, initialCardsFilms);
          if (dataCard.isFavorite) {
            showInfoMessage(`Added to favorites!`);
          } else {
            showInfoMessage(`Removed from favorites!`);
          }
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

      provider.updateMovie({id: newDataCard.id, data: newDataCard.toRAW()})
        .then((newDataFim) => {
          cardComponent.update(newDataFim);
          cardComponent.partialUpdate();
          cardComponent.unbind();
          cardComponent.bind();

          popupCardComponent.update(newDataFim);
          popupCardComponent.partialUpdateComments();

          textArea.value = ``;
          setUnBlockElem(textArea);
          clearChildEl(filmsCardsContainerExtraMost);
          renderCards(filterFilms(filterNameTopCommented, initialCardsFilms).splice(0, 2), filmsCardsContainerExtraMost, CardExtra, PopupCard);
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

    popupCardComponent.onCheckboxControlClick = (newObject) => {
      const newDataCard = updateFilmData(arr, dataCard, newObject);

      provider.updateMovie({id: newDataCard.id, data: newDataCard.toRAW()})
        .then((newDataFim) => {
          cardComponent.update(newDataFim);
          popupCardComponent.update(newDataFim);
          recordCountForFilters(mainNav, initialCardsFilms);
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
const onButtonClick = (evt) => {
  const count = 5;
  const isConditionEnd = () => countEndNextShowMovies >= initialCardsFilms.length;

  if (countEndNextShowMovies === undefined) {
    countEndNextShowMovies = countEndShowMovies;
  }

  if (!isConditionEnd()) {
    renderCards(sliceForShowMovies(initialCardsFilms, countEndNextShowMovies, countEndNextShowMovies = countEndNextShowMovies + count), filmsCardsContainer, Card, PopupCard);

    if (isConditionEnd()) {
      evt.target.style = `display: none`;
    }
  }
};

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncTasks();
});

recordText(filmsCardsContainer, LoadingMoviesText);
provider.getMovies()
  .then((dataFilms) => {
    renderFilters(filters, mainNav, Filter, filterCardsFilms);
    clearChildEl(filmsCardsContainer);
    initialCardsFilms = dataFilms;
    renderCards(sliceForShowMovies(initialCardsFilms, countStartShowMovies, countEndShowMovies), filmsCardsContainer, Card, PopupCard);
    renderCards(sliceForShowMovies(filterFilms(filterNameTopRated, initialCardsFilms), countStartShowMovies, countEndShowMoviesExtra), filmsCardsContainerExtraTop, CardExtra, PopupCard);
    renderCards(sliceForShowMovies(filterFilms(filterNameTopCommented, initialCardsFilms), countStartShowMovies, countEndShowMoviesExtra), filmsCardsContainerExtraMost, CardExtra, PopupCard);
    recordCountForFilters(mainNav, initialCardsFilms);
  })
  .catch((err) => {
    clearChildEl(filmsCardsContainer);
    recordText(filmsCardsContainer, LoadingMoviesErorText);
    // eslint-disable-next-line no-console
    console.error(`fetch error: ${err}`);
    throw err;
  });

btnShowMore.addEventListener(`click`, onButtonClick);
