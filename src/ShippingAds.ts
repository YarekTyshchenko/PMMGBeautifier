import {Selector} from "./Selector";
import {createTextSpan, genericCleanup, toFixed, colorizeType} from "./util";

export class ShippingAds {
  private tag = "pb-shipping-ads";
  cleanup() {
    genericCleanup(this.tag);
  }
  run() {
    const elements = document.querySelectorAll(Selector.LMCommodityAdText);

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const text = element.textContent;
        const matches = text && text.match(/(?:SHIPPING)\s*([\d.]+)t\s\/\s([\d.]+)m³\s@\s([\d,.]+)\s[A-Z]+/);
        if (matches) {
        const totalCost = matches[3];
        const tonnage = parseFloat(matches[1]);
        const size = parseFloat(matches[2]);
        var unit;
        var count;
        if(tonnage > size){
          unit = 't';
          count = tonnage;
        } else {
          unit = 'm³';
          count = size;
        }
        const totalCents = parseInt(totalCost.replace(/[,.]/g, ''));
        const perItem = toFixed(totalCents / count / 100, 2);
            const entry = element.querySelector(Selector.LMCommodityAdInnerText)!;
            let shownEntry = entry.cloneNode(true) as HTMLElement;
            const priceSpan = shownEntry.querySelector(Selector.LMCommodityAdInnerText + " > span")!;

            priceSpan.appendChild(createTextSpan(` (${perItem}/${unit})`, this.tag));

            entry.childNodes[0].parentElement!.style.display = "None";
            shownEntry.removeAttribute("style");

            shownEntry.classList.add(this.tag);
            shownEntry.replaceChild(colorizeType("SHIPPING", this.tag)!, shownEntry.childNodes[0]);
            shownEntry.childNodes[1].textContent = ` ` + shownEntry.childNodes[1].textContent;
            shownEntry.childNodes[6].textContent = `\n`;
            shownEntry.childNodes[7].textContent = shownEntry.childNodes[7].textContent!.replace(/ *\([^)]*\) */g, "");
            shownEntry.childNodes[8].textContent = `->`;
            shownEntry.childNodes[9].textContent = shownEntry.childNodes[9].textContent!.replace(/ *\([^)]*\) */g, "\s");
            shownEntry.removeChild(shownEntry.childNodes[10]);
            shownEntry.style.whiteSpace = "pre-wrap";
            entry.parentElement!.appendChild(shownEntry);
        }
    }
  }
}
