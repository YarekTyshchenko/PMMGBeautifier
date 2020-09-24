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
    const elements = Array.from(document.querySelectorAll("table[class~='_38xIOphw1aA3t-LEbriQzq']"));
    elements.forEach(tableElem => {
      const tableRows = Array.from(tableElem.querySelectorAll("tbody > tr"));
      tableRows.forEach(row => {
        // 7th cell contains flight time
        const etaCell = row.querySelectorAll("td").item(7);
        if (etaCell.textContent) {
          const textContent = etaCell.textContent.split('(')[0];
          const eta = convertDurationToETA(textContent);
          etaCell.appendChild(createTextSpan(` (${eta})`, this.tag));
        }
      });
    });
  }
}
