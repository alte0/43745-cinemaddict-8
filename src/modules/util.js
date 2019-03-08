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
 * @param {Function} Fn
 * @param {Function} fnPopup
 */
const renderCardsDatafromClass = (arr, el, Fn, fnPopup) => {
  for (const data of arr) {
    const card = new Fn(data);

    card.popupOpen = () => {
      fnPopup(data);
    };
    card.render(el);
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
const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
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

export {getRndInteger, clearChildEl, renderData, renderCardsDatafromClass, getRandomBoolean, randomOrderInArrayAndSplice, createElement, deleteEl};
