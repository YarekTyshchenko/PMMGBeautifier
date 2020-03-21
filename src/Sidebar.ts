export class Sidebar {
  cleanup() {}
  run()
  {
    const area = document.createElement('div');
    area.classList.add('prun-beautifier-sidebar');
    area.classList.add('prun-remove-js');
    const h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode("PMMG Beautifier"));
    h3.classList.add("Sidebar__sectionHead___2z1ffry", "fonts__font-regular___w47oqm8");
    area.appendChild(h3);
    const content = document.createElement("div");
    content.classList.add("Sidebar__sectionContent___1FaacYp", "fonts__font-regular___w47oqm8");
    area.appendChild(content);

    content.appendChild(document.createTextNode("Foo"));

    Array.from(document.querySelectorAll("div[class^='Sidebar__container___']")).forEach(sidebar => {
      sidebar.appendChild(area);
    });
  }
}
