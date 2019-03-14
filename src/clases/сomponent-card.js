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

    this._element = createElement(this.template);
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
