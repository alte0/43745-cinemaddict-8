import {renderData, clearChildEl, deleteEl} from './modules/util';
import getFilter from './modules/make-filter';
import {filters, card} from './modules/data';
import Card from './clases/card';
import CardExtra from './clases/card-extra';
import PopapCard from './clases/popup-card';

const BODY = document.body;
const MAIN_NAV = BODY.querySelector(`.main-navigation`);
const FILMS_CARDS_CONTAINER = BODY.querySelector(`.films .films-list .films-list__container`);
const FILMS_CARDS_EXTRAS = BODY.querySelectorAll(`.films .films-list--extra`);
const FILMS_CARDS_EXTRA_TOP = FILMS_CARDS_EXTRAS[0].querySelector(`.films-list__container`);
const FILMS_CARDS_EXTRA_MOST = FILMS_CARDS_EXTRAS[1].querySelector(`.films-list__container`);
const cardData = card();
const firstCard = new Card(cardData);
const firstCardExtra = new CardExtra(card());
const firstCardMost = new CardExtra(card());

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
      const firstCard2 = new Card(card());
      firstCard2.render(FILMS_CARDS_CONTAINER);
      firstCard2.popupOpen = popupOpen;
    } else if (href === `#stats`) {
      return;
    } else {
      const firstCard3 = new Card(card());
      firstCard3.render(FILMS_CARDS_CONTAINER);
      firstCard3.popupOpen = popupOpen;
    }
  } else {
    evt.preventDefault();
  }
};

const popupClose = () => {
  deleteEl(BODY, BODY.querySelector(`.film-details`));
};

const popupOpen = () => {
  if (!document.body.querySelector(`.film-details`)) {
    const popapCard = new PopapCard(cardData);
    popapCard.render(BODY);
    popapCard.popupClose = popupClose;
  }
};

renderFilters(filters, MAIN_NAV, getFilter);

firstCard.render(FILMS_CARDS_CONTAINER);
firstCard.popupOpen = popupOpen;

firstCardExtra.render(FILMS_CARDS_EXTRA_TOP);
firstCardExtra.popupOpen = popupOpen;

firstCardMost.render(FILMS_CARDS_EXTRA_MOST);
firstCardMost.popupOpen = popupOpen;

MAIN_NAV.addEventListener(`click`, navClickHandler);
