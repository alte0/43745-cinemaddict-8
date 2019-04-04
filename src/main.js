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
  setRankUser
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
import {showInfoMessage, TypeMessage} from "./modules/showUserMessage";

const AUTHORIZATION = `Basic eo0w590ik29889a=Alte0=test3`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle`;
const FILMS_STORE_KEY = `films-store-key-dev`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const store = new Store({key: FILMS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store});

const loadingMoviesText = `Loading movies...`;
const loadingMoviesErorText = `Something went wrong while loading movies. Check your connection or try again later`;
const addToWatchListText = `Added to watch list!`;
const addToViewedText = `Added to viewed!`;
const addToFavoritesText = `Added to favorites!`;
const removeFavoritesText = `Removed from favorites!`;
const countStartShowMovies = 0;
const countEndShowMovies = 5;
const countEndShowMoviesExtra = 2;
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
const filterNameTopRated = `Most rated`;
const filterNameTopCommented = `Most commented`;
let countEndNextShowMovies = 5;
let initialMovies;
let filterName;

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
          recordCountForFilters(mainNav, initialMovies);
          showInfoMessage(TypeMessage.SUCCESS, addToWatchListText);
        });
    };
    cardComponent.onMarkAsWatched = (bool) => {
      dataCard.isWatched = bool;
      provider.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
        .then((newFilm) => {
          popupCardComponent.update(newFilm);
          recordCountForFilters(mainNav, initialMovies);
          showInfoMessage(TypeMessage.SUCCESS, addToViewedText);
        });
    };
    cardComponent.onFavorite = (bool) => {
      dataCard.isFavorite = bool;
      provider.updateMovie({id: dataCard.id, data: dataCard.toRAW()})
        .then((newFilm) => {
          popupCardComponent.update(newFilm);
          recordCountForFilters(mainNav, initialMovies);
          if (dataCard.isFavorite) {
            showInfoMessage(TypeMessage.SUCCESS, addToFavoritesText);
          } else {
            showInfoMessage(TypeMessage.SUCCESS, removeFavoritesText);
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
      const userRatingControls = body.querySelector(`.film-details__user-rating-controls`);
      const newDataCard = updateFilmData(arr, dataCard, newObject);

      provider.updateMovie({id: newDataCard.id, data: newDataCard.toRAW()})
        .then((newDataFim) => {
          userRatingControls.classList.remove(`visually-hidden`);
          cardComponent.update(newDataFim);
          cardComponent.partialUpdate();
          cardComponent.unbind();
          cardComponent.bind();

          popupCardComponent.update(newDataFim);
          popupCardComponent.partialUpdateComments();

          textArea.value = ``;
          setUnBlockElem(textArea);
          clearChildEl(filmsCardsContainerExtraMost);
          renderCards(sliceForShowMovies(filterFilms(filterNameTopCommented, initialMovies), countStartShowMovies, countEndShowMoviesExtra), filmsCardsContainerExtraMost, CardExtra, PopupCard);
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
          popupCardComponent.partialUpdateStatus();
          recordCountForFilters(mainNav, initialMovies);
        });
    };

    popupCardComponent.onButtonUndoCommentClick = (newObject) => {
      const newDataCard = updateFilmData(arr, dataCard, newObject);

      provider.updateMovie({id: newDataCard.id, data: newDataCard.toRAW()})
        .then((newDataFim) => {
          cardComponent.update(newDataFim);
          cardComponent.partialUpdate();
          cardComponent.unbind();
          cardComponent.bind();

          popupCardComponent.update(newDataFim);
          popupCardComponent.partialUpdateComments();
          renderCards(sliceForShowMovies(filterFilms(filterNameTopCommented, initialMovies), countStartShowMovies, countEndShowMoviesExtra), filmsCardsContainerExtraMost, CardExtra, PopupCard);
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
    // const filterName = target.getAttribute(`href`);
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
      if (filteredMovie.length <= countEndShowMovies) {
        btnShowMore.style = `display: none`;
      } else {
        btnShowMore.style = ``;
      }
      renderCards(sliceForShowMovies(filteredMovie, countStartShowMovies, countEndShowMovies), filmsCardsContainer, Card, PopupCard);
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
/**
 * @param {HTMLElement} el
 * @param {Array} arr
 */
const recordCountForFilters = (el, arr) => {
  const itemCounts = el.querySelectorAll(`.main-navigation__item-count`);

  Array.from(itemCounts).forEach((itemCount) => {
    const filterNameParent = itemCount.parentElement.getAttribute(`href`);
    itemCount.textContent = filterFilms(filterNameParent, arr).length;
  });
};

const onButtonClick = (evt) => {
  const count = 5;
  const currentMovies = filterFilms(filterName, initialMovies);
  const isConditionEnd = () => countEndNextShowMovies >= currentMovies.length;

  if (!isConditionEnd()) {
    renderCards(sliceForShowMovies(currentMovies, countEndNextShowMovies, countEndNextShowMovies = countEndNextShowMovies + count), filmsCardsContainer, Card, PopupCard);

    if (isConditionEnd()) {
      evt.target.style = `display: none`;
    }
  }
};

const onInputSearchInput = (evt) => {
  const textSearch = evt.target.value;

  clearChildEl(filmsCardsContainer);

  if (textSearch === ``) {
    renderCards(sliceForShowMovies(initialMovies, countStartShowMovies, countEndShowMovies), filmsCardsContainer, Card, PopupCard);
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
btnShowMore.addEventListener(`click`, onButtonClick);
searchField.addEventListener(`input`, onInputSearchInput);
searchForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
});

provider.getMovies()
.then((dataFilms) => {
  showInfoMessage(TypeMessage.INFO, loadingMoviesText);
  renderFilters(filters, mainNav, Filter, filterCardsFilms);
  clearChildEl(filmsCardsContainer);
  initialMovies = dataFilms;
  renderCards(sliceForShowMovies(initialMovies, countStartShowMovies, countEndShowMovies), filmsCardsContainer, Card, PopupCard);
  renderCards(sliceForShowMovies(filterFilms(filterNameTopRated, initialMovies), countStartShowMovies, countEndShowMoviesExtra), filmsCardsContainerExtraTop, CardExtra, PopupCard);
  renderCards(sliceForShowMovies(filterFilms(filterNameTopCommented, initialMovies), countStartShowMovies, countEndShowMoviesExtra), filmsCardsContainerExtraMost, CardExtra, PopupCard);
  recordCountForFilters(mainNav, initialMovies);
  footerStat.innerHTML = `<p>${initialMovies.length} movies inside</p>`;
  setRankUser(profile, initialMovies);
})
  .catch((err) => {
    clearChildEl(filmsCardsContainer);
    showInfoMessage(TypeMessage.ERROR, loadingMoviesErorText);
    // eslint-disable-next-line no-console
    console.error(`fetch error: ${err}`);
    throw err;
  });

