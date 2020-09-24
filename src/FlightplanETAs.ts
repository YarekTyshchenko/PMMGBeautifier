import {convertDurationToETA, createTextSpan, genericCleanup} from "./util";

export class FlightplanETAs {
  private tag = "pb-flightplan-eta";
  cleanup() {
    genericCleanup(this.tag);
  }
  run() {
    const elements = Array.from(document.querySelectorAll("table[class~='_2VAlxocH7EtoTdOjBzxulS']"));
    elements.forEach(tbody => {
      const targetRow = tbody.children[0].children[3];
      const eta = convertDurationToETA(targetRow.children[0].textContent);
      targetRow.appendChild(createTextSpan(` (${eta})`, this.tag))
    })
  }
}
