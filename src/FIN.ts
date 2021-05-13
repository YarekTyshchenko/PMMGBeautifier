import { shorten, genericCleanup, } from "./util";

export class FIN {
    private tag = "pb-fin";
    cleanup() {
        genericCleanup(this.tag);
    }
    run() {
        const finlaHeader = document.querySelectorAll("table[class='t_JwOZxlVCPfN-FKRIoNo _2Fog1ad46aZ4q-RoEgK3R6 _1vWRpdI8cKNMPyOPnzlXgX _33A_5lETf4HBqwJi_q-jhZ'] > thead > tr > th");
        Array.from(finlaHeader).forEach(element => {
            element.textContent = shorten(element.textContent);
        });
    }
}