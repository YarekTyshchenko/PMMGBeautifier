import {Selector} from "./Selector";
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
    const elements = Array.from(document.querySelectorAll(Selector.ProdItem));
    elements.forEach(etaDiv => {
      const etaSpan = etaDiv.querySelector("span")
      if (etaSpan) {
        this.beautifyEta(etaSpan);
      }
    });
  }

  /**
   * Parse all ProdQ orders
   * @private
   */
  private beautifyProductionQueue() {
    const tables = Array.from(document.querySelectorAll(Selector.ProdQueueTable));
    tables.forEach(table => {
      // Select 4th row, which should contain the ETA
      const rows = Array.from(table.querySelectorAll("tbody > tr"))
      rows.forEach(row => {
        const etaCell = row.querySelectorAll("td").item(5)
        if (etaCell) {
          const etaSpan = etaCell.querySelector("span")
          if (etaSpan) {
            this.beautifyEta(etaSpan);
          }
        }
      });
    });
  }
  private beautifyEta(etaSpan: Node){
    const eta = convertDurationToETA(etaSpan.textContent);
    etaSpan.parentElement!.appendChild(createTextSpan(` (${eta})`, this.tag));
  }

}
