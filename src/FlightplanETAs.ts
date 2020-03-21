import {convertDurationToETA, createTextSpan} from "./util";

export class FlightplanETAs {
  cleanup() {}
  run() {
    const elements = document.querySelectorAll("tbody[class^='MissionPlan__stats___'");
    elements.forEach((tbody) => {
      const targetRow = tbody.children[0].children[3];
      const eta = convertDurationToETA(targetRow.children[0].textContent);
      targetRow.appendChild(createTextSpan(` (${eta})`))
    })
  }
}
