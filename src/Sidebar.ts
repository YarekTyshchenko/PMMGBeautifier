import {Style, WithStyles} from "./Style";
import {createTextSpan, genericCleanup, toFixed} from "./util";

interface ModulePerformance {
  module: {
    cleanup: () => void;
  }
  name: string;
  enabled: boolean;
  count: number;
  cleanupTime: number;
  runTime: number;
}

export class Sidebar {
  private tag = "pb-sidebar";
  private list: ModulePerformance[];
  constructor(list: ModulePerformance[]) {
    this.list = list;
  }

  cleanup() {
    genericCleanup(this.tag);
  }

  run()
  {
    const area = document.createElement('div');
    area.classList.add(this.tag);
    const h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode("PMMG Beautifier"));
    h3.classList.add(...Style.SidebarSectionHead);
    area.appendChild(h3);
    const content = document.createElement("div");
    content.classList.add(...Style.SidebarSectionContent);
    area.appendChild(content);

    this.list.map(mp => {
      // Div for the whole line
      const line = document.createElement('div');
      line.classList.add(...WithStyles(Style.SidebarLine, Style.FontsRegular));
      content.appendChild(line);

      // Left
      line.appendChild(createTextSpan(mp.name));

      // Right
      const right = document.createElement("span");
      right.style.flexGrow = "1";
      right.style.textAlign = "right";
      line.appendChild(right);

      const time = toFixed((mp.cleanupTime + mp.runTime) / mp.count, 2);
      right.appendChild(createTextSpan(`${time}ms `));

      const toggle = this.makeToggleButton("On", "Off", () => {
        mp.enabled = !mp.enabled;
      }, mp.enabled);
      right.appendChild(toggle);

      const cleanup = this.makePushButton("x", () => mp.module.cleanup());
      right.appendChild(cleanup);
    });

    Array.from(document.querySelectorAll("div[class^='MCrttK6SbK6k-5U-WEPmy']")).forEach(sidebar => {
      sidebar.appendChild(area);
    });
  }

  private makePushButton(text: string, f: () => void, style = Style.ButtonPrimary) {
    const button = document.createElement('button');
    button.classList.add(...Style.Button);
    button.classList.add(...style);
    button.classList.add(this.tag);
    button.onclick = f;
    button.innerText = text;
    return button;
  }

  private makeToggleButton(on: string, off: string, f: () => void, state: boolean = false) {
    const toggle = document.createElement('button');
    toggle.classList.add(...Style.Button);

    const getState: boolean = !!toggle.getAttribute('data-state') || state;
    const setState: (boolean) => void = s => {
      toggle.setAttribute('data-state', String(s));
    };
    const setLook = (s: boolean) => {
      toggle.innerText = s ? on : off;
      // If state is switched on:
      if (s) {
        toggle.classList.remove(...Style.ButtonPrimary);
        toggle.classList.add(...Style.ButtonSuccess);
      } else {
        toggle.classList.remove(...Style.ButtonSuccess);
        toggle.classList.add(...Style.ButtonPrimary);
      }
    };

    setState(state);
    setLook(state);
    toggle.onclick = () => {
      const newState = !getState;
      setLook(newState);
      setState(newState);
      f();
    };
    return toggle;
  }
}
