import { openBuffer } from "./util";

const tag = "pb-cxos";
export class CXOS {
  cleanup() {
    for (const elem of Array.from(document.getElementsByClassName(tag))) {
      elem.classList.remove(tag);
      elem.removeEventListener("click", openCXOB);
    }
  }
  run() {
    const elements = Array.from(document.querySelectorAll("table[class~='_2HAbDk9YexRt4S5-IhEbvT']"));
    for (const table of elements) {
      for (const row of Array.from(table.children[1].children)) {
        const cell = row.children[2];
        const span: HTMLSpanElement = cell.children[0] as any
        if (span) {
          span.addEventListener("click", openCXOB);
          span.classList.add(tag);
        }
      }
    }
  }
}

function openCXOB(e: Event) {
  e.stopImmediatePropagation();
  const span: HTMLSpanElement = e.target as any;
  openBuffer("CXOB " + span.textContent);
}
