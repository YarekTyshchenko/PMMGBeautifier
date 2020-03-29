import {createTextSpan, genericCleanup, toFixed} from "./util";

export class LocalMarketAds {
  private tag = "pb-lm-ads";
  cleanup() {
    genericCleanup(this.tag);
  }
  run() {
    const elements = document.querySelectorAll("div[class^='CommodityAd__text___'");

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const text = element.textContent;
      const matches = text && text.match(/(?:BUYING|SELLING)\s(\d+)\s.*\s@\s([\d,.]+)\s[A-Z]+\sfor/);
      if (matches && matches.length > 2) {
        const count = parseInt(matches[1]);
        const totalCents = parseInt(matches[2].replace(/[,.]/g, ''));
        const perItem = toFixed(totalCents / count / 100, 2);
        const priceSpan = element.children[0].children[1];
        priceSpan.appendChild(createTextSpan(` (${perItem} ea)`, this.tag));
      }
    }
  }
}
