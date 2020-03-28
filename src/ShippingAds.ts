import {createTextSpan, genericCleanup, toFixed} from "./util";

export class ShippingAds {
  private tag = "pb-shipping-ads";
  cleanup() {
    genericCleanup(this.tag);
  }
  run() {
    const elements = document.querySelectorAll("div[class^='CommodityAd__text___']");

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const text = element.textContent;
      const matches = text.match(/(?:SHIPPING)\s([\d.]+)t\s\/\s([\d.]+)m³\s@\s([\d,.]+)\s[A-Z]+\sfrom/);

      if (matches && matches.length > 3) {
        const totalCost = matches[3];
        const tonnage = matches[1];
        const size = matches[2];
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
        const priceSpan = element.children[0].children[2];
        priceSpan.appendChild(createTextSpan(` (${perItem*400} per 400${unit})`, this.tag));
      }
    }
  }
}
