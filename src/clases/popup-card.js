import Component from "./сomponent";
import moment from "moment";
import {createElement, setDefaulStyle, setBlockElem, deleteEl} from "../modules/util";

const EmojiType = {
  "sleeping": `😴`,
  "neutral-face": `😐`,
  "grinning": `😀`,
};
const KeyCodeType = {
  KEYCODE_ENTER: 13,
  KEYCODE_ESC: 27,
};

export default class PopupCard extends Component {
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
    this._statusComment = ``;

    this._onClose = null;
    this._onTextareaKeyDown = null;
    this._onRadioRatingChange = null;
    this._addWatchlist = null;
    this._addWatched = null;
    this._toggleFavorites = null;
    this._onButtonUndoCommentClick = null;

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onChangeRatingClick = this.onChangeRatingClick.bind(this);
    this.onChangeEmojiClick = this.onChangeEmojiClick.bind(this);
    this.onKeydownEnter = this.onKeydownEnter.bind(this);
    this.onWindowEscKeyDown = this.onWindowEscKeyDown.bind(this);
    this.onButtonUndoClick = this.onButtonUndoClick.bind(this);
    this.onCheckboxControlInputWatchlistClick = this.onCheckboxControlInputWatchlistClick.bind(this);
    this.onCheckboxControlInputWatchedClick = this.onCheckboxControlInputWatchedClick.bind(this);
    this.onCheckboxControlInputFavoriteClick = this.onCheckboxControlInputFavoriteClick.bind(this);
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

            ${this._createComments(this._comments)}

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
              <span class="film-details__watched-status film-details__watched-status--active">${this._statusComment}</span>
              <button class="film-details__watched-reset visually-hidden" type="button">undo</button>
            </div>

            <div class="film-details__user-score">
              <div class="film-details__user-rating-poster">
                <img src="./${this._imgSource}" alt="${this._title}" class="film-details__user-rating-img">
              </div>

              <section class="film-details__user-rating-inner">
                <h3 class="film-details__user-rating-title">${this._title}</h3>

                <p class="film-details__user-rating-feelings">How you feel it?</p>

