export function setModel(mvEl, glbUrl, usdzUrl) {
  if (!mvEl) return;
  mvEl.src = glbUrl;

  if (usdzUrl) {
    if ("iosSrc" in mvEl) {
      mvEl.iosSrc = usdzUrl;
    } else {
      mvEl.setAttribute("ios-src", usdzUrl);
    }
  } else {
    if ("iosSrc" in mvEl) {
      mvEl.iosSrc = "";
    }
    mvEl.removeAttribute("ios-src");
  }
}

export function setScale(mvEl, scaleArray) {
  if (!mvEl || scaleArray == null) return;
  const scaleValue = Array.isArray(scaleArray) ? scaleArray.join(" ") : String(scaleArray);

  if ("scale" in mvEl) {
    mvEl.scale = scaleValue;
  } else {
    mvEl.setAttribute("scale", scaleValue);
  }
}

export function wireModelErrors(mvEl, onError) {
  if (!mvEl || typeof onError !== "function") return () => {};

  const handler = (event) => {
    onError(event);
  };

  mvEl.addEventListener("error", handler);
  mvEl.addEventListener("load", handler);

  return () => {
    mvEl.removeEventListener("error", handler);
    mvEl.removeEventListener("load", handler);
  };
}
