import CardCommon from './card-common';

export default class CardExtra extends CardCommon {
  get template() {
    return `
      <article class="film-card film-card--no-controls">
        <h3 class="film-card__title">${this._name}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._year}</span>
          <span class="film-card__duration">${this._duration}</span>
          ${ Array.from(this._genre).map((genre) => (`<span class="film-card__genre" > ${genre}</span > `.trim())).join(``)}
        </p>
        <img src="./images/posters/${this._imgSource}" alt="" class="film-card__poster">
        <button class="film-card__comments">${this._amountComments} comments</button>
      </article>
    `.trim();
  }
}
