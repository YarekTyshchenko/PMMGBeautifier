import {Style} from "./Style";

export class PostLMButton {
  private cleanups: Array<() => void> = [];

  cleanup() {
    this.cleanups.forEach((f, i) => {
      f();
      delete this.cleanups[i];
    });
  }

  private changeButton(button: HTMLElement, className: string, text: string) {
    button.classList.remove(Style.ButtonPrimary);
    button.classList.add(className);
    this.cleanups.push(() => {
      button.classList.remove(className);
      button.classList.add(Style.ButtonPrimary);
    });
    Array.from(button.querySelectorAll("span")).forEach((b: HTMLElement) => {
      // innerHtml required, as there is some sort of a transform that upper cases all text
      const originalText = b.innerHTML;
      b.innerHTML = text;
      this.cleanups.push(() => b.innerHTML = originalText);
    });
  }

  run() {
    Array.from(document.querySelectorAll("div[class^='LocalMarketPost__container___']")).forEach(postContainer => {
      const type = document.evaluate(
        "div/article/div/div/form/div[label/span/span[text()='Type']]/div/div",
        postContainer, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue as HTMLElement;
      const postButton = document.evaluate(
        "div/article/div/div/form/div/div/button[span[text()='post']]",
        postContainer, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
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
    });
  }
}
