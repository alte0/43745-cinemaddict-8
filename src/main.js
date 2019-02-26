import {renderTempate, getRndInteger} from './modules/util';
import getFilter from './modules/make-filter';
import getCard from './modules/make-card';
import getCardExtra from './modules/make-card-extra';
import {filters, card} from './modules/data';

const MAX_NUM = 7;
const MIN_NUM = 1;
const HOW_MUCH_RENDER_DEFAULT_CARDS = 7;
const HOW_MUCH_RENDER_CARDS_EXTRA = 2;
const MAIN_NAV = document.querySelector(`.main-navigation`);
const FILMS_CARDS_CONTAINER = document.querySelector(`.films-list .films-list__container`);
const FILMS_CARDS_EXTRAS = document.querySelectorAll(`.films-list--extra`);
const FILMS_CARDS_EXTRA_TOP = FILMS_CARDS_EXTRAS[0].querySelector(`.films-list__container`);
const FILMS_CARDS_EXTRA_MOST = FILMS_CARDS_EXTRAS[1].querySelector(`.films-list__container`);

/**
 * @param {Array} arr
 * @param {Node} el
 * @param {Function} fn
 */
const renderFilters = (arr, el, fn) => {
  let template = ``;

  for (const item of arr) {
    template = template + fn(item);
  }

  renderTempate(template, el);
};
/**
 * @param {Number} howMuchToRender
 * @param {Node} el
 * @param {Function} fn
 */
const renderCards = (howMuchToRender, el, fn) => {
  const template = new Array(howMuchToRender)
    .fill(``)
    .map(() => fn(card()))
    .join(``);

  renderTempate(template, el);
};

const navClickHandler = (evt) => {
  const target = evt.target;

  if (target.tagName === `A`) {
    const NAV_ITEMS = MAIN_NAV.querySelectorAll(`.main-navigation__item`);
    const href = target.getAttribute(`href`);

    NAV_ITEMS.forEach((item) => {
      item.classList.remove(`main-navigation__item--active`);
    });
    target.classList.add(`main-navigation__item--active`);
    FILMS_CARDS_CONTAINER.innerHTML = ``;

    if (href === `#all`) {
      renderCards(HOW_MUCH_RENDER_DEFAULT_CARDS, FILMS_CARDS_CONTAINER, getCard);
    } else if (href === `#stats`) {
      return;
    } else {
      renderCards(getRndInteger(MIN_NUM, MAX_NUM), FILMS_CARDS_CONTAINER, getCard);
    }
  } else {
    evt.preventDefault();
  }
};

renderFilters(filters, MAIN_NAV, getFilter);
renderCards(HOW_MUCH_RENDER_DEFAULT_CARDS, FILMS_CARDS_CONTAINER, getCard);
renderCards(HOW_MUCH_RENDER_CARDS_EXTRA, FILMS_CARDS_EXTRA_TOP, getCardExtra);
renderCards(HOW_MUCH_RENDER_CARDS_EXTRA, FILMS_CARDS_EXTRA_MOST, getCardExtra);

MAIN_NAV.addEventListener(`click`, navClickHandler);
