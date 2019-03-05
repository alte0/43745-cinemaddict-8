/**
 * @param {String} template
 * @param {Node} el
 */
const renderTempate = (template, el = document.body) => {
  el.insertAdjacentHTML(`beforeend`, template);
};
/**
 * @param {Array} arr
 * @param {Node} el
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
 * @param {Node} el
 */
const clearChildEl = (el) => {
  el.innerHTML = ``;
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
    return copyArr.slice(0, 2);
  } else {
    const randomNum = Math.random() * copyArr.length - 1;
    copyArr.splice(0, randomNum);
    return copyArr;
  }
};

export {getRndInteger, clearChildEl, renderData, getRandomBoolean, randomOrderInArrayAndSplice};
