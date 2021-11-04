import {convertDurationToETA, createTextSpan, genericCleanup, getBuffer} from "./util";

/**
 * Parse Fleet ETA times and add the actual date-time of arrival
 */
export class FleetETAs {
  private tag = "pb-flt-eta";
  cleanup() {
    genericCleanup(this.tag);
  }
  run() {
    const buffer = getBuffer("FLT");
    if (buffer == undefined) return;

    const elements = Array.from(buffer.querySelectorAll("table > tbody > tr"));
    elements.forEach(targetRow => {
      const etaData = targetRow.children[7];
      if (etaData.textContent != "") {
        const eta = convertDurationToETA(etaData.textContent);
        etaData.appendChild(createTextSpan(` (${eta})`, this.tag))
      }
    })
  }
}
