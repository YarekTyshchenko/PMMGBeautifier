/**
 * parse a duration into an actual ETA string
 * @param duration
 * @returns {string}
 */
export function convertDurationToETA(duration) {
  const parsedSeconds = parseDuration(duration);
  const eta = new Date();
  const now = new Date();
  eta.setSeconds(eta.getSeconds() + parsedSeconds);
  const diffTime = Math.abs(eta.getTime() - now.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let ret = eta.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  if (diffDays > 0) {
    ret += ` +${diffDays}d`;
  }
  return ret;
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
  return Math.round(value * power) / power;
}
