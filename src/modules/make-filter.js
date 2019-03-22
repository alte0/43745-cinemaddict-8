/**
 * @param {Object} filter
 * @return {String}
 */
export default (filter) => {
  return `
    <a href="#${filter.href.toLowerCase()}" class="main-navigation__item ${filter.isActive ? `main-navigation__item--active` : ``} ${filter.isAdditional ? `main-navigation__item--additional` : ``}">${filter.caption}
      ${filter.amount ? `<span class="main-navigation__item-count">${filter.amount}</span>` : `` }
    </a>`;
};
