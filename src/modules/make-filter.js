/**
 * @param {String} caption
 * @param {String} href
 * @param {Number} amount
 * @param {Boolean} isActive
 * @param {Boolean} isAdditional
 * @return {String}
 */
export default (caption, href = caption, amount, isActive = false, isAdditional = false) => {
  return `
    <a href="#${href.toLowerCase()}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``} ${isAdditional ? `main-navigation__item--additional` : ``}">${caption}
      ${amount ? `<span class="main-navigation__item-count">${amount}</span>` : `` }
    </a>`;
};
