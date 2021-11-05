import { shorten, genericCleanup, getBuffers} from "./util";

export class FIN {
    private tag = "pb-fin";
    cleanup() {
        genericCleanup(this.tag);
    }
    run() {
        var FINLABuffers = getBuffers("FINLA");
        FINLABuffers.forEach(buffer => {
            const finlaHeaders = Array.from(buffer.querySelectorAll("table > thead > tr > th")) as HTMLElement[];
            Array.from(finlaHeaders).forEach(element => {
                element.textContent = shorten(element.textContent);
            });
        });
    }
}