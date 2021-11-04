import { Selector } from "./Selector";
import { convertParsedDurationToETA, createTextSpan, genericCleanup, parseDuration } from "./util";

export class ProdLine {
  private tag = "pb-prod";

  cleanup() {
      genericCleanup(this.tag);
  }

  run() {
      this.beautifyAggregateProductionQueue();
      workProdLineColumn();
  }

    private beautifyAggregateProductionQueue() {
        const prodLines = Array.from(document.querySelectorAll(Selector.ProdLineItem));
        prodLines.forEach(line => {
            const prodItems = Array.from(line.querySelectorAll("div[class='_1a75pC9Q0YF44bObHykWIA']"));
            var sumTimes = Array();
            prodItems.forEach(item => {
                const itemETA = (item.querySelector("div[class='_1j-lU9fMFzEgedyKKsPDtL _3dW9W1Qi1zDylwVf7nNSih'] > span"));
                if (itemETA && itemETA.textContent && !itemETA.textContent.match(/ago$/)) {
                    const progress = item.querySelector("span:nth-of-type(2)");
                    const etaValue = parseDuration(itemETA.textContent);
                    if (etaValue > 0 && progress && progress != (item.querySelector("span[class='_29auS2ZKnkxm6ry4JazqA6 _1iuItXb2L31l1pCXU2swIX']") || item.querySelector("span[class='_1NuzUEirp5PyigpJY2QYGp _2M0A1DQeA4eEP7b3VGuxl_']"))) { // this item is already being produced, need to use the current value
                        if (progress == (item.querySelector("span[class='E1aHYdg2zdgvZCsPl3p9y _3RsFeLwUgZ4bFiiA1fteEe']") || item.querySelector("span[class='_2KbBUUZxADDNHtAW9ouHrP _1UD8Nq_edzxyMXDliVlb9d']"))) {
                            const eta = convertParsedDurationToETA(etaValue);
                            if (progress.parentElement && eta) {
                                const etaTag = createTextSpan(` (${eta})`, this.tag);
                                etaTag.style.position = "relative";
                                etaTag.style.zIndex = "1";
                                item.appendChild(etaTag);
                                sumTimes.push(etaValue);
                            }
                        }
                    }
                    else if (etaValue && sumTimes.length > 0) { // item is in the queue, need to find the earliest slot it can start and add it there
                        const lowestEta = Math.min(...sumTimes);
                        const summedEta = lowestEta + etaValue;
                        sumTimes[sumTimes.indexOf(lowestEta)] = summedEta;
                        const eta = convertParsedDurationToETA(summedEta);
                        if (item && eta) {
                            item.appendChild(createTextSpan(` (${eta})`, this.tag));
                        }
                    }
                }
            })
        });
    }

}

const narrowProdLineColumn: boolean = true;

function workProdLineColumn() {
    const prodLineHeaders = Array.from(document.querySelectorAll(Selector.ProdLineHeader));
    const prodLineItems = Array.from(document.querySelectorAll(Selector.ProdLineItem));
    const prodLineDetails = Array.from(document.querySelectorAll("div[class='_3DTrsPMU_E7m4v9TrUCKI7 _2NKqmMbW69tQxqvJOvKvLL']"));
    if (prodLineHeaders && prodLineItems) {
        if (narrowProdLineColumn) {
            prodLineHeaders.forEach(header => {
                const box = header as HTMLElement;
                box.classList.remove('_2NKqmMbW69tQxqvJOvKvLL');
                box.style.width = "110px";
            })
            prodLineItems.forEach(item => {
                const box = item as HTMLElement;
                box.classList.remove('_2NKqmMbW69tQxqvJOvKvLL');
                box.style.width = "110px";
            })
            prodLineDetails.forEach(details => {
                const box = details as HTMLElement;
                box.classList.remove('_2NKqmMbW69tQxqvJOvKvLL');
                box.style.width = "110px";
            })
        }
    }
}