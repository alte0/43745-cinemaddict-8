/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/clases/card-extra.js":
/*!**********************************!*\
  !*** ./src/clases/card-extra.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CardExtra; });
/* harmony import */ var _omponent_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./сomponent-card */ "./src/clases/сomponent-card.js");


class CardExtra extends _omponent_card__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return `
      <article class="film-card film-card--no-controls">
        <h3 class="film-card__title">${this._name}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${this._duration}</span>
          ${Array.from(this._genre)
            .map((genre) =>
              `<span class="film-card__genre" > ${genre}</span > `.trim()
            )
            .join(``)}
        </p>
        <img src="./images/posters/${
  this._imgSource
}" alt="" class="film-card__poster">
        <button class="film-card__comments">${
  this._amountComments
} comments</button>
      </article>
    `.trim();
  }
}


/***/ }),

/***/ "./src/clases/card.js":
/*!****************************!*\
  !*** ./src/clases/card.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Card; });
/* harmony import */ var _omponent_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./сomponent-card */ "./src/clases/сomponent-card.js");


class Card extends _omponent_card__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._name}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${this._duration}</span>
          ${Array.from(this._genre)
            .map((genre) =>
              `<span class="film-card__genre" > ${genre}</span > `.trim()
            )
            .join(``)}
        </p>
        <img src="./images/posters/${this._imgSource}" alt="${
  this._name
}" class="film-card__poster">
        <p class="film-card__description">${this._description}.</p>
        <button class="film-card__comments">${
  this._amountComments
} comments</button>

        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>
    `.trim();
  }
}


/***/ }),

/***/ "./src/clases/popup-card.js":
/*!**********************************!*\
  !*** ./src/clases/popup-card.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PopapCard; });
/* harmony import */ var _omponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./сomponent */ "./src/clases/сomponent.js");
/* harmony import */ var _modules_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/util */ "./src/modules/util.js");



class PopapCard extends _omponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(data) {
    super();

    this._name = data.name;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._imgSource = data.imgSource;
    this._description = data.description;
    this._amountComments = data.amountComments;
    this._genre = data.genre;

    this._onButtonClick = this._onButtonClick.bind(this);
  }

  get template() {
    return `
      <section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="images/posters/${
  this._imgSource
}" alt="${this._name}">
              <p class="film-details__age">18+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${this._name}</h3>
                  <p class="film-details__title-original">Original: Невероятная семейка</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${this._rating}</p>
                  <p class="film-details__user-rating">Your rate 8</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">Brad Bird</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">Brad Bird</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">Samuel L. Jackson, Catherine Keener, Sophia Bush</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">15 June 2018 (USA)</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">118 min</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">USA</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${Array.from(this._genre)
                      .map((genre) =>
                        `<span class="film-details__genre">${genre}</span>`.trim()
                      )
                      .join(``)}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${this._description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" checked>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>

          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">1</span></h3>

            <ul class="film-details__comments-list">
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">😴</span>
                <div>
                  <p class="film-details__comment-text">So long-long story, boring!</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">Tim Macoveev</span>
                    <span class="film-details__comment-day">3 days ago</span>
                  </p>
                </div>
              </li>
            </ul>

            <div class="film-details__new-comment">
              <div>
                <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
                <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
                  <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
                  <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
                </div>
              </div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
              </label>
            </div>
          </section>

          <section class="film-details__user-rating-wrap">
            <div class="film-details__user-rating-controls">
              <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
              <button class="film-details__watched-reset" type="button">undo</button>
            </div>

            <div class="film-details__user-score">
              <div class="film-details__user-rating-poster">
                <img src="images/posters/${this._imgSource}" alt="${
  this._name
}" class="film-details__user-rating-img">
              </div>

              <section class="film-details__user-rating-inner">
                <h3 class="film-details__user-rating-title">${this._name}</h3>

                <p class="film-details__user-rating-feelings">How you feel it?</p>

                <div class="film-details__user-rating-score">
                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
                  <label class="film-details__user-rating-label" for="rating-1">1</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
                  <label class="film-details__user-rating-label" for="rating-2">2</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
                  <label class="film-details__user-rating-label" for="rating-3">3</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
                  <label class="film-details__user-rating-label" for="rating-4">4</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5" checked>
                  <label class="film-details__user-rating-label" for="rating-5">5</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
                  <label class="film-details__user-rating-label" for="rating-6">6</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
                  <label class="film-details__user-rating-label" for="rating-7">7</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
                  <label class="film-details__user-rating-label" for="rating-8">8</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9">
                  <label class="film-details__user-rating-label" for="rating-9">9</label>

                </div>
              </section>
            </div>
          </section>
        </form>
      </section>
    `.trim();
  }
  set popupClose(fn) {
    this.closePopup = fn;
  }

  _onButtonClick() {
    this.closePopup();
  }

  render(container) {
    if (this._element) {
      container.removeChild(this._element);
      this._element = null;
    }

    this._element = Object(_modules_util__WEBPACK_IMPORTED_MODULE_1__["createElement"])(this.template);
    container.appendChild(this._element);

    this.bind();
  }

  bind() {
    this._element
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onButtonClick);
  }

  unbind() {
    this._element
      .querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this._onButtonClick);
  }
}


/***/ }),

/***/ "./src/clases/сomponent-card.js":
/*!**************************************!*\
  !*** ./src/clases/сomponent-card.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ComponentCard; });
/* harmony import */ var _omponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./сomponent */ "./src/clases/сomponent.js");
/* harmony import */ var _modules_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/util */ "./src/modules/util.js");



class ComponentCard extends _omponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(data) {
    super();

    if (new.target === ComponentCard) {
      throw new Error(
          `Can't instantiate BaseComponentCard, only concrete one.`
      );
    }

    this._name = data.name;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._imgSource = data.imgSource;
    this._description = data.description;
    this._amountComments = data.amountComments;

    this._onButtonClick = this._onButtonClick.bind(this);
  }

  set popupOpen(fn) {
    this.openPopup = fn;
  }

  _onButtonClick() {
    this.openPopup();
  }

  render(container) {
    if (this._element) {
      container.removeChild(this._element);
      this._element = null;
    }

    this._element = Object(_modules_util__WEBPACK_IMPORTED_MODULE_1__["createElement"])(this.template);
    container.appendChild(this._element);

    this.bind();
  }

  bind() {
    this._element
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._onButtonClick);
  }

  unbind() {
    this._element
      .querySelector(`.film-card__comments`)
      .removeEventListener(`click`, this._onButtonClick);
  }
}


