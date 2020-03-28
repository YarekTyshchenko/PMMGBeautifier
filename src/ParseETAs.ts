import { convertDurationToETA, createTextSpan } from "./util";

/**
 * Parse all ETA times and add the actual date-time of arrival
 */
export class ParseETAs {
  cleanup() {}
  run() {
    const elements = document.querySelectorAll("table[class^='Fleet__table___'");
    elements.forEach((tableElem) => {
      const tableRows = Array.from(tableElem.getElementsByTagName("tbody")[0].children);
      tableRows.forEach((row) => {
        // find first entry that is no button but contains a span
        const targetRow = Array.from(row.children).reverse().find(elem =>
          elem.querySelector(":scope > span")
        );
        if (targetRow) {
          const childSpans = targetRow.getElementsByTagName("span");
          const textContent = childSpans[0].textContent.split('(')[0];
          const eta = convertDurationToETA(textContent);
          targetRow.appendChild(createTextSpan(` (${eta})`));
        }
      });
    });
  }
}
