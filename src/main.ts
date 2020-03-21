(function () {
    function toFixed(value, precision) {
      const power = Math.pow(10, precision || 0);
      return String(Math.round(value * power) / power);
    }

    /**
     * Parse all localmarket ads and display the per unit price
     */
    function parseLocalmarketAds() {
      const elements = document.querySelectorAll("div[class^='CommodityAd__text___'");

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const text = element.textContent;
        const matches = text.match(/(?:BUYING|SELLING)\s(\d+)\s.*\s@\s([\d,.]+)\s[A-Z]+\sfor/);
        if (matches && matches.length > 2) {
          const count = matches[1];
          const totalCents = parseInt(matches[2].replace(/[,.]/g, ''));
          const perItem = toFixed(totalCents / count / 100, 2);
          const span = element.children[0].children[1];
          span.textContent += ` (${perItem} ea)`;
        }
      }
    }

    /**
     * parse a duration into an actual ETA string
     * @param duration
     * @returns {string}
     */
    function convertDurationToETA(duration) {
      const days = duration.match(/(\d+)\s*d/);
      const hours = duration.match(/(\d+)\s*h/);
      const minutes = duration.match(/(\d+)\s*m/);
      const seconds = duration.match(/(\d+)\s*s/);

      let parsedSeconds = 0;
      if (days) {
        parsedSeconds += parseInt(days[1]) * 86400;
      }
      if (hours) {
        parsedSeconds += parseInt(hours[1]) * 3600;
      }
      if (minutes) {
        parsedSeconds += parseInt(minutes[1]) * 60;
      }
      if (seconds) {
        parsedSeconds += parseInt(seconds[1]);
      }
      const eta = new Date();
      const now = new Date();
      eta.setSeconds(eta.getSeconds() + parsedSeconds);
      const diffTime = Math.abs(eta - now);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let ret = eta.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      if (diffDays > 0) {
        ret += ` +${diffDays}d`;
      }
      return ret;
    }

    /**
     * Create a span with the given text
     * @param text
     * @returns {HTMLSpanElement}
     */
    function createTextSpan(text) {
      const newSpan = document.createElement("span");
      newSpan.classList.add("prun-remove-js");
      newSpan.textContent = text;
      return newSpan;
    }

    /**
     * Parse all ETA times and add the actual date-time of arrival
     */
    function parseETAs() {
      const elements = document.querySelectorAll("table[class^='Fleet__table___'");
      elements.forEach((tableElem) => {
        const tableRows = Array.from(tableElem.getElementsByTagName("tbody")[0].children);
        tableRows.forEach((row) => {
          // find first entry that is no button but contains a span
          const targetRow = Array.from(row.children).reverse().find(elem =>
            elem.querySelector(":scope > span")
          );
          if (targetRow) {
            const childSpans = targetRow.getElementsByTagName("span");
            const textContent = childSpans[0].textContent.split('(')[0];
            const eta = convertDurationToETA(textContent);
            targetRow.appendChild(createTextSpan(` (${eta})`));
          }
        });
      });
    }

    function parseOrderETAs() {
      const elements = document.querySelectorAll("div[class^='OrderSlot__info___'");
      elements.forEach((order) => {
        // we are only interested in active orders, so check for progress bar first
        if (order.querySelectorAll("span[class^='OrderStatus__inProgress___'").length > 0) {
          const etaSpan = order.getElementsByTagName("span")[1].children[0];
          const eta = convertDurationToETA(etaSpan.textContent);
          order.appendChild(createTextSpan(` (${eta})`));
        }
      });
    }

    function parseFlightplanETAs(){
      const elements = document.querySelectorAll("tbody[class^='MissionPlan__stats___'");
      elements.forEach((tbody) => {
        const targetRow = tbody.children[0].children[3];
        const eta = convertDurationToETA(targetRow.children[0].textContent);
        targetRow.appendChild(createTextSpan(` (${eta})`))
      })
    }

    function cleanup() {
      // remove all elements added in the last run
      Array.from(document.getElementsByClassName("prun-remove-js")).forEach((elem) => {
        elem.parentNode.removeChild(elem);
      });
      // Restore all usernames
      Array.from(document.getElementsByClassName("prun-beautifier-restore-username")).forEach(e => {
        e.textContent = e.title;
        e.classList.remove('prun-bautifier-restore-username');
      });
    }

    function snipLongUsernamesInChat() {
      const elements = document.querySelectorAll("div[class^='Sender__container___'] div");
      elements.forEach(e => {
        const username = e.textContent;
        if (username.length > 12) {
          e.textContent = username.slice(0, 12);
          // Add a tooltip to show full username
          e.title = username;
          e.style['text-decoration']='underline dotted';
          e.classList.add('prun-beautifier-restore-username');
        }
      })
    }

    function createSidebarArea() {
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

      Array.from(document.querySelectorAll("div[class^='Sidebar__container___']")).forEach( sidebar => {
        sidebar.appendChild(area);
      });
    }

    window.setInterval(() => {
      cleanup();
      createSidebarArea();
      parseLocalmarketAds();
      parseETAs();
      parseOrderETAs();
      parseFlightplanETAs();
      snipLongUsernamesInChat();
    }, 1000);
  }
)();