/***/ }),

/***/ "./src/clases/сomponent.js":
/*!*********************************!*\
  !*** ./src/clases/сomponent.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony import */ var _modules_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/util */ "./src/modules/util.js");


class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this._element = Object(_modules_util__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.template);
    this.bind();
    return this._element;
  }

  bind() { }

  unbind() { }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/util */ "./src/modules/util.js");
/* harmony import */ var _modules_make_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/make-filter */ "./src/modules/make-filter.js");
/* harmony import */ var _modules_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/data */ "./src/modules/data.js");
/* harmony import */ var _clases_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clases/card */ "./src/clases/card.js");
/* harmony import */ var _clases_card_extra__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./clases/card-extra */ "./src/clases/card-extra.js");
/* harmony import */ var _clases_popup_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clases/popup-card */ "./src/clases/popup-card.js");







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

const renderFilters = _modules_util__WEBPACK_IMPORTED_MODULE_0__["renderData"];

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
    Object(_modules_util__WEBPACK_IMPORTED_MODULE_0__["clearChildEl"])(filmsCardsContainer);

    if (href === `#all`) {
      Object(_modules_util__WEBPACK_IMPORTED_MODULE_0__["renderCardsDatafromClass"])(_modules_data__WEBPACK_IMPORTED_MODULE_2__["cards"], filmsCardsContainer, _clases_card__WEBPACK_IMPORTED_MODULE_3__["default"], detailOpen);
    } else if (href === `#stats`) {
      return;
    } else {
      Object(_modules_util__WEBPACK_IMPORTED_MODULE_0__["renderCardsDatafromClass"])(
          Object(_modules_util__WEBPACK_IMPORTED_MODULE_0__["randomOrderInArrayAndSplice"])(_modules_data__WEBPACK_IMPORTED_MODULE_2__["cards"]),
          filmsCardsContainer,
          _clases_card__WEBPACK_IMPORTED_MODULE_3__["default"],
          detailOpen
      );
    }
  } else {
    evt.preventDefault();
  }
};

const popupClose = () => {
  Object(_modules_util__WEBPACK_IMPORTED_MODULE_0__["deleteEl"])(body, body.querySelector(`.film-details`));
};

