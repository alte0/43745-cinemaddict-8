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
    this._comments = data.comments;

    this._openPopup = null;

    this._onButtonClick = this._onButtonClick.bind(this);
  }

  set popupOpen(fn) {
    this._openPopup = fn;
  }

  _onButtonClick() {
    this._openPopup();
  }

  /**
   * @param {Array} arr
   * @return {String}
   */
  _createBtnOpenComments(arr) {
    return `<button class="film-card__comments">${arr.length} comments</button>`;
  }

  _partialUpdate() {
    console.log(`_partialUpdate`);
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
    this._partialUpdate();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onButtonClick);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onButtonClick);
  }
}
