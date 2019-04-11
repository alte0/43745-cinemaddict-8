import Component from "./сomponent";

export default class Search extends Component {
  constructor() {
    super();

    this._search = null;

    this._onInputSearchInput = this._onInputSearchInput.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  get template() {
    return `
      <form class="header__search search">
        <input type="text" name="search" class="search__field" placeholder="Search">
        <button type="submit" class="visually-hidden">Search</button>
      </form>
    `.trim();
  }

  set search(fn) {
    this._search = fn;
  }

  _onInputSearchInput(evt) {
    if (typeof this._search === `function`) {
      this._search(evt);
    }
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
  }

  bind() {
    this._element.querySelector(`.search__field`).addEventListener(`input`, this._onInputSearchInput);
    this._element.addEventListener(`input`, this._onFormSubmit);
  }

  unbind() {
    this._element.querySelector(`.search__field`).removeEventListener(`input`, this._onInputSearchInput);
    this._element.removeEventListener(`input`, this._onFormSubmit);
  }
}
