import {Selector} from "./Selector";
import {createTextSpan, genericCleanup, toFixed} from "./util";

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
      const matches = text && text.match(/(?:SHIPPING)\s([\d.]+)t\s\/\s([\d.]+)m³\s@\s([\d,.]+)\s[A-Z]+\sfrom/);

      if (matches && matches.length > 3) {
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
        const perItem = toFixed(totalCents / count / 100 * 400, 2);
        const priceSpan = element.querySelector(Selector.LMCommodityAdPriceSpan)!;
        priceSpan.appendChild(createTextSpan(` (${perItem} per 400${unit})`, this.tag));
      }
    }
  }
}
