import { shorten, genericCleanup, } from "./util";

export class FIN {
    private tag = "pb-fin";
    cleanup() {
        genericCleanup(this.tag);
    }
    run() {
        const finlaHeader = document.querySelectorAll("table[class^='t_JwOZxlVCPfN-FKRIoNo'] > thead > tr > th");
        Array.from(finlaHeader).forEach(element => {
            element.textContent = shorten(element.textContent);
        });
    }
}