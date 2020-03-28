export class SnipLongUsernamesInChat {
  private tag = "prun-beautifier-restore-username";
  cleanup() {
    Array.from(document.getElementsByClassName(this.tag)).forEach(e => {
      e.textContent = e.title;
      e.classList.remove(this.tag);
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
        e.classList.add(this.tag);
      }
    })
  }
}
