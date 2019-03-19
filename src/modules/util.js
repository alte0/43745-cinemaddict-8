/**
 * @param {String} template
 * @param {HTMLElement} el
 */
const renderTempate = (template, el = document.body) => {
  el.insertAdjacentHTML(`beforeend`, template);
};
/**
 * @param {Array} arr
 * @param {HTMLElement} el
 * @param {Function} fn
 */
const renderData = (arr, el, fn) => {
  let template = ``;

  for (const data of arr) {
    template = template + fn(data);
  }

  renderTempate(template, el);
};
/**
 * @param {Array} arr
 * @param {HTMLElement} el
 * @param {Function} ClsCard
 * @param {Function} ClsPopup
 */
const renderCardsDatafromClass = (arr, el, ClsCard, ClsPopup) => {
  const body = document.body;

  for (const dataCard of arr) {
    const card = new ClsCard(dataCard);
    const popupCard = new ClsPopup(dataCard);

    const popupOpen = () => {
      popupCard.render(body);
    };
    card.popupOpen = popupOpen;

    popupCard.closePopup = function () {
      this.unbind();
      this._element.remove();
      this._element = null;
    };

    popupCard.onChangeFormData = (newObject) => {
      dataCard.ratingUser = newObject.ratingUser;
      dataCard.watchlist = newObject.watchlist;
      dataCard.watched = newObject.watched;
      dataCard.favorite = newObject.favorite;
      dataCard.comments = newObject.comments;

      card.update(dataCard);
      card.unbind();
      card.bind();
    };

    el.appendChild(card.render());
  }
};
/**
 * @param {HTMLElement} el
 */
const clearChildEl = (el) => {
  el.innerHTML = ``;
};
/**
 * @param {HTMLElement} container
 * @param {HTMLElement} deleteElement
 */
const deleteEl = (container, deleteElement) => {
  container.removeChild(deleteElement);
};
/**
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
const getRndInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomBoolean = () => Math.random() >= 0.5;
/**
 * @param {Array} arr
 * @param {Boolean} isTwo
 * @return {Array} copyArr
 */
const randomOrderInArrayAndSplice = (arr, isTwo = false) => {
  const copyArr = arr.slice();

  copyArr.sort((a, b) => a.name.length > b.name.length);

  if (isTwo) {
    copyArr.splice(2);
  } else {
    const randomNum = Math.random() * copyArr.length - 1;
    copyArr.splice(0, randomNum);
  }
  return copyArr;
};
/**
 * @param {String} template
 * @return {HTMLElement} HTMLElement
 */
const createElement = (template) => {
  const wrapperTemplate = document.createElement(`div`);
  wrapperTemplate.innerHTML = template;
  return wrapperTemplate.firstChild;
};

export {
  getRndInteger,
  clearChildEl,
  renderData,
  renderCardsDatafromClass,
  getRandomBoolean,
  randomOrderInArrayAndSplice,
  createElement,
  deleteEl
};
