import {Selector} from "./Selector";
import {Style} from "./Style";
import {createTextSpan, genericCleanup, toFixed} from "./util";

export class PostLM {
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

      // Change CMD to better reflect what we are doing
      const type = document.evaluate(
        "div[label/span[text()='Type']]/div/div",
        form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue as HTMLElement;
      const postButton = document.evaluate(
        "div/div/button[text()='post']",
        form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue as HTMLInputElement;

      if (type && postButton) {
        switch (type.innerText) {
          case "BUYING":
            this.changeButton(postButton, Style.ButtonSuccess, "Buy");
            break;
          case "SELLING":
            this.changeButton(postButton, Style.ButtonDanger, "Sell");
            break;
        }
      }
    })
  }

  private changeButton(button: HTMLElement, className: string[], text: string) {
    button.classList.remove(...Style.ButtonPrimary);
    button.classList.add(...className);
    this.cleanups.push(() => {
      button.classList.remove(...className);
      button.classList.add(...Style.ButtonPrimary);
    });

    // innerHtml required, as there is some sort of a transform that upper cases all text
    const originalText = button.innerHTML;
    button.innerHTML = text;
    this.cleanups.push(() => button.innerHTML = originalText);
  }
}
