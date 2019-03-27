import Component from "./сomponent";
import moment from "moment";
import {createElement} from "../modules/util";

const EMOJIS = {
  "sleeping": `😴`,
  "neutral-face": `😐`,
  "grinning": `😀`,
};
const Keycode = {
  KEYCODE_ENTER: 13,
  KEYCODE_ESC: 27,
};
/**
 * @param {Number} scoreUser
 * @return {string}
 */
const createControlSelectScore = (scoreUser) => {
  const arr = [];
  for (let i = 1; i < 10; i++) {
    arr.push(`
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${i === +scoreUser ? `checked` : ``}>
      <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
      `.trim());
  }
  return arr.join(``);
};
/**
 * @param {Array} arr
 * @return {string}
 */
const createComments = (arr) => (
  `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${arr.length}</span></h3><ul class="film-details__comments-list">
    ${arr.map((objComment) => (`
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">${EMOJIS[objComment.emotion] === undefined ? `` : EMOJIS[objComment.emotion]}</span>
        <div>
          <p class="film-details__comment-text">${objComment.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${objComment.author}</span>
            <span class="film-details__comment-day">${moment(objComment.date).fromNow()}</span>
          </p>
        </div>
      </li>
      `).trim()).join(``)}
  </ul >`
);

export default class PopapCard extends Component {
  constructor(data) {
    super();

    this._id = data.id;
    this._title = data.title;
    this._alternativeTitle = data.alternativeTitle;
    this._director = data.director;
    this._writers = data.writers;
    this._rating = data.rating;
    this._ratingUser = data.ratingUser;
    this._releaseDate = moment(data.releaseDate).isValid() ? moment(data.releaseDate).format(`D MMMM YYYY`) : ``;
    this._duration = moment.duration(data.duration, `minutes`).asMinutes();
    this._genres = data.genres;
    this._imgSource = data.imgSource;
    this._description = data.description;
    this._comments = data.comments;
    this._ageLimit = data.ageLimit;
    this._actors = data.actors;
    this._releaseCountry = data.releaseCountry;
    this._isWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;

    this._onChangeFormData = null;
    this._onClosePopup = null;

    this._onButtonClick = this._onButtonClick.bind(this);
    this._onChangeRatingClick = this._onChangeRatingClick.bind(this);
    this._onChangeEmojiClick = this._onChangeEmojiClick.bind(this);
    this._onKeydownEnter = this._onKeydownEnter.bind(this);
    this._windowEscKeyDownHander = this._windowEscKeyDownHander.bind(this);
  }

  get template() {
    return `
      <section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${this._imgSource}" alt="${this._title}">
              <p class="film-details__age">${this._ageLimit}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${this._title}</h3>
                  <p class="film-details__title-original">Original: ${this._alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${this._rating}</p>
                  <p class="film-details__user-rating">Your rate ${this._ratingUser}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${this._director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${Array.from(this._writers)
                    .map((writer, index) => this._writers.length - 1 === index ? `${writer}` : `${writer}, `)
                    .join(``)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${Array.from(this._actors)
                    .map((actor, index) => this._actors.length - 1 === index ? `${actor}` : `${actor}, `)
                    .join(``)}</td>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${this._releaseDate} (${this._releaseCountry.toUpperCase()})</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${this._duration} min</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._releaseCountry.toUpperCase()}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${Array.from(this._genres)
                      .map((genre) =>
                        `<span class="film-details__genre">${genre}</span>`.trim()
                      )
                      .join(``)}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${this._description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._isWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"  ${this._isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>

          <section class="film-details__comments-wrap">

            ${createComments(this._comments)}

            <div class="film-details__new-comment">
              <div>
                <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
                <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
                  <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
                  <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
                </div>
              </div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
              </label>
            </div>
          </section>

          <section class="film-details__user-rating-wrap">
            <div class="film-details__user-rating-controls">
              <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
              <button class="film-details__watched-reset" type="button">undo</button>
            </div>

            <div class="film-details__user-score">
              <div class="film-details__user-rating-poster">
                <img src="./${this._imgSource}" alt="${this._title}" class="film-details__user-rating-img">
              </div>

              <section class="film-details__user-rating-inner">
                <h3 class="film-details__user-rating-title">${this._title}</h3>

                <p class="film-details__user-rating-feelings">How you feel it?</p>

                <div class="film-details__user-rating-score">
                 ${createControlSelectScore(this._ratingUser)}
                </div>
              </section>
            </div>
          </section>
        </form>
      </section>
    `.trim();
  }

  set onChangeFormData(fn) {
    this._onChangeFormData = fn;
  }

  set closePopup(fn) {
    this._onClosePopup = fn;
  }

  _onButtonClick() {
    if (typeof this._onClosePopup === `function`) {
      this._updateData();
      this._onClosePopup();
    }
  }

  _windowEscKeyDownHander(evt) {
    if (evt.keyCode === Keycode.KEYCODE_ESC) {
      this._updateData();
      this._onClosePopup();
    }
  }

  _updateData() {
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    const newData = this._processForm(formData);

    const copyCommments = this._comments.slice();
    if (newData.comments.comment !== ``) {
      copyCommments.push(newData.comments);
    }
    newData.comments = [...copyCommments];

    if (typeof this._onChangeFormData === `function`) {
      this._onChangeFormData(newData);
    }

    this.update(newData);
  }

  _onChangeRatingClick(evt) {
    const target = evt.target;
    const userRating = this._element.querySelector(`.film-details__user-rating`);
    const scoreElement = createElement(`<p class="film-details__user-rating">Your rate ${target.value}</p>`);
    const parentElScoreUSer = userRating.parentElement;
    parentElScoreUSer.removeChild(userRating);
    parentElScoreUSer.appendChild(scoreElement);
  }

  _onChangeEmojiClick(evt) {
    const target = evt.target;
    const selectEmoji = target.value;
    const emojiAdd = this._element.querySelector(`.film-details__add-emoji-label`);
    emojiAdd.textContent = EMOJIS[selectEmoji];
  }

  _onKeydownEnter(evt) {
    const keyCode = evt.keyCode;
    const target = evt.target;

    if (evt.metaKey || evt.ctrlKey && (keyCode === Keycode.KEYCODE_ENTER && target.value !== ``)) {
      this._updateData();
      this._partialUpdateComments();
      target.value = ``;
    }
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

  _partialUpdateComments() {
    const commentsWrap = this._element.querySelector(`.film-details__comments-wrap`);
    const commentsTitle = this._element.querySelector(`.film-details__comments-title`);
    const commentsList = this._element.querySelector(`.film-details__comments-list`);

    commentsWrap.removeChild(commentsTitle);
    commentsWrap.removeChild(commentsList);

    const newComments = createComments(this._comments);
    commentsWrap.insertAdjacentHTML(`afterBegin`, newComments);
  }

  update(data) {
    if (data.ratingUser) {
      this._ratingUser = data.ratingUser;
    }
    this._isWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._comments = data.comments;
  }

  _processForm(formData) {
    const entry = {
      isWatchlist: false,
      isWatched: false,
      isFavorite: false,
      comments: {
        comment: ``,
        author: `User`,
        date: new Date(),
        emotion: ``
      }
    };

    const popapCardEditMapper = PopapCard.createMapper(entry);

    for (const pair of formData.entries()) {
      let [key, value] = pair;
      if (key === `comment-emoji`) {
        key = `commentEmoji`;
      }
      if (popapCardEditMapper[key] && popapCardEditMapper[key](value)) {
        popapCardEditMapper[key](value);
      }
    }

    return entry;
  }

  static createMapper(target) {
    return {
      score: (value) => (target.ratingUser = value),
      watchlist: (value) => (target.isWatchlist = value === `on`),
      watched: (value) => (target.isWatched = value === `on`),
      favorite: (value) => (target.isFavorite = value === `on`),
      comment: (value) => (target.comments.comment = value),
      commentEmoji: (value) => (target.comments.emotion = value)
    };
  }
  bind() {
    this._element
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onButtonClick);
    window
      .addEventListener(`keydown`, this._windowEscKeyDownHander);
    this._element
      .querySelector(`.film-details__user-rating-score`)
      .addEventListener(`change`, this._onChangeRatingClick);
    this._element
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, this._onChangeEmojiClick);
    this._element
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, this._onKeydownEnter);
  }

  unbind() {
    this._element
      .querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this._onButtonClick);
    window
      .removeEventListener(`keydown`, this._windowEscKeyDownHander);
    this._element
      .querySelector(`.film-details__user-rating-score`)
      .removeEventListener(`change`, this._onChangeRatingClick);
    this._element
      .querySelector(`.film-details__emoji-list`)
      .removeEventListener(`change`, this._onChangeEmojiClick);
    this._element
      .querySelector(`.film-details__comment-input`)
      .removeEventListener(`keydown`, this._onKeydownEnter);
  }
}
