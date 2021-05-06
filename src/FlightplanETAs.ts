import {convertDurationToETA, createTextSpan, genericCleanup} from "./util";

export class FlightplanETAs {
    private tag = "pb-flightplan-eta";
    cleanup() {
        genericCleanup(this.tag);
    }
    run() {
        const elements = Array.from(document.querySelectorAll("table[class='_1g8dfBRzDAqRXFqRvSaL75 _2Fog1ad46aZ4q-RoEgK3R6 _1vWRpdI8cKNMPyOPnzlXgX _33A_5lETf4HBqwJi_q-jhZ'] > tbody > tr"));
        elements.forEach(destinationRow => {
            const targetRow = destinationRow.children[3];
            const eta = convertDurationToETA(targetRow.children[0].textContent);
            targetRow.appendChild(createTextSpan(` (${eta})`, this.tag))
        })
    }
}
