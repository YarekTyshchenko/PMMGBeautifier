import { genericCleanup } from "./util";

/**
 * Sort Inventories by Code
 * TODO: only grab the inventory where the button was pressed
 */
export class OrderInventory {
  private sortByCode: boolean = false;
  private tag = "sort-by-code";
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



  private sortInventoriesByCode() {
    if (this.sortByCode) {
      const inventories = Array.from(
        document.querySelectorAll("div[class^='InventoryView__grid__'")
      );

      inventories.forEach(inventory => {
        let sorted = Array.from(inventory.children).sort(function(
          a: HTMLElement,
          b: HTMLElement
        ) {
          let codeA = a.innerText.split("\n")[0]; // ignore upper and lowercase
          let codeB = b.innerText.split("\n")[0]; // ignore upper and lowercase
          if (codeA < codeB) {
            return -1;
          }
          if (codeA > codeB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        inventory.innerHTML = "";

        sorted.forEach(item => {
          inventory.appendChild(item);
        });
      });
    }
  }



  private addSortByCodeButton() {
    const buttonContainer = Array.from(
      document.querySelectorAll(
        "div[class^='InventorySortControls__controls___'"
      )
    );
    const sortByCodeOff = () => {
      this.sortByCode = false
    }
    const sortByCodeOn = () => {
      this.sortByCode = true
    }
    buttonContainer.forEach(e => {
        let buttons = Array.from(e.children);
        let numButtons = buttons.length;
        if (numButtons < 6) {
          let sortingButtons = buttons.splice(1, 5);
          console.log(sortingButtons);
          sortingButtons.forEach(button => {
            button.addEventListener("click", sortByCodeOff);
          });
          let codeButton = document.createElement("div");
          codeButton.classList.add("InventorySortControls__criteria___1UBEZGp");
          codeButton.classList.add(this.tag);
          let title = document.createElement("div");
          title.classList.add(this.tag);
          let arrowSpace = document.createElement("div");
          arrowSpace.classList.add(this.tag);
          arrowSpace.classList.add("InventorySortControls__order___2snExpX");
          title.textContent = "COD";
          codeButton.appendChild(title);
          codeButton.appendChild(arrowSpace);
          codeButton.addEventListener('click', sortByCodeOn );

          e.appendChild(codeButton);

          this.cleanups.push(() => codeButton.removeEventListener('click', sortByCodeOn))

          sortingButtons.forEach(button => {
            this.cleanups.push(() => button.removeEventListener('click', sortByCodeOff));
          });
        }
      }
    )}}
