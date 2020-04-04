import { Style } from "./Style";
import { genericCleanup } from "./util";

/**
 * Sort Inventories by Code
 * TODO: only grab the inventory where the button was pressed
 */
export class SortInventory {
  private sortByCode: boolean = false;
  private tag = "pb-sort-by-code";
  private cleanups: Array<() => void> = [];

  cleanup() {
    this.cleanups.forEach((f, i) => {
      f();
      delete this.cleanups[i];
    });
    genericCleanup(this.tag);
  }

  run() {
    this.sortInventoriesByCode();
    this.addSortByCodeButton();
  }

  /**
   * Compare inventory grid or list items by they material code
   */
  private compareByCode(a: HTMLElement, b: HTMLElement) {
    const codeA = a.innerText.split("\n")[0]; // ignore upper and lowercase
    const codeB = b.innerText.split("\n")[0]; // ignore upper and lowercase
    return codeA.localeCompare(codeB);
  }

  private sortInventoryByCode(inventory: Element) {
    // Sort elements by code
    const sorted = Array.from(inventory.children).sort(this.compareByCode);
    // Clear inventory grid
    inventory.innerHTML = "";

    // Append sorted elements in order
    sorted.forEach(item => {
      inventory.appendChild(item);
    });
  }

  /**
   * Find every visible inventory grid or list and sort them
   */
  private sortInventoriesByCode() {
    if (!this.sortByCode) {
      return
    }
    const inventories = Array.from(document.querySelectorAll(
      "div[class^='InventoryView__grid__'], div[class^='InventoryView__list__']"
    ));
    inventories.forEach(inventory => this.sortInventoryByCode(inventory));
  }

  private sortByCodeOff = () => {
    this.sortByCode = false;
  };
  private sortByCodeOn = () => {
    this.sortByCode = true;
    this.sortInventoriesByCode();
  };

  private addSortByCodeButton() {
    const buttonContainer = Array.from(
      document.querySelectorAll(
        "div[class^='InventorySortControls__controls___']"
      )
    );
    buttonContainer.forEach(e => {
      const buttons = Array.from(e.children);
      if (buttons.length < 6) {
        const sortingButtons = buttons.splice(1, 5);
        // Attach "Off" listeners on all other buttons
        sortingButtons.forEach(button => {
          button.addEventListener("click", this.sortByCodeOff);
          this.cleanups.push(() => button.removeEventListener('click', this.sortByCodeOff));
        });
        const codeButton = this.createCodeButton() ;
        codeButton.addEventListener('click', this.sortByCodeOn );
        // Attach "On" listener to COD button
        this.cleanups.push(() => codeButton.removeEventListener('click', this.sortByCodeOn));

        e.appendChild(codeButton);
      }
    })
  }

  private createCodeButton() {
    const codeButton = document.createElement("div");
    codeButton.classList.add(Style.InventorySortControlsCriteria);
    codeButton.classList.add(this.tag);
    const title = document.createElement("div");
    const arrowSpace = document.createElement("div");
    arrowSpace.classList.add(Style.InventorySortControlsOrder);
    title.textContent = "COD";
    codeButton.appendChild(title);
    codeButton.appendChild(arrowSpace);
    return codeButton
  }
}
