import {
  renderCards,
  renderFilters,
  randomOrderInArrayAndSplice,
  clearChildEl,
  calculateStat,
  filterFilms
} from "./modules/util";
import {filters, cards} from "./modules/data";
import Card from "./clases/card";
import CardExtra from "./clases/card-extra";
import PopupCard from "./clases/popup-card";
import Filter from "./clases/component-filter";
import getStaticCtx from "./modules/statistic";
import renderStatList from "./modules/make-stat-list";
import renderStatRankLabel from "./modules/make-stat-rank-label";

const initialCardsFilms = cards;
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

renderFilters(filters, mainNav, Filter, filterCardsFilms);
renderCards(initialCardsFilms, filmsCardsContainer, Card, PopupCard);
renderCards(randomOrderInArrayAndSplice(initialCardsFilms, true), filmsCardsContainerExtraTop, CardExtra, PopupCard);
renderCards(randomOrderInArrayAndSplice(initialCardsFilms, true), ffilmsCardsContainerExtraMost, CardExtra, PopupCard);