const detailOpen = (dataPopup) => {
  if (!document.body.querySelector(`.film-details`)) {
    const popapCard = new _clases_popup_card__WEBPACK_IMPORTED_MODULE_5__["default"](dataPopup);
    popapCard.render(body);
    popapCard.popupClose = popupClose;
  }
};

renderFilters(_modules_data__WEBPACK_IMPORTED_MODULE_2__["filters"], mainNav, _modules_make_filter__WEBPACK_IMPORTED_MODULE_1__["default"]);
Object(_modules_util__WEBPACK_IMPORTED_MODULE_0__["renderCardsDatafromClass"])(_modules_data__WEBPACK_IMPORTED_MODULE_2__["cards"], filmsCardsContainer, _clases_card__WEBPACK_IMPORTED_MODULE_3__["default"], detailOpen);
Object(_modules_util__WEBPACK_IMPORTED_MODULE_0__["renderCardsDatafromClass"])(
    Object(_modules_util__WEBPACK_IMPORTED_MODULE_0__["randomOrderInArrayAndSplice"])(_modules_data__WEBPACK_IMPORTED_MODULE_2__["cards"], true),
    filmsCardsContainerExtraTop,
    _clases_card_extra__WEBPACK_IMPORTED_MODULE_4__["default"],
    detailOpen
);
Object(_modules_util__WEBPACK_IMPORTED_MODULE_0__["renderCardsDatafromClass"])(
    Object(_modules_util__WEBPACK_IMPORTED_MODULE_0__["randomOrderInArrayAndSplice"])(_modules_data__WEBPACK_IMPORTED_MODULE_2__["cards"], true),
    ffilmsCardsContainerExtraMost,
    _clases_card_extra__WEBPACK_IMPORTED_MODULE_4__["default"],
    detailOpen
);

mainNav.addEventListener(`click`, navClickHandler);


/***/ }),

/***/ "./src/modules/data.js":
/*!*****************************!*\
  !*** ./src/modules/data.js ***!
  \*****************************/
/*! exports provided: filters, card, cards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filters", function() { return filters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "card", function() { return card; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cards", function() { return cards; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/modules/util.js");


const MIN_NUM = 0;
const maxNums = [2, 3, 4, 5, 6, 13];
const cards = [];
let i = 0;

const filters = [
  {
    caption: `All movies`,
    href() {
      return `ALL`;
    },
    isActive: true,
  },
  {
    caption: `Watchlist`,
    href() {
      return this.caption;
    },
    amount: `13`
  },
  {
    caption: `History`,
    href() {
      return this.caption;
    },
    amount: `4`
  },
  {
    caption: `Favorites`,
    href() {
      return this.caption;
    },
    amount: `8`
  },
  {
    caption: `Stats`,
    href() {
      return this.caption;
    },
    isAdditional: true
  },
];
const card = () => ({
  name: [
    `Love and pigeons`,
    `Ivan Vasilyevich changes profession`,
    `The Shawshank redemption`,
    `Green mile`,
    `Forrest Gump`,
    `Leone`,
    `Lion-king`,
    `Fight club`,
    `Godfather`,
    `Pulp fiction`,
    `Operation "y" and other Shurik's adventures`,
    `Lord of the rings: Return of the King`,
    `Back to the future`,
    `Cards, money, two barrels`,
    `Diamond hand`,
  ][Object(_util__WEBPACK_IMPORTED_MODULE_0__["getRndInteger"])(MIN_NUM, maxNums[5])],
  rating: [
    `9.8`,
    `10.0`,
    `5.6`,
    `7.7`
  ][Object(_util__WEBPACK_IMPORTED_MODULE_0__["getRndInteger"])(MIN_NUM, maxNums[1])],
  year: [2018, 2006, 2000][Object(_util__WEBPACK_IMPORTED_MODULE_0__["getRndInteger"])(MIN_NUM, maxNums[0])],
  duration: [
    `1h 13m`,
    `1h 26m`,
    `1h 06m`,
    `1h 30m`
  ][Object(_util__WEBPACK_IMPORTED_MODULE_0__["getRndInteger"])(MIN_NUM, maxNums[1])],
  genre: [
    `Comedy`,
    `Thriller`,
    `Fantasy`,
    `Drama`,
    `Horror`,
    `Animation`
  ],
  imgSource: [
    `accused.jpg`,
    `blackmail.jpg`,
    `blue-blazes.jpg`,
    `fuga-da-new-york.jpg`,
    `moonrise.jpg`,
    `three-friends.jpg`,
  ][Object(_util__WEBPACK_IMPORTED_MODULE_0__["getRndInteger"])(MIN_NUM, maxNums[3])],
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.Nunc fermentum tortor ac porta dapibus.In rutrum ac purus sit amet tempus.`
  ][Object(_util__WEBPACK_IMPORTED_MODULE_0__["getRndInteger"])(MIN_NUM, maxNums[0])],
  amountComments: [0, 2, 5, 8, 13][Object(_util__WEBPACK_IMPORTED_MODULE_0__["getRndInteger"])(MIN_NUM, maxNums[2])],
  watchlist: Object(_util__WEBPACK_IMPORTED_MODULE_0__["getRandomBoolean"])(),
  watched: Object(_util__WEBPACK_IMPORTED_MODULE_0__["getRandomBoolean"])(),
  favorite: Object(_util__WEBPACK_IMPORTED_MODULE_0__["getRandomBoolean"])(),
});

while (i < 8) {
  cards.push(card());
  i++;
}




/***/ }),

