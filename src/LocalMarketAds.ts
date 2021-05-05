import { Selector } from "./Selector";
import { createTextSpan, genericCleanup, toFixed, shorten, colorizeType } from "./util";

export class LocalMarketAds {
    private tag = "pb-lm-ads";
  cleanup() {
      genericCleanup(this.tag);
  }
  run() {
    const elements = document.querySelectorAll(Selector.LMCommodityAdText);

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const text = element.childNodes[0].textContent;
        const matches = text && text.match(/(?:BUYING|SELLING|B|S)\s*(\d+)\s.*\s@\s([\d,.]+)\s[A-Z]+/);
        if (matches) {
        const count = parseInt(matches[1]);
            const totalCents = parseInt(matches[2].replace(/[,.]/g, ''));
            const perItem = toFixed(totalCents / count / 100, 2);
            const entry = element.querySelector(Selector.LMCommodityAdInnerText)!;

            // get the data from the original element
            const adType = entry.childNodes[0].textContent;
            const ware = shorten(entry.childNodes[1].textContent!);
            const priceSpan = element.querySelector(Selector.LMCommodityAdInnerText + " > span")!;
            const timeLeft = entry.childNodes[6].textContent;

            //entry.insertBefore(colorizeType(entry.childNodes[0].textContent, this.tag)!, entry.childNodes[1]);
            
            //if (adType == "BUYING" || adType == "SELLING") {
                //entry.childNodes[0].textContent = shorten(entry.childNodes[0].textContent);
            //}
            //entry.childNodes[2].textContent = shorten(entry.childNodes[2].textContent);
            //priceSpan.appendChild(createTextSpan(` (${perItem} ea) `, this.tag));
            //entry.childNodes[4].textContent = "";
            //entry.childNodes[5].textContent = "";
            //entry.childNodes[6].textContent = "";
            entry.childNodes[0].parentElement!.style.display = "None";
            entry.parentElement!.appendChild(colorizeType(adType, this.tag)!);
            entry.parentElement!.appendChild(createTextSpan(ware + priceSpan.textContent + ` (${perItem} ea) ` + timeLeft, this.tag)).style.whiteSpace = "pre-wrap";
        }
    }
  }
}
