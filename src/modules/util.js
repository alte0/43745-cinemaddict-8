const MAX_NUM = 7;
const MIN_NUM = 1;
/**
 * @param {String} template
 * @param {Node} el
 */
const renderTempate = (template, el = document.body) => {
  el.insertAdjacentHTML(`beforeend`, template);
};
/**
 * @param {Number} num
 * @return {Number}
 */
const getRndInteger = () => Math.floor(Math.random() * (MAX_NUM - MIN_NUM)) + MIN_NUM;

export {renderTempate, getRndInteger};
