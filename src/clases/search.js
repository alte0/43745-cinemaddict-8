import Component from "./сomponent";

export default class Search extends Component {
  constructor() {
    super();

    this._search = null;

    this.onInputSearchInput = this.onInputSearchInput.bind(this);
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

  bind() {
    this._element.querySelector(`.search__field`).addEventListener(`input`, this.onInputSearchInput);
    this._element.addEventListener(`input`, this.onFormSubmit);
  }

  unbind() {
    this._element.querySelector(`.search__field`).removeEventListener(`input`, this.onInputSearchInput);
    this._element.removeEventListener(`input`, this.onFormSubmit);
  }

  onInputSearchInput(evt) {
    if (typeof this._search === `function`) {
      this._search(evt);
    }
  }

  onFormSubmit(evt) {
    evt.preventDefault();
  }
}
