import {
  renderData,
  renderCardsDatafromClass,
  randomOrderInArrayAndSplice,
  clearChildEl,
  // deleteEl
} from "./modules/util";
import getFilter from "./modules/make-filter";
import {filters, cards} from "./modules/data";
import Card from "./clases/card";
import CardExtra from "./clases/card-extra";
import PopupCard from "./clases/popup-card";

const body = document.body;
const mainNav = body.querySelector(`.main-navigation`);
const filmsCardsContainer = body.querySelector(
    `.films .films-list .films-list__container`
);
const filmsCardsContainerExtras = body.querySelectorAll(
    `.films .films-list--extra`
);
const filmsCardsContainerExtraTop = filmsCardsContainerExtras[0].querySelector(
    `.films-list__container`
);
const ffilmsCardsContainerExtraMost = filmsCardsContainerExtras[1].querySelector(
    `.films-list__container`
);

const renderFilters = renderData;

const navClickHandler = (evt) => {
  const target = evt.target;
  const targetTagName = target.tagName;

  if (targetTagName === `A` && !target.classList.contains(`main-navigation__item--active`)) {
    const navItems = mainNav.querySelectorAll(`.main-navigation__item`);
    const href = target.getAttribute(`href`);

    for (const navItem of navItems) {
      navItem.classList.remove(`main-navigation__item--active`);
    }
    target.classList.add(`main-navigation__item--active`);
    clearChildEl(filmsCardsContainer);

    if (href === `#all`) {
      renderCardsDatafromClass(cards, filmsCardsContainer, Card, PopupCard);
    } else if (href === `#stats`) {
      return;
    } else {
      renderCardsDatafromClass(randomOrderInArrayAndSplice(cards), filmsCardsContainer, Card, PopupCard);
    }
  } else {
    evt.preventDefault();
  }
};

renderFilters(filters, mainNav, getFilter);
renderCardsDatafromClass(cards, filmsCardsContainer, Card, PopupCard);
renderCardsDatafromClass(randomOrderInArrayAndSplice(cards, true), filmsCardsContainerExtraTop, CardExtra, PopupCard);
renderCardsDatafromClass(randomOrderInArrayAndSplice(cards, true), ffilmsCardsContainerExtraMost, CardExtra, PopupCard);

mainNav.addEventListener(`click`, navClickHandler);
