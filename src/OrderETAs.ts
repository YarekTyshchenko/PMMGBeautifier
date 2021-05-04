import { Selector } from "./Selector";
import { convertParsedDurationToETA, createTextSpan, genericCleanup, parseDuration } from "./util";

export class OrderETAs {
  private tag = "pb-order-eta";

  cleanup() {
    genericCleanup(this.tag);
  }

  run() {
      this.beautifyAggregateProductionQueue();
  }

    private beautifyAggregateProductionQueue() {
        const prodLines = Array.from(document.querySelectorAll(Selector.ProdLine));
        prodLines.forEach(line => {
            const prodItems = Array.from(line.querySelectorAll(Selector.ProdLineItem));
            let sumTime = 0;
            for (let i = 0; i < prodItems.length; i++) {
                const itemETA = (prodItems[i].querySelector(Selector.ProdLineItemData + " > span"));
                if (itemETA) {
                    sumTime = sumTime + parseDuration(itemETA.textContent);
                    const eta = convertParsedDurationToETA(sumTime);
                    prodItems[i].appendChild(createTextSpan(` (${eta})`, this.tag));
                }
            }
        });
    }

}