/***/ "./src/modules/make-filter.js":
/*!************************************!*\
  !*** ./src/modules/make-filter.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @param {Object} filter
 * @return {String}
 */
/* harmony default export */ __webpack_exports__["default"] = ((filter) => {
  return `
    <a href="#${filter.href().toLowerCase()}" class="main-navigation__item ${filter.isActive ? `main-navigation__item--active` : ``} ${filter.isAdditional ? `main-navigation__item--additional` : ``}">${filter.caption}
      ${filter.amount ? `<span class="main-navigation__item-count">${filter.amount}</span>` : `` }
    </a>`;
});


/***/ }),

/***/ "./src/modules/util.js":
/*!*****************************!*\
  !*** ./src/modules/util.js ***!
  \*****************************/
/*! exports provided: getRndInteger, clearChildEl, renderData, renderCardsDatafromClass, getRandomBoolean, randomOrderInArrayAndSplice, createElement, deleteEl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRndInteger", function() { return getRndInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearChildEl", function() { return clearChildEl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderData", function() { return renderData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderCardsDatafromClass", function() { return renderCardsDatafromClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomBoolean", function() { return getRandomBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomOrderInArrayAndSplice", function() { return randomOrderInArrayAndSplice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEl", function() { return deleteEl; });
/**
 * @param {String} template
 * @param {HTMLElement} el
 */
const renderTempate = (template, el = document.body) => {
  el.insertAdjacentHTML(`beforeend`, template);
};
/**
 * @param {Array} arr
 * @param {HTMLElement} el
 * @param {Function} fn
 */
const renderData = (arr, el, fn) => {
  let template = ``;

  for (const data of arr) {
    template = template + fn(data);
  }

  renderTempate(template, el);
};
/**
 * @param {Array} arr
 * @param {HTMLElement} el
 * @param {Function} Fn
 * @param {Function} fnPopup
 */
const renderCardsDatafromClass = (arr, el, Fn, fnPopup) => {
  for (const data of arr) {
    const card = new Fn(data);

    card.popupOpen = () => {
      fnPopup(data);
    };
    card.render(el);
  }
};
/**
 * @param {HTMLElement} el
 */
const clearChildEl = (el) => {
  el.innerHTML = ``;
};
/**
 * @param {HTMLElement} container
 * @param {HTMLElement} deleteElement
 */
const deleteEl = (container, deleteElement) => {
  container.removeChild(deleteElement);
};
/**
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomBoolean = () => Math.random() >= 0.5;
/**
 * @param {Array} arr
 * @param {Boolean} isTwo
 * @return {Array} copyArr
 */
const randomOrderInArrayAndSplice = (arr, isTwo = false) => {
  const copyArr = arr.slice();

  copyArr.sort((a, b) => a.name.length > b.name.length);

  if (isTwo) {
    copyArr.splice(2);
  } else {
    const randomNum = Math.random() * copyArr.length - 1;
    copyArr.splice(0, randomNum);
  }
  return copyArr;
};
/**
 * @param {String} template
 * @return {HTMLElement} HTMLElement
 */
const createElement = (template) => {
  const wrapperTemplate = document.createElement(`div`);
  wrapperTemplate.innerHTML = template;
  return wrapperTemplate.firstChild;
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map