import {renderData, renderCardsDatafromClass, randomOrderInArrayAndSplice, clearChildEl, deleteEl} from './modules/util';
import getFilter from './modules/make-filter';
import {filters, cards} from './modules/data';
import Card from './clases/card';
import CardExtra from './clases/card-extra';
import PopapCard from './clases/popup-card';

const BODY = document.body;
const MAIN_NAV = BODY.querySelector(`.main-navigation`);
const FILMS_CARDS_CONTAINER = BODY.querySelector(`.films .films-list .films-list__container`);
const FILMS_CARDS_EXTRAS = BODY.querySelectorAll(`.films .films-list--extra`);
const FILMS_CARDS_EXTRA_TOP = FILMS_CARDS_EXTRAS[0].querySelector(`.films-list__container`);
const FILMS_CARDS_EXTRA_MOST = FILMS_CARDS_EXTRAS[1].querySelector(`.films-list__container`);

const renderFilters = renderData;

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
      renderCardsDatafromClass(cards, FILMS_CARDS_CONTAINER, Card, detailOpen);
    } else if (href === `#stats`) {
      return;
    } else {
      renderCardsDatafromClass(randomOrderInArrayAndSplice(cards), FILMS_CARDS_CONTAINER, Card, detailOpen);
    }
  } else {
    evt.preventDefault();
  }
};

const popupClose = () => {
  deleteEl(BODY, BODY.querySelector(`.film-details`));
};

const detailOpen = (dataPopup) => {
  if (!document.body.querySelector(`.film-details`)) {
    const popapCard = new PopapCard(dataPopup);
    popapCard.render(BODY);
    popapCard.popupClose = popupClose;
  }
};

renderFilters(filters, MAIN_NAV, getFilter);
renderCardsDatafromClass(cards, FILMS_CARDS_CONTAINER, Card, detailOpen);
renderCardsDatafromClass(randomOrderInArrayAndSplice(cards, true), FILMS_CARDS_EXTRA_TOP, CardExtra, detailOpen);
renderCardsDatafromClass(randomOrderInArrayAndSplice(cards, true), FILMS_CARDS_EXTRA_MOST, CardExtra, detailOpen);

MAIN_NAV.addEventListener(`click`, navClickHandler);
