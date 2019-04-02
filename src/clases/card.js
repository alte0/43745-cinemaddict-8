import CardCommon from "./сomponent-card";

const maxDescription = 137;

export default class Card extends CardCommon {
  get template() {
    return `
      <article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${this._duration}</span>
          ${Array.from(this._genres)
            .map((genre) => `<span class="film-card__genre" > ${genre}</span > `.trim())
            .join(``)}
        </p>
        <img src="./${this._imgSource}" alt="${this._title}" class="film-card__poster">
        <p class="film-card__description">${this._description.slice(0, maxDescription).trim()}${this._description.length > maxDescription ? `...` : ``}</p>
        ${this._createBtnOpenComments(this._comments)}

        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>
    `.trim();
  }
}
