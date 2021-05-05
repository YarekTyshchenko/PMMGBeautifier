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

            // get the data from the original element
            const ware = entry.childNodes[1].textContent! + entry.childNodes[2].textContent! + entry.childNodes[3].textContent + entry.childNodes[4].textContent;
            const priceSpan = element.querySelector(Selector.LMCommodityAdInnerText + " > span")!;
            const from = entry.childNodes[7].textContent;
            const to = entry.childNodes[9].textContent;
            const timeLeft = entry.childNodes[11].textContent;

          //entry.insertBefore(colorizeType("SHIPPING", this.tag)!, entry.childNodes[1]);
              //entry.childNodes[0].textContent = "I";
          //priceSpan.appendChild(createTextSpan(` (${perItem}/${unit})`, this.tag));
//            entry.childNodes[11].textContent = "";

            //entry.insertBefore(colorizeType(entry.childNodes[0].textContent, this.tag)!, entry.childNodes[1]);

            //if (adType == "BUYING" || adType == "SELLING") {
            //entry.childNodes[0].textContent = shorten(entry.childNodes[0].textContent);
            //}
            //entry.childNodes[2].textContent = shorten(entry.childNodes[2].textContent);
            //priceSpan.appendChild(createTextSpan(` (${perItem} ea) `, this.tag));

            entry.childNodes[0].parentElement!.style.display = "None";
            entry.parentElement!.appendChild(colorizeType("SHIPPING", this.tag)!);
            entry.parentElement!.appendChild(createTextSpan(` ` + ware + priceSpan.textContent + ` (${perItem}/${unit}) from ` + from + ` to ` + to + ` ` + timeLeft, this.tag)).style.whiteSpace = "pre-wrap";
      }
    }
  }
}
