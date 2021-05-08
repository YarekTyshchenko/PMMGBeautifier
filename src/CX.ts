import { Selector } from "./Selector";
import { genericCleanup, shorten, } from "./util";

export class CX {
    private tag = "pb-cx";
    cleanup() {
        genericCleanup(this.tag);
    }
    run() {
        // CXOB
        const elements = document.querySelectorAll(Selector.CXOBTable + " > tbody > tr > td");
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const text = element.textContent;
            const matches = text && text.match(/^NEO Charter Exploration Market Maker$/);
            if (matches) {
                element.textContent = shorten(text);
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

        // CXOS
        const orderCX = document.querySelectorAll(Selector.CXOrdersExchangeName);
        for (let i = 0; i < orderCX.length; i++) {
            const element = orderCX[i];
            const text = element.textContent;
            const matches = text && text.match(/Station Commodity Exchange$/);
            if (matches) {
                element.textContent = shorten(text);
            }
        }

        const orderAmountColumn = document.querySelectorAll(Selector.CXOrdersTable + " > thead > tr > th");
        for (let i = 0; i < orderAmountColumn.length; i++) {
            const element = orderAmountColumn[i];
            const text = element.textContent;
            const matches = text && text.match(/^Amount \(initial\)$/);
            if (matches) {
                element.textContent = "Amount \(i\)";
            }
        }

        const orderStatus = document.querySelectorAll(Selector.CXOrdersTable + " > tbody > tr > td:nth-of-type(7) > span");
        for (let i = 0; i < orderStatus.length; i++) {
            orderStatus[i].childNodes[0].parentElement!.removeAttribute("style");
            if (orderStatus[i].textContent == "partially filled" || orderStatus[i].textContent == "part fill") {
                orderStatus[i].textContent = "part fill";
                orderStatus[i].childNodes[0].parentElement!.style.color = "#d77342";
            }
        }

        const orderMatNameHeader = document.querySelector(Selector.CXOrdersTable + " > thead > tr > th:nth-of-type(4)") as HTMLElement;
        orderMatNameHeader.style.display = "None";

        const orderRows = document.querySelectorAll(Selector.CXOBTable + " > th");

        // !!! this works !!! nwwss refactoring
        /*
        const orderMatName = document.querySelectorAll(Selector.CXOrdersHeader + " > tbody > tr > td:nth-of-type(4) > span");
        for (let i = 0; i < orderStatus.length; i++) {
            orderMatName[i].parentElement!.style.display = "None";
        }

        const orderButtonsHeader = document.querySelector(Selector.CXOrdersHeader + " > thead > tr > th:nth-of-type(8)");
        const newHeader = document.createElement("th");
        newHeader.classList.add(this.tag);
        newHeader.textContent = "Value";
        orderButtonsHeader!.parentElement!.insertBefore(newHeader, orderButtonsHeader);

        const orderButtons = document.querySelectorAll(Selector.CXOrdersHeader + " > tbody > tr > td:nth-of-type(8)");
        for (let i = 0; i < orderButtons.length; i++) {
            const btnCell = orderButtons[i];
            const newCell = document.createElement("td");
            newCell.classList.add(this.tag);
            newCell.textContent = "asd";
            btnCell.parentElement!.insertBefore(newCell, btnCell);
        }
        */
    }
}