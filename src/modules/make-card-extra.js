/**
 * @param {Object} card
 * @return {String}
 */
export default (card) => {
  return `
  <article class="film-card film-card--no-controls">
    <h3 class="film-card__title">${card.name}</h3>
    <p class="film-card__rating">${card.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${card.year}</span>
      <span class="film-card__duration">${card.duration}</span>
      <span class="film-card__genre">${card.genre}</span>
    </p>
    <img src="./images/posters/${card.imgSource}" alt="" class="film-card__poster">
    <button class="film-card__comments">${card.amountComments} comments</button>
  </article>
  `;
};
