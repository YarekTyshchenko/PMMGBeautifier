import {Module} from "./ModuleRunner";
import {convertDurationToETA, createTextSpan, genericCleanup, getBuffer} from "./util";

export class FlightETAs implements Module {
  private tag = "pb-sfc-eta";
  cleanup() {
    genericCleanup(this.tag);
  }
  run() {
    const buffer = getBuffer("SFC ");
    if (buffer == undefined) return;

    const elements = Array.from(buffer.querySelectorAll("table > tbody > tr"));
    elements.forEach(targetRow => {
      const etaData = targetRow.children[3];
      if (etaData.textContent != "") {
        const eta = convertDurationToETA(etaData.textContent);
        etaData.appendChild(createTextSpan(` (${eta})`, this.tag))
      }
    })
  }
}
