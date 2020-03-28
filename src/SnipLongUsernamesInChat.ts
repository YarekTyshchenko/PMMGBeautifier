export class SnipLongUsernamesInChat {
  cleanup() {
    Array.from(document.getElementsByClassName("prun-beautifier-restore-username")).forEach(e => {
      e.textContent = e.title;
      e.classList.remove('prun-bautifier-restore-username');
    });
  }
  run() {
    const elements = document.querySelectorAll("div[class^='Sender__container___'] div");
    elements.forEach(e => {
      const username = e.textContent;
      if (username.length > 12) {
        e.textContent = username.slice(0, 12);
        // Add a tooltip to show full username
        e.title = username;
        e.style['text-decoration'] = 'underline dotted';
        e.classList.add('prun-beautifier-restore-username');
      }
    })
  }
}
