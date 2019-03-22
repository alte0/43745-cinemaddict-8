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
    ${arr.map((comment) => (`
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">${EMOJIS[comment.emmojiName] === undefined ? `` : EMOJIS[comment.emmojiName]}</span>
        <div>
          <p class="film-details__comment-text">${comment.textComment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${moment(comment.commentDay).fromNow()}</span>
          </p>
        </div>
      </li>
      `).trim()).join(``)}
  </ul >`
);

export default class PopapCard extends Component {
  constructor(data) {
    super();

    this._name = data.name;
    this._rating = data.rating;
    this._ratingUser = data.ratingUser;
    this._yearManufacture = data.yearManufacture;
    this._releaseDate = data.yearManufacture;
    this._duration = data.duration;
    this._genres = data.genres;
    this._imgSource = data.imgSource;
    this._description = data.description;
    this._comments = data.comments;
    this._ageLimit = data.ageLimit;
    this._cast = data.cast;
    this._country = data.country;
    this._watchlist = data.watchlist;
    this._watched = data.watched;
    this._favorite = data.favorite;

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
              <img class="film-details__poster-img" src="images/posters/${this._imgSource}" alt="${this._name}">
              <p class="film-details__age">${this._ageLimit}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${this._name}</h3>
                  <p class="film-details__title-original">Original: ${this._name}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${this._rating}</p>
                  <p class="film-details__user-rating">Your rate ${this._ratingUser}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">Brad Bird</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">Brad Bird</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${Array.from(this._cast)
                    .map((actor, index) => this._cast.length - 1 === index ? `${actor}` : `${actor}, `)
                    .join(``)}</td>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${moment(this._releaseDate).isValid() ? moment(this._yearManufacture).format(`D MMMM YYYY`) : ``} (${this._country.toUpperCase()})</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${moment.duration(this._duration).asMinutes()} min</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._country.toUpperCase()}</td>
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
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._watchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"  ${this._watched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._favorite ? `checked` : ``}>
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
                <img src="images/posters/${this._imgSource}" alt="${this._name}" class="film-details__user-rating-img">
              </div>

              <section class="film-details__user-rating-inner">
                <h3 class="film-details__user-rating-title">${this._name}</h3>

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

    if (newData.comments.textComment !== ``) {
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
    this._ratingUser = data.ratingUser;
    this._watchlist = data.watchlist;
    this._watched = data.watched;
    this._favorite = data.favorite;
    this._comments = data.comments;
  }

  _processForm(formData) {
    const entry = {
      watchlist: false,
      watched: false,
      favorite: false,
      comments: {
        textComment: ``,
        author: `User`,
        commentDay: new Date(),
        emmojiName: ``
      },
      ratingUser: `-`
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
      watchlist: (value) => (target.watchlist = value === `on`),
      watched: (value) => (target.watched = value === `on`),
      favorite: (value) => (target.favorite = value === `on`),
      comment: (value) => (target.comments.textComment = value),
      commentEmoji: (value) => (target.comments.emmojiName = value)
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
