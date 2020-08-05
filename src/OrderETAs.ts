import {convertDurationToETA, createTextSpan, genericCleanup} from "./util";

export class OrderETAs {
  private tag = "pb-order-eta";

  cleanup() {
    genericCleanup(this.tag);
  }

  run() {
    this.beautifyOrders();
    this.beautifyProductionQueue();
  }

  /**
   * Parse all orders (PROD Screen)
   * @private
   */
  private beautifyOrders() {
    const elements = Array.from(document.querySelectorAll("div[class^='OrderSlot__info___'"));
    elements.forEach((order) => {
      // we are only interested in active orders, so check for progress bar first
      if (order.querySelectorAll("span[class^='OrderStatus__inProgress___'").length > 0) {
        const etaSpan = order.getElementsByTagName("span")[1].children[0];
        this.beautifyEta(etaSpan);
      }
    });
  }

  /**
   * Parse all ProdQ orders
   * @private
   */
  private beautifyProductionQueue() {
    const elements = Array.from(document.querySelectorAll("tr > td[class^='ProductionQueue__orderTile___'"));
    elements.forEach((order) => {
      const tableRow = order.parentElement!!;
      // we are only interested in active orders, so check for progress bar first
      if(tableRow.querySelectorAll("span[class^='OrderStatus__inProgress___'").length > 0) {
        const etaSpan = tableRow.children[4].children[0].children[0];
        this.beautifyEta(etaSpan);
      }
    });
  }
  private beautifyEta(etaSpan: Node){
    const eta = convertDurationToETA(etaSpan.textContent);
    etaSpan.parentElement!!.appendChild(createTextSpan(` (${eta})`, this.tag));
  }

}
