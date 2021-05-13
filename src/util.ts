/**
 * parse a duration into an actual ETA string
 * @param duration
 * @returns {string}
 */
export function convertDurationToETA(duration) {
    const parsedSeconds = parseDuration(duration);
    const eta = new Date();
 
    eta.setSeconds(eta.getSeconds() + parsedSeconds - eta.getTimezoneOffset() * 60);

    let ret = eta.toISOString().substr(5, 11).replace("-", ".").replace("T", ". ");
  return ret;
}

export function convertParsedDurationToETA(parsedSeconds) {
    const eta = new Date();
    eta.setSeconds(eta.getSeconds() + parsedSeconds - eta.getTimezoneOffset()*60);
    return eta.toISOString().substr(5, 11).replace("-", ".").replace("T", ". ");
}

/**
 * Parse duration into seconds
 * @param duration string
 */
export function parseDuration(duration) {
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
  return parsedSeconds;
}

/**
 * Create a span with the given text
 * @param text
 * @param className
 * @param typeName
 * @returns {HTMLSpanElement}
 */
export function createTextSpan(text, className: string = "prun-remove-js") {
  const newSpan = document.createElement("span");
  newSpan.classList.add(className);
  newSpan.textContent = text;
  return newSpan;
}

export function genericCleanup(className: string = "prun-remove-js") {
  // remove all elements added in the last run
  Array.from(document.getElementsByClassName(className)).forEach((elem) => {
    elem.parentNode && elem.parentNode.removeChild(elem);
  });
}

export function toFixed(value: number, precision: number = 2) {
    const power = Math.pow(10, precision || 0);
    const number = Math.round(value * power) / power;

    return number.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function shorten(text) {
    const shortTable = {
        "NEO Charter Exploration Market Maker": "NEO Charter MM",
        "Station Commodity Exchange": "CX",
        "Currency": "Cur",
        "Amount": "Amt",
    }

    var re = new RegExp(Object.keys(shortTable).join("|"), "g");
    return text.replace(re, function (matched: string) {
        return shortTable[matched];
    });
}

export function colorizeType(type, tag) {
    switch (type) {
        case "BUYING": {
            const typeNode = createTextSpan("BUY", tag);
            FontColor(60, 179, 113, typeNode);
            return typeNode;
        }
        case "SELLING": {
            const typeNode = createTextSpan("SEL", tag);
            FontColor(178, 34, 34, typeNode);
            return typeNode;
        }
        case "SHIPPING": {

            const typeNode = createTextSpan("SHI", tag);
            FontColor(79, 130, 180, typeNode);
            return typeNode;
        }
    }
}

function FontColor(r, g, b, textHolder) {
    textHolder.style.color = "rgb(" + r + "," + g + "," + b + ")";
    textHolder.style.fontFamily = "courier";
    textHolder.style.fontSize = "90%";
    textHolder.style.fontWeight = "600";
}