                <div class="film-details__user-rating-score">
                 ${this._createControlSelectScore(this._ratingUser)}
                </div>
              </section>
            </div>
          </section>
        </form>
      </section>
    `.trim();
  }

  set close(fn) {
    this._onClose = fn;
  }
  set onTextareaKeyDown(fn) {
    this._onTextareaKeyDown = fn;
  }

  set onRadioRatingChange(fn) {
    this._onRadioRatingChange = fn;
  }

  set addWatchlist(fn) {
    this._addWatchlist = fn;
  }

  set addWatched(fn) {
    this._addWatched = fn;
  }

  set toggleFavorites(fn) {
    this._toggleFavorites = fn;
  }

  set onButtonUndoCommentClick(fn) {
    this._onButtonUndoCommentClick = fn;
  }
  /**
   * @param {Number} scoreUser
   * @return {string}
   */
  _createControlSelectScore(scoreUser) {
    const arr = [];
    const startCountInput = 1;
    const endCountInput = 10;

    for (let i = startCountInput; i < endCountInput; i++) {
      arr.push(`
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${i === +scoreUser ? `checked` : ``}><label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
      `.trim());
    }

    return arr.join(``);
  }
  /**
   * @param {Array} arr
   * @return {string}
   */
  _createComments(arr) {
    return `
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${arr.length}</span></h3><ul class="film-details__comments-list">
    ${arr.map((objComment) => (`
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">${EmojiType[objComment.emotion] === undefined ? `` : EmojiType[objComment.emotion]}</span>
        <div>
          <p class="film-details__comment-text">${objComment.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${objComment.author}</span>
            <span class="film-details__comment-day">${moment(objComment.date).fromNow()}</span>
          </p>
        </div>
      </li>
      `).trim()).join(``)}
    </ul >`.trim();
  }

  _collectFormData() {
    const formDetais = this._element.querySelector(`.film-details__inner`);
    const formData = new FormData(formDetais);
    const newData = this._processForm(formData);
    const copyCommments = this._comments.slice();
    if (newData.comments.comment !== ``) {
      copyCommments.push(newData.comments);
    }
    newData.comments = [...copyCommments];
    return newData;
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

    const popapCardEditMapper = PopupCard.createMapper(entry);

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
  /**
   * @param {Boolean} hidden
   */
  _updateStatus(hidden) {
    const statusWrap = this._element.querySelector(`.film-details__user-rating-controls`);
    const newStatus = createElement(`
      <div class="film-details__user-rating-controls">
        <span class="film-details__watched-status film-details__watched-status--active">${this._statusComment}</span>
        <button class="film-details__watched-reset${hidden ? ` visually-hidden` : ``}" type="button">undo</button>
      </div>
    `.trim());

    const parentEl = statusWrap.parentElement;
    statusWrap.remove();
    parentEl.insertBefore(newStatus, parentEl.firstChild);
  }

  _setStatusCommentRemove() {
    if (this._statusComment === `Comment added`) {
      this._statusComment = `Comment deleted`;
      this._updateStatus(true);
    }
  }

  setStatusCommentAdd() {
    if (this._statusComment === `` || this._statusComment === `Comment deleted`) {
      this._statusComment = `Comment added`;
      this._updateStatus(false);
    }
  }

  partialUpdateRating() {
    const userRating = this._element.querySelector(`.film-details__user-rating`);
    const scoreElement = createElement(`<p class="film-details__user-rating">Your rate ${this._ratingUser}</p>`);
    const parentElScoreUSer = userRating.parentElement;
    deleteEl(parentElScoreUSer, userRating);
    parentElScoreUSer.appendChild(scoreElement);
  }

  partialUpdateComments() {
    const commentsWrap = this._element.querySelector(`.film-details__comments-wrap`);
    const commentsTitle = this._element.querySelector(`.film-details__comments-title`);
    const commentsList = this._element.querySelector(`.film-details__comments-list`);

    deleteEl(commentsWrap, commentsTitle);
    deleteEl(commentsWrap, commentsList);

    const newComments = this._createComments(this._comments);
    commentsWrap.insertAdjacentHTML(`afterBegin`, newComments);
  }

  update(data) {
    this._ratingUser = data.ratingUser;
    this._isWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._comments = data.comments;
  }

  bind() {
    this._element
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this.onButtonClick);
    window
      .addEventListener(`keydown`, this.onWindowEscKeyDown);
    this._element
      .querySelector(`.film-details__user-rating-score`)
      .addEventListener(`change`, this.onChangeRatingClick);
    this._element
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, this.onChangeEmojiClick);
    this._element
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, this.onKeydownEnter);
    this._element
      .querySelector(`[name="watchlist"]`)
      .addEventListener(`click`, this.onCheckboxControlInputWatchlistClick);
    this._element
      .querySelector(`[name="watched"]`)
      .addEventListener(`click`, this.onCheckboxControlInputWatchedClick);
    this._element
      .querySelector(`[name="favorite"]`)
      .addEventListener(`click`, this.onCheckboxControlInputFavoriteClick);
    this._element
      .querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, this.onButtonUndoClick);
  }

  unbind() {
    this._element
      .querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this.onButtonClick);
    window
      .removeEventListener(`keydown`, this.onWindowEscKeyDown);
    this._element
      .querySelector(`.film-details__user-rating-score`)
      .removeEventListener(`change`, this.onChangeRatingClick);
    this._element
      .querySelector(`.film-details__emoji-list`)
      .removeEventListener(`change`, this.onChangeEmojiClick);
    this._element
      .querySelector(`.film-details__comment-input`)
      .removeEventListener(`keydown`, this.onKeydownEnter);
    this._element
      .querySelector(`[name="watchlist"]`)
      .removeEventListener(`click`, this.onCheckboxControlInputWatchlistClick);
    this._element
      .querySelector(`[name="watched"]`)
      .removeEventListener(`click`, this.onCheckboxControlInputWatchedClick);
    this._element
      .querySelector(`[name="favorite"]`)
      .removeEventListener(`click`, this.onCheckboxControlInputFavoriteClick);
    this._element
      .querySelector(`.film-details__watched-reset`)
      .removeEventListener(`click`, this.onButtonUndoClick);
  }

  onButtonClick() {
    if (typeof this._onClose === `function`) {
      this._onClose();
    }
  }

  onWindowEscKeyDown(evt) {
    if (evt.keyCode === KeyCodeType.KEYCODE_ESC) {
      this._onClose();
    }
  }

  onChangeRatingClick(evt) {
    const newData = this._collectFormData();
    if (typeof this._onRadioRatingChange === `function`) {
      this._onRadioRatingChange(newData, evt);
    }
  }

  onChangeEmojiClick(evt) {
    const target = evt.target;
    const selectEmoji = target.value;
    const emojiAdd = this._element.querySelector(`.film-details__add-emoji-label`);
    emojiAdd.textContent = EmojiType[selectEmoji];
  }

  onKeydownEnter(evt) {
    const keyCode = evt.keyCode;
    const target = evt.target;
    const parentEl = evt.target.parentElement;

    if (evt.metaKey || evt.ctrlKey && (keyCode === KeyCodeType.KEYCODE_ENTER && target.value !== ``)) {
      const newData = this._collectFormData();

      setDefaulStyle(parentEl);
      setBlockElem(target);

      if (typeof this._onTextareaKeyDown === `function`) {
        this._onTextareaKeyDown(newData);
      }
    }
  }

  onCheckboxControlInputWatchlistClick() {
    const newData = this._collectFormData();
    if (typeof this._addWatchlist === `function`) {
      this._addWatchlist(newData);
    }
  }

  onCheckboxControlInputWatchedClick() {
    const newData = this._collectFormData();
    if (typeof this._addWatched === `function`) {
      this._addWatched(newData);
    }
  }

  onCheckboxControlInputFavoriteClick() {
    const newData = this._collectFormData();
    if (typeof this._toggleFavorites === `function`) {
      this._toggleFavorites(newData);
    }
  }

  onButtonUndoClick() {
    const copyCommments = this._comments.slice();
    const lastComment = copyCommments.length - 1;

    if (copyCommments[lastComment].author === `User`) {
      copyCommments.splice(lastComment, 1);
      this._setStatusCommentRemove();
    }

    if (typeof this._onButtonUndoCommentClick === `function`) {
      this._onButtonUndoCommentClick({comments: copyCommments});
    }
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
}
