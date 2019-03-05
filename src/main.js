import {renderData, clearChildEl, randomOrderInArrayAndSplice} from './modules/util';
import getFilter from './modules/make-filter';
import getCard from './modules/make-card';
import getCardExtra from './modules/make-card-extra';
import {filters, cards} from './modules/data';

const IS_RENDER_CARDS_EXTRA = true;
const MAIN_NAV = document.querySelector(`.main-navigation`);
const FILMS_CARDS_CONTAINER = document.querySelector(`.films-list .films-list__container`);
const FILMS_CARDS_EXTRAS = document.querySelectorAll(`.films-list--extra`);
const FILMS_CARDS_EXTRA_TOP = FILMS_CARDS_EXTRAS[0].querySelector(`.films-list__container`);
const FILMS_CARDS_EXTRA_MOST = FILMS_CARDS_EXTRAS[1].querySelector(`.films-list__container`);

const renderFilters = renderData;
const renderCards = renderData;
const renderCardsExtra = renderData;

const navClickHandler = (evt) => {
  const target = evt.target;

  if (target.tagName === `A`) {
    const NAV_ITEMS = MAIN_NAV.querySelectorAll(`.main-navigation__item`);
    const href = target.getAttribute(`href`);

    for (const nav of NAV_ITEMS) {
      nav.classList.remove(`main-navigation__item--active`);
    }
    target.classList.add(`main-navigation__item--active`);
    clearChildEl(FILMS_CARDS_CONTAINER);

    if (href === `#all`) {
      renderCards(cards, FILMS_CARDS_CONTAINER, getCard);
    } else if (href === `#stats`) {
      return;
    } else {
      renderCards(randomOrderInArrayAndSplice(cards), FILMS_CARDS_CONTAINER, getCard);
    }
  } else {
    evt.preventDefault();
  }
};

renderFilters(filters, MAIN_NAV, getFilter);
renderCards(cards, FILMS_CARDS_CONTAINER, getCard);
renderCardsExtra(randomOrderInArrayAndSplice(cards, IS_RENDER_CARDS_EXTRA), FILMS_CARDS_EXTRA_TOP, getCardExtra);
renderCardsExtra(randomOrderInArrayAndSplice(cards, IS_RENDER_CARDS_EXTRA), FILMS_CARDS_EXTRA_MOST, getCardExtra);

MAIN_NAV.addEventListener(`click`, navClickHandler);
