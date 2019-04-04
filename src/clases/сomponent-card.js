import Component from "./сomponent";
import moment from "moment";

export default class ComponentCard extends Component {
  constructor(data) {
    super();

    if (new.target === ComponentCard) {
      throw new Error(
          `Can't instantiate BaseComponentCard, only concrete one.`
      );
    }

    this._id = data.id;
    this._title = data.title;
    this._alternativeTitle = data.alternativeTitle;
    this._rating = data.rating;
    this._year = moment(data.releaseDate).isValid() ? moment(data.releaseDate).format(`YYYY`) : ``;
    this._duration = moment.duration(data.duration, `minutes`).hours() + ` h ` + moment.duration(data.duration, `minutes`).minutes() + ` m`;
    this._genres = data.genres;
    this._imgSource = data.imgSource;
    this._description = data.description;
    this._comments = data.comments;
    this._isWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;

    this._open = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;

    this._onButtonClick = this._onButtonClick.bind(this);
    this._onButtonAddWatchlistClick = this._onButtonAddWatchlistClick.bind(this);
    this._onButtonMarkAsWatchedClick = this._onButtonMarkAsWatchedClick.bind(this);
    this._onButtonFavoriteClick = this._onButtonFavoriteClick.bind(this);
  }

  set open(fn) {
    this._open = fn;
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
    if (typeof this._open === `function`) {
      this._open();
    }
  }

  _onButtonAddWatchlistClick(evt) {
    evt.preventDefault();
    if (typeof this._onAddToWatchList === `function`) {
      this._isWatchlist = true;
      this._onAddToWatchList(this._isWatchlist);
    }
  }

  _onButtonMarkAsWatchedClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      this._isWatched = true;
      this._onMarkAsWatched(this._isWatched);
    }
  }

  _onButtonFavoriteClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      this._isFavorite = !this._isFavorite;
      this._onFavorite(this._isFavorite);
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

  update(data) {
    this._comments = data.comments;
    this._isWatched = data.isWatched;
    this._isWatchlist = data.isWatchlist;
    this._isFavorite = data.isFavorite;
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
