import {convertDurationToETA, createTextSpan, genericCleanup} from "./util";

export class OrderETAs {
  private tag = "pb-order-eta";
  cleanup() {
    genericCleanup(this.tag);
  }
  run() {
    const elements = Array.from(document.querySelectorAll("div[class^='OrderSlot__info___'"));
    elements.forEach((order) => {
      // we are only interested in active orders, so check for progress bar first
      if (order.querySelectorAll("span[class^='OrderStatus__inProgress___'").length > 0) {
        const etaSpan = order.getElementsByTagName("span")[1].children[0];
        const eta = convertDurationToETA(etaSpan.textContent);
        order.appendChild(createTextSpan(` (${eta})`, this.tag));
      }
    });
  }
}
