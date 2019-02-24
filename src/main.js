import {renderTempate, getRndInteger} from './modules/util';
import getFilter from './modules/make-filter';
import getCard from './modules/make-card';
import getCardExtra from './modules/make-card-extra';
import {filters, cardsTop, cardsMost} from './modules/data';

const HOW_MUCH_RENDER_DEFAULT_CARDS = 7;
const MAIN_NAV = document.querySelector(`.main-navigation`);
const FILMS_CARDS_CONTAINER = document.querySelector(`.films-list .films-list__container`);
const FILMS_CARDS_EXTRAS = document.querySelectorAll(`.films-list--extra`);
const FILMS_CARDS_EXTRA_TOP = FILMS_CARDS_EXTRAS[0].querySelector(`.films-list__container`);
const FILMS_CARDS_EXTRA_MOST = FILMS_CARDS_EXTRAS[1].querySelector(`.films-list__container`);

/**
 * @param {Array} arr
 */
const renderFilters = (arr) => {
  let template = ``;

  arr.forEach((item) => {
    template = template + getFilter(item.caption, item.href, item.amount, item.isActive, item.isAdditional);
  });

  renderTempate(template, MAIN_NAV);
};
/**
 * @param {Number} howMuchToRender
 */
const renderCards = (howMuchToRender) => {
  const template = new Array(howMuchToRender)
    .fill()
    .map(getCard)
    .join(``);

  renderTempate(template, FILMS_CARDS_CONTAINER);
};
/**
 * @param {Array} arr
 * @param {Node} el
 */
const renderCardsExtra = (arr, el) => {
  let template = ``;

  arr.forEach((item) => {
    template = template + getCardExtra(item.sourceImg);
  });

  renderTempate(template, el);
};

const navClickHandler = (evt) => {
  const target = evt.target;

  if (target.tagName === `A`) {
    const NAV_ITEMS = MAIN_NAV.querySelectorAll(`.main-navigation__item`);

    NAV_ITEMS.forEach((item) => {
      item.classList.remove(`main-navigation__item--active`);
    });
    target.classList.add(`main-navigation__item--active`);
    FILMS_CARDS_CONTAINER.innerHTML = ``;

    if (target.getAttribute(`href`) === `#all`) {
      renderCards(HOW_MUCH_RENDER_DEFAULT_CARDS);
    } else {
      renderCards(getRndInteger());
    }
  } else {
    evt.preventDefault();
  }
};

renderFilters(filters);
renderCards(HOW_MUCH_RENDER_DEFAULT_CARDS);
renderCardsExtra(cardsTop, FILMS_CARDS_EXTRA_TOP);
renderCardsExtra(cardsMost, FILMS_CARDS_EXTRA_MOST);

MAIN_NAV.addEventListener(`click`, navClickHandler);
