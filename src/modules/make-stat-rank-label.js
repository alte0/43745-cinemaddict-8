import {renderTempate} from "./util";

/**
 * @param {Array} data
 * @param {HTMLElement} el
 */
export default (data, el) => {
  const statisticRankLabelTemplate = `
    Your rank <span class="statistic__rank-label">${data.topGenre}</span>
  `.trim();

  renderTempate(statisticRankLabelTemplate, el);
};
