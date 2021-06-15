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
            const prodItems = Array.from(line.querySelectorAll("div[class='_1a75pC9Q0YF44bObHykWIA']"));
            let sumTimes = Array();
            for (let i = 0; i < prodItems.length; i++) {
                const itemETA = (prodItems[i].querySelector("div[class='_2wCEB4yaom4TdA4cxLZhbr'] div[class='_1j-lU9fMFzEgedyKKsPDtL _3dW9W1Qi1zDylwVf7nNSih'] > span"));
                if (itemETA) {
                    const progress = (prodItems[i].querySelector("span:nth-of-type(2)") && (prodItems[i].querySelector("span[class='E1aHYdg2zdgvZCsPl3p9y _3RsFeLwUgZ4bFiiA1fteEe']") || prodItems[i].querySelector("span[class='_2KbBUUZxADDNHtAW9ouHrP _1UD8Nq_edzxyMXDliVlb9d']")));
                    const etaValue = parseDuration(itemETA.textContent);
                    if (progress) { // this item is already being produced, need to use the current value
                        const eta = convertParsedDurationToETA(etaValue);
                        const etaTag = createTextSpan(` (${eta})`, this.tag);
                        if (progress.parentElement && etaTag) {
                            progress.parentElement.appendChild(etaTag);
                            sumTimes.push(etaValue);
                        }
                    }
                    else { // item is in the queue, need to find the earliest slot it can start and add it there
                        const lowestEta = Math.min(...sumTimes);
                        const summedEta = lowestEta + etaValue;
                        sumTimes[sumTimes.indexOf(lowestEta)] = summedEta;
                        const eta = convertParsedDurationToETA(summedEta);
                        if (prodItems[i] && eta) {
                            prodItems[i].appendChild(createTextSpan(` (${eta})`, this.tag));
                        }
                    }
                }
            }
        });
    }

}
