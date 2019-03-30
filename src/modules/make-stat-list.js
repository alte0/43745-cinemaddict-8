import {renderTempate} from "./util";
import moment from "moment";

/**
 * @param {Array} data
 * @param {HTMLElement} el
 */
export default (data, el) => {
  const statisticListTemplate = `
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${data.watched} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${moment.duration(data.duration, `minutes`).hours()} <span class="statistic__item-description">h</span>${moment.duration(data.duration, `minutes`).minutes()} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${data.topGenre}</p>
    </li>
  `.trim();

  renderTempate(statisticListTemplate, el);
};
