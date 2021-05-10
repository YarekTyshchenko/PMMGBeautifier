import { Selector } from "./Selector";
import { createTextSpan, genericCleanup, toFixed, colorizeType } from "./util";
import { shortenMatName } from "./DB";

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

        const matches = text && text.match(/(?:BUYING|SELLING)\s*(\d+)\s(.*)\s@\s([\d,.]+)\s[A-Z]+/);
        if (matches) {
            const count = parseInt(matches[1]);
            const totalCents = parseInt(matches[3].replace(/[,.]/g, ''));
            const perItem = toFixed(totalCents / count / 100, 2);
            const entry = element.querySelector(Selector.LMCommodityAdInnerText)!;
            let shownEntry = entry.cloneNode(true) as HTMLElement;

            const adType = entry.childNodes[0].textContent;
            const priceSpan = shownEntry.querySelector(Selector.LMCommodityAdInnerText + " > span")!;

            priceSpan.appendChild(createTextSpan(` (${perItem} ea) `, this.tag));
            entry.childNodes[0].parentElement!.style.display = "None";
            shownEntry.removeAttribute("style");

            shownEntry.classList.add(this.tag);
            shownEntry.replaceChild(colorizeType(adType, this.tag)!, shownEntry.childNodes[0]);
            shownEntry.childNodes[1].textContent = ` ${count} ${shortenMatName(matches[2])} `;
            shownEntry.childNodes[3].textContent = "";
            shownEntry.childNodes[4].textContent = "";
            shownEntry.childNodes[5].textContent = "";

            entry.parentElement!.appendChild(shownEntry);
        }
    }
  }
}
