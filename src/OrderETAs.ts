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
                    const progress = (prodItems[i].querySelector("span[class='E1aHYdg2zdgvZCsPl3p9y _3RsFeLwUgZ4bFiiA1fteEe']"));
                    sumTime = sumTime + parseDuration(itemETA.textContent);
                    const eta = convertParsedDurationToETA(sumTime);
                    const etaTag = createTextSpan(` (${eta})`, this.tag);
                    if (progress) {
                        etaTag.style.color = "#b0b0b0";
                        progress.appendChild(etaTag);   
                    }
                    else {
                        prodItems[i].appendChild(etaTag);
                    }
                }
            }
        });
    }

}
