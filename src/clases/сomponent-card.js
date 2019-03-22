import Component from "./сomponent";
import moment from "moment";
import {createElement} from "../modules/util";

export default class ComponentCard extends Component {
  constructor(data) {
    super();

    if (new.target === ComponentCard) {
      throw new Error(
          `Can't instantiate BaseComponentCard, only concrete one.`
      );
    }

    this._name = data.name;
    this._rating = data.rating;
    this._ratingUser = data.ratingUser;
    this._yearManufacture = data.yearManufacture;
    this._year = moment(this._yearManufacture).isValid() ? moment(this._yearManufacture).format(`YYYY`) : ``;
    this._duration = moment.duration(data.duration).hours() + ` h ` + moment.duration(data.duration).minutes() + ` m`;
    this._genres = data.genres;
    this._imgSource = data.imgSource;
    this._description = data.description;
    this._comments = data.comments;
    this._watchlist = data.watchlist;
    this._watched = data.watched;
    this._favorite = data.favorite;

    this._openPopup = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;

    this._onButtonClick = this._onButtonClick.bind(this);
    this._onButtonAddWatchlistClick = this._onButtonAddWatchlistClick.bind(this);
    this._onButtonMarkAsWatchedClick = this._onButtonMarkAsWatchedClick.bind(this);
    this._onButtonFavoriteClick = this._onButtonFavoriteClick.bind(this);
  }

  set popupOpen(fn) {
    this._openPopup = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  set onFavorite(fn) {
    this._onFavorite = fn;
  }

  _onButtonClick() {
    if (typeof this._openPopup === `function`) {
      this._openPopup();
    }
  }

  _onButtonAddWatchlistClick(evt) {
    evt.preventDefault();
    if (typeof this._onAddToWatchList === `function`) {
      const watchlist = !this._watchlist;
      this._onAddToWatchList(watchlist);
    }
  }

  _onButtonMarkAsWatchedClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      const watched = !this._watched;
      this._onMarkAsWatched(watched);
    }
  }

  _onButtonFavoriteClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      const favorite = !this._favorite;
      this._onFavorite(favorite);
    }
  }

  /**
   * @param {Array} arr
   * @return {String}
   */
  _createBtnOpenComments(arr) {
    return `<button class="film-card__comments">${arr.length} comments</button>`;
  }

  partialUpdate() {
    const btnCommentOpen = this._element.querySelector(`.film-card__comments`);
    const parent = btnCommentOpen.parentElement;
    const prevElemBtnCommentOpen = btnCommentOpen.previousElementSibling;
    const newBtnCommentOpen = this._createBtnOpenComments(this._comments);
    parent.removeChild(btnCommentOpen);
    prevElemBtnCommentOpen.insertAdjacentHTML(`afterEnd`, newBtnCommentOpen);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  update(data) {
    this._comments = data.comments;
    this._watched = data.watched;
    this._watchlist = data.watchlist;
    // this._partialUpdate();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onButtonClick);
    if (this._element.querySelector(`.film-card__controls`)) {
      this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onButtonAddWatchlistClick);
      this._element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onButtonMarkAsWatchedClick);
      this._element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onButtonFavoriteClick);
    }
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onButtonClick);
    if (this._element.querySelector(`.film-card__controls`)) {
      this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).removeEventListener(`click`, this._onButtonAddWatchlistClick);
      this._element.querySelector(`.film-card__controls-item--mark-as-watched`).removeEventListener(`click`, this._onButtonMarkAsWatchedClick);
      this._element.querySelector(`.film-card__controls-item--favorite`).removeEventListener(`click`, this._onButtonFavoriteClick);
    }
  }
}
