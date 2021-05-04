import { Selector } from "./Selector";
import { genericCleanup, shorten } from "./util";

export class CX {
    private tag = "pb-cx-ads";
    cleanup() {
        genericCleanup(this.tag);
    }
    run() {
        const elements = document.querySelectorAll(Selector.CXOBTable + " > tbody > tr > td");
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const text = element.textContent;
            const matches = text && text.match(/^NEO Charter Exploration Market Maker$/);
            if (matches) {
                element.textContent = shorten(text);
            }
        }

        const orderElements = document.querySelectorAll(Selector.CXOrdersExchangeName);
        for (let i = 0; i < orderElements.length; i++) {
            const element = orderElements[i];
            const text = element.textContent;
            const matches = text && text.match(/Station Commodity Exchange$/);
            if (matches) {
                element.textContent = shorten(text);
            }
        }

        const orderAmountColumn = document.querySelectorAll(Selector.CXOrdersHeader + " > thead > tr > th");
        for (let i = 0; i < orderAmountColumn.length; i++) {
            const element = orderAmountColumn[i];
            const text = element.textContent;
            const matches = text && text.match(/^Amount \(initial\)$/);
            if (matches) {
                element.textContent = "Amount \(i\)";
            }
        }

        const companies = document.querySelectorAll(Selector.CXOBTable + " > tbody > tr > td > span");
        for (let i = 0; i < companies.length; i++) {
            const element = companies[i];
            const text = element.textContent;
            if (text!.length > 25) {
                element.textContent = text!.substring(0, 23) + "\*";
            }
        }
    }
}