import {createElement} from '../modules/util';

export default class CardCommon {
  constructor(data) {
    if (new.target === CardCommon) {
      throw new Error(`Can't instantiate CardCommon, only concrete one`);
    }

    this._name = data.name;
    this._rating = data.rating;
    this._year = data.year;
    this._duration = data.duration;
    this._genre = data.genre;
    this._imgSource = data.imgSource;
    this._description = data.description;
    this._amountComments = data.amountComments;

    this._element = null;
  }

  get template() {
    throw new Error(`Template is required`);
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

    this._element = createElement(this.template);
    container.appendChild(this._element);

    this.bind();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onButtonClick.bind(this));
  }
}
