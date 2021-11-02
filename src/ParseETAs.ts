import {convertDurationToETA, createTextSpan, genericCleanup} from "./util";

/**
 * Parse all ETA times and add the actual date-time of arrival
 */
export class ParseETAs {
  private tag = "pb-other-etas";
  cleanup() {
    genericCleanup(this.tag);
  }
  run() {
      const ETARows = Array.from(document.querySelectorAll("div[class='_1T3GrusQ2ydTsNKeMaEfPl'] > div > div > div[class='_1JqhiJ8_SwKH8PRALcO9Hc _33A_5lETf4HBqwJi_q-jhZ _1vWRpdI8cKNMPyOPnzlXgX'] > div[class='shbi17MHX7PpkUzoWVbWm'] > div > div > div > table > tbody > tr"));
      ETARows.forEach(row => {
        // 7th cell contains flight time
        const etaCell = row.querySelectorAll("td").item(7);
        if (etaCell.textContent) {
          const textContent = etaCell.textContent.split('(')[0];
          const eta = convertDurationToETA(textContent);
          etaCell.appendChild(createTextSpan(` (${eta})`, this.tag));
        }
      });
  }
}
