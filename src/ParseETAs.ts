import {convertDurationToETA, createTextSpan, genericCleanup, getBuffers} from "./util";

/**
 * Parse all ETA times and add the actual date-time of arrival
 */
export class ParseETAs {
		private tag = "pb-other-etas";
		cleanup() {
				genericCleanup(this.tag);
		}
		run() {
				var FLTBuffers = getBuffers("FLT");
				FLTBuffers.forEach(buffer => {
						const etaCells = Array.from(buffer.querySelectorAll("div[class='_1JqhiJ8_SwKH8PRALcO9Hc _33A_5lETf4HBqwJi_q-jhZ _1vWRpdI8cKNMPyOPnzlXgX'] > div > div > div > div > table > tbody > tr > td:nth-of-type(8)")) as HTMLElement[];
						etaCells.forEach(etaCell => {
								if (etaCell.textContent) {
										const textContent = etaCell.textContent.split('(')[0];
										const eta = convertDurationToETA(textContent);
										etaCell.appendChild(createTextSpan(` (${eta})`, this.tag));
								}
						});
				});
	}
}
