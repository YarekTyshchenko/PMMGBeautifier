import {convertDurationToETA, createTextSpan, genericCleanup} from "./util";

export class FlightplanETAs {
    private tag = "pb-flightplan-eta";
    cleanup() {
        genericCleanup(this.tag);
    }
    run() {
        const elements = Array.from(document.querySelectorAll("div[class='_1T3GrusQ2ydTsNKeMaEfPl'] div > div > div > div > div > div > table > tbody > tr"));
        elements.forEach(destinationRow => {
            const targetRow = destinationRow.children[7];
            if (targetRow.children[0] && targetRow.children[0].textContent) {
                const eta = convertDurationToETA(targetRow.children[0].textContent);
                targetRow.appendChild(createTextSpan(` (${eta})`, this.tag))
            }
        })
    }
}
