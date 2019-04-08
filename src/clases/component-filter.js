import Component from "./сomponent";

export default class ComponentFilter extends Component {
  constructor(data) {
    super();

    this._href = data.href;
    this._isActive = data.isActive;
    this._isAdditional = data.isAdditional;
    this._caption = data.caption;
    this._amount = data.amount;

    this._onFilter = null;

    this._onLinkClick = this._onLinkClick.bind(this);
  }

  get template() {
    return `
      <a href="#${this._href.toLowerCase()}" class="main-navigation__item ${this._isActive ? `main-navigation__item--active` : ``} ${this._isAdditional ? `main-navigation__item--additional` : ``}">${this._caption}
        ${this._amount ? `<span class="main-navigation__item-count">${this._amount}</span>` : ``}
      </a>`.trim();
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onLinkClick(evt) {
    if (typeof this._onFilter === `function`) {
      this._onFilter(evt);
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onLinkClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onLinkClick);
  }
}
