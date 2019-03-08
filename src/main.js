import {
  renderData,
  renderCardsDatafromClass,
  randomOrderInArrayAndSplice,
  clearChildEl,
  deleteEl
} from "./modules/util";
import getFilter from "./modules/make-filter";
import {filters, cards} from "./modules/data";
import Card from "./clases/card";
import CardExtra from "./clases/card-extra";
import PopapCard from "./clases/popup-card";

const body = document.body;
const mainNav = body.querySelector(`.main-navigation`);
const filmmsCardsContainer = body.querySelector(
    `.films .films-list .films-list__container`
);
const filmmsCardsContainerExtras = body.querySelectorAll(`.films .films-list--extra`);
const filmmsCardsContainerExtraTop = filmmsCardsContainerExtras[0].querySelector(
    `.films-list__container`
);
const filmmsCardsContainerExtraMost = filmmsCardsContainerExtras[1].querySelector(
    `.films-list__container`
);

const renderFilters = renderData;

const navClickHandler = (evt) => {
  const target = evt.target;

  if (target.tagName === `A`) {
    const navItems = mainNav.querySelectorAll(`.main-navigation__item`);
    const href = target.getAttribute(`href`);

    for (const nav of navItems) {
      nav.classList.remove(`main-navigation__item--active`);
    }
    target.classList.add(`main-navigation__item--active`);
    clearChildEl(filmmsCardsContainer);

    if (href === `#all`) {
      renderCardsDatafromClass(cards, filmmsCardsContainer, Card, detailOpen);
    } else if (href === `#stats`) {
      return;
    } else {
      renderCardsDatafromClass(
          randomOrderInArrayAndSplice(cards),
          filmmsCardsContainer,
          Card,
          detailOpen
      );
    }
  } else {
    evt.preventDefault();
  }
};

const popupClose = () => {
  deleteEl(body, body.querySelector(`.film-details`));
};

const detailOpen = (dataPopup) => {
  if (!document.body.querySelector(`.film-details`)) {
    const popapCard = new PopapCard(dataPopup);
    popapCard.render(body);
    popapCard.popupClose = popupClose;
  }
};

renderFilters(filters, mainNav, getFilter);
renderCardsDatafromClass(cards, filmmsCardsContainer, Card, detailOpen);
renderCardsDatafromClass(
    randomOrderInArrayAndSplice(cards, true),
    filmmsCardsContainerExtraTop,
    CardExtra,
    detailOpen
);
renderCardsDatafromClass(
    randomOrderInArrayAndSplice(cards, true),
    filmmsCardsContainerExtraMost,
    CardExtra,
    detailOpen
);

mainNav.addEventListener(`click`, navClickHandler);
