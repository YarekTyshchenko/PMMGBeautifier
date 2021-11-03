import {convertDurationToETA, createTextSpan, genericCleanup} from "./util";

/**
 * Parse all ETA times and add the actual date-time of arrival
 */
export class ParseETAs {
		private tag = "pb-other-etas";
		cleanup() {
				genericCleanup(this.tag);
		}
		run() {
				var xpath = "//div[@class='_3ax11KjMIqVfK5lZnj8GLw _32tEvYagqJBRvv-BrnI4J5'][text()='Fleet']";
				var matchingBuffers = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var i = 0; i < matchingBuffers.snapshotLength; i++) {
						var buffer = matchingBuffers.snapshotItem(i);
						if (buffer && buffer.parentElement) {
								var fleetBuffer = buffer.parentElement.parentElement!;
								const etaCells = Array.from(fleetBuffer.querySelectorAll("div[class='_1JqhiJ8_SwKH8PRALcO9Hc _33A_5lETf4HBqwJi_q-jhZ _1vWRpdI8cKNMPyOPnzlXgX'] > div > div > div > div > table > tbody > tr > td:nth-of-type(8)"));
								etaCells.forEach(etaCell => {
										if (etaCell.textContent) {
												const textContent = etaCell.textContent.split('(')[0];
												const eta = convertDurationToETA(textContent);
												etaCell.appendChild(createTextSpan(` (${eta})`, this.tag));
										}
								});
            }
        }
	}
}
