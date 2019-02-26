/**
 * @param {String} template
 * @param {Node} el
 */
const renderTempate = (template, el = document.body) => {
  el.insertAdjacentHTML(`beforeend`, template);
};
/**
 * @param {Number} maxNum
 * @param {Number} minNum
 * @return {Number}
 */
const getRndInteger = (maxNum, minNum) => Math.floor(Math.random() * (maxNum - minNum)) + minNum;

export {renderTempate, getRndInteger};
