import { Selector } from "./Selector";
import { genericCleanup, shorten, toFixed } from "./util";

export class CXFX {
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
            const matches = text && text.match(/^(NEO Charter Exploration|Antares Initiative|Insitor Cooperative|Castillo-Ito Mercantile) Market Maker$/);
            if (matches) {
                element.textContent = shorten(text);
            }
        }

        // CXOB + FXOB
        const companies = Array.from(document.querySelectorAll(Selector.CXOBTable + " > tbody > tr > td > span")).concat(Array.from(document.querySelectorAll(Selector.FXOBTable + " > tbody > tr > td > span")));
        for (let i = 0; i < companies.length; i++) {
            const element = companies[i];
            const text = element.textContent;
            if (text!.length > 23) {
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

        workCXOSHeader(this.tag);
        workCXOSRows(this.tag);
    }
}

const hideMatNameColumn: boolean = true;
const addOrderValueColumn: boolean = true;

function workCXOSHeader(tag) {
    const CXOSHeader = document.querySelectorAll(Selector.CXOrdersTable + " > thead > tr")!;
    if (CXOSHeader) {
        Array.from(CXOSHeader).forEach((header) => {
            if (hideMatNameColumn) {
                const orderMatNameHeader = header.querySelector("th:nth-of-type(4)") as HTMLElement;
                orderMatNameHeader.style.display = "None";
            }
            if (addOrderValueColumn) {
                const orderStatusHeader = header.querySelector("th:nth-of-type(7)");
                const newHeader = document.createElement("th");
                newHeader.classList.add(tag);
                newHeader.textContent = "Value";
                header.insertBefore(newHeader, orderStatusHeader);
            }
        });
    }
}

function workCXOSRows(tag) {
    const orderRows = document.querySelectorAll(Selector.CXOrdersTable + " > tbody > tr");
    Array.from(orderRows).forEach((row) => {
        if (hideMatNameColumn) {
            const matNameCell = row.querySelector("td:nth-of-type(4)") as HTMLElement;
            matNameCell.style.display = "None";
        }
        if (addOrderValueColumn) {
            const orderStatusCell = row.querySelector("td:nth-of-type(7)");
            if (orderStatusCell!.childElementCount) {
                const amount = parseInt(row.querySelector("td:nth-of-type(5)")!.childNodes[0].textContent!.replace(/[,.]/g, ''));
                const unitPrice = parseInt(row.querySelector("td:nth-of-type(6)")!.childNodes[0].textContent!.replace(/[,.]/g, '')) / 100;
                const type = row.querySelector("td:nth-of-type(2)")!.textContent;
                const newCell = document.createElement("td");
                newCell.classList.add(tag);
                newCell.textContent = toFixed(amount * unitPrice, 2);
                newCell.style.textAlign = "right";
                if (type == "BUY") {
                    newCell.style.color = "#50c878";
                }
                if (type == "SELL") {
                    newCell.style.color = "#d0312d";
                }
                row.insertBefore(newCell, orderStatusCell);
            }
        }
    });
}