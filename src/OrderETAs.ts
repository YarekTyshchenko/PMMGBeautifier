import { Selector } from "./Selector";
import { convertParsedDurationToETA, createTextSpan, genericCleanup, parseDuration } from "./util";

export class OrderETAs {
  private tag = "pb-order-eta";

  cleanup() {
    genericCleanup(this.tag);
  }

  run() {
    //this.beautifyOrders();
      //this.beautifyProductionQueue();
      this.beautifyAggregateProductionQueue();
  }

  /**
   * Parse all orders (PROD Screen)
   * @private
   */
    /*
  private beautifyOrders() {
    const elements = Array.from(document.querySelectorAll("div[class~='_1a75pC9Q0YF44bObHykWIA'] div[class~='_1j-lU9fMFzEgedyKKsPDtL']"));
    elements.forEach(etaDiv => {
        const etaSpan = etaDiv.querySelector("span");
        //console.warn(etaSpan!.textContent, elements.indexOf(etaDiv));
        if (etaSpan) {
        this.beautifyEta(etaSpan);
      }
    });
  }

  /**
   * Parse all ProdQ orders
   * @private
   */
    /*
    private beautifyProductionQueue() {
        const tables = Array.from(document.querySelectorAll("table[class~='B5JEuqpNoN-VT8jmA8g3l']"));
        tables.forEach(table => {
      // Select 4th row, which should contain the ETA
      const rows = Array.from(table.querySelectorAll("tbody > tr"))
      rows.forEach(row => {
          const etaCell = row.querySelectorAll("td").item(4);
        if (etaCell) {
          const etaSpan = etaCell.querySelector("span")
          if (etaSpan) {
            this.beautifyEta(etaSpan);
          }
        }
      });
    });
    }
    */

    private beautifyAggregateProductionQueue() {
        const prodLines = Array.from(document.querySelectorAll(Selector.ProdLine));
        prodLines.forEach(line => {
            const prodItems = Array.from(line.querySelectorAll(Selector.ProdLineItem));
            let sumTime = 0;
            for (let i = 0; i < prodItems.length; i++) {
                const itemETA = (prodItems[i].querySelector(Selector.ProdLineItemETA));
                if (itemETA) {
                    //if (i == 1) { console.warn(itemETA) };
                    sumTime = sumTime + parseDuration(itemETA.textContent);
                    //console.warn(i, prodItems.length, prodItems[i].childNodes[0]);
                    const eta = convertParsedDurationToETA(sumTime);
                    prodItems[i].appendChild(createTextSpan(` (${eta})`, this.tag));
                }
            }
        });
    }

  /*private beautifyEta(etaSpan: Node){
      const eta = convertDurationToETA(etaSpan.textContent);
    etaSpan.parentElement!.appendChild(createTextSpan(` (${eta})`, this.tag));
  }*/

}
