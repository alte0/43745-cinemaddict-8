import {renderTempate} from "./util";
/**
 * Отрисовывает ранг в статистике .statistic__rank
 * @param {Array} data
 * @param {HTMLElement} el
 */
export const renderStatRankLabel = (data, el) => {
  const statisticRankLabelTemplate = `
    Your rank <span class="statistic__rank-label">${data.topGenre}</span>
  `.trim();

  renderTempate(statisticRankLabelTemplate, el);
};
