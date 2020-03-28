import { convertDurationToETA, createTextSpan } from "./util";

export class OrderETAs {
  cleanup() {}
  run() {
    const elements = document.querySelectorAll("div[class^='OrderSlot__info___'");
    elements.forEach((order) => {
      // we are only interested in active orders, so check for progress bar first
      if (order.querySelectorAll("span[class^='OrderStatus__inProgress___'").length > 0) {
        const etaSpan = order.getElementsByTagName("span")[1].children[0];
        const eta = convertDurationToETA(etaSpan.textContent);
        order.appendChild(createTextSpan(` (${eta})`));
      }
    });
  }
}
