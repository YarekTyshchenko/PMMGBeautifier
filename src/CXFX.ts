import { Selector } from "./Selector";
import { genericCleanup, shorten, toFixed, getBuffers } from "./util";

export class CXFX {
    private tag = "pb-cx";
    cleanup() {
        genericCleanup(this.tag);
    }
    run() {
        var CXOBBuffers = getBuffers("CXOB");
        var FXOBBuffers = getBuffers("FXOB");
        var CXOSBuffers = getBuffers("CXOS");

        CXOBBuffers.forEach(buffer => {
            const traderNames = buffer.querySelectorAll(Selector.CXOBTable + " > tbody > tr > td > span");
            traderNames.forEach(name => {
                if (name.classList.contains('_3ifriA33o8WAhdFSaIgqWi')) {
                    shortenCompanyName(name);
                }
                else {
                    shortenMMName(name);
                }
            });
        });

        FXOBBuffers.forEach(buffer => {
            const traderNames = buffer.querySelectorAll(Selector.CXOBTable + " > tbody > tr > td > span[class='_3ifriA33o8WAhdFSaIgqWi']");
            traderNames.forEach(name => {
                shortenCompanyName(name);
            })
        });

        CXOSBuffers.forEach(buffer => {
            workCXOSHeader(buffer, this.tag);
            workCXOSRows(buffer, this.tag);
        });
    }
}

function shortenMMName(name) {
    const text = name.textContent;
    const matches = text && text.match(/^(NEO Charter Exploration|Antares Initiative|Insitor Cooperative|Castillo-Ito Mercantile) Market Maker$/);
    if (matches) {
        name.textContent = shorten(text);
    }
}

function shortenCompanyName(name) {
    const text = name.textContent;
    if (text!.length > 23) {
        name.textContent = text!.substring(0, 23) + "\*";
    }
}

const hideMatNameColumn: boolean = true;
const addOrderValueColumn: boolean = true;

function workCXOSHeader(buffer, tag) {
    const CXOSHeader = buffer.querySelector("thead > tr")!;
    if (CXOSHeader) {
        const orderAmountHeader = CXOSHeader.querySelector("th:nth-of-type(5)");
        if (orderAmountHeader.textContent) {
            orderAmountHeader.textContent = "Amount \(i\)";
        }
        if (hideMatNameColumn) {
            const orderMatNameHeader = CXOSHeader.querySelector("th:nth-of-type(4)");
            orderMatNameHeader.style.display = "None";
        }
        if (addOrderValueColumn) {
            const orderStatusHeader = CXOSHeader.querySelector("th:nth-of-type(7)");
            const newHeader = document.createElement("th");
            newHeader.classList.add(tag);
            newHeader.textContent = "Value";
            CXOSHeader.insertBefore(newHeader, orderStatusHeader);
        }
    }
}

function workCXOSRows(buffer, tag) {
    const orderRows = buffer.querySelectorAll("tbody > tr") as HTMLElement[];
    Array.from(orderRows).forEach((row) => {
        const exchangeNameCell = row.querySelector("td:nth-of-type(1) > span");
        if (exchangeNameCell) {
            const text = exchangeNameCell.textContent;
            if (text && text.match(/Station Commodity Exchange$/)) {
                exchangeNameCell.textContent = shorten(text);
            }
        }
        if (hideMatNameColumn) {
            const matNameCell = row.querySelector("td:nth-of-type(4)") as HTMLElement;
            if (matNameCell) {
                matNameCell.style.display = "None";
            }
        }
        const orderStatusCell = row.querySelector("td:nth-of-type(7)");
        if (orderStatusCell) {
            const orderStatusText = orderStatusCell.querySelector("span");
            if (orderStatusText) {
                orderStatusText.childNodes[0].parentElement!.removeAttribute("style");
                if (orderStatusText.textContent == "partially filled" || orderStatusText.textContent == "part fill") {
                    orderStatusText.textContent = "part fill";
                    orderStatusText.childNodes[0].parentElement!.style.color = "#d77342";
                }
            }
        }
        if (addOrderValueColumn) {
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