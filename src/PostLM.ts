import {Module} from "./ModuleRunner";
import {Selector} from "./Selector";
import {createTextSpan, genericCleanup, toFixed} from "./util";

export class PostLM implements Module {
  private tag = "pb-post-lm-price";
  private cleanups: Array<() => void> = [];

  cleanup() {
    this.cleanups.forEach((f, i) => {
      f();
      delete this.cleanups[i];
    });
    genericCleanup(this.tag);
  }
  run() {
    Array.from(document.querySelectorAll(Selector.LMPostForm)).forEach(form => {
      const amountInput = document.evaluate("div[label/span[text()='Amount']]//input", form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLInputElement;

      const totalPriceInput = document.evaluate("div[label/span[text()='Total price']]//input", form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLInputElement;

      const displayElement = createTextSpan('-- ea', this.tag);
      totalPriceInput.parentNode!.insertBefore(displayElement, totalPriceInput);

      const calculatePricePerUnit = () => {
        const amount = parseInt(amountInput.value);
        const total = parseInt(totalPriceInput.value);
        displayElement.textContent = `${toFixed(total / amount, 1)} ea`;
      };
      calculatePricePerUnit();

      // Attach handlers to both of them
      [amountInput, totalPriceInput].map(input => {
        input.addEventListener('beforeinput', calculatePricePerUnit);
        this.cleanups.push(() => input.removeEventListener('beforeinput', calculatePricePerUnit));
      })
    })
  }
}
