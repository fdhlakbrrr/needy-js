import "./needy.css";
import * as CSS from "csstype";
import {
  NeedNodePropertiesOptions,
  NeedNode,
  NeedState,
} from "./types/needNode.types";
import { needEffect, needToRenderBoolean } from "./needy";

export const needText = <
  T extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div",
>(
  needNodePropertiesOptions?: NeedNodePropertiesOptions<T>,
  text?: string | Function,
  as?: T,
): Node => {
  console.log("text: ", text);
  if (!as) return document.createTextNode(text as string);

  const textElement = document.createElement(as);
  let classes: string[] = [];

  if (!needNodePropertiesOptions?.style) {
    classes = needCssStyle({ flexDirection: "column", gap: 0 });
  } else {
    if (needNodePropertiesOptions?.style?.dynamic) {
      let previousClasses: string[] = [];

      needEffect(() => {
        // 1. Combine static styles with evaluated dynamic styles
        const currentStyle: any = { ...needNodePropertiesOptions.style };
        delete currentStyle.dynamic;

        Object.entries(needNodePropertiesOptions.style!.dynamic!).forEach(
          ([key, value]) => {
            currentStyle[key] = value(); // Evaluate the state!
          },
        );

        // 2. Generate the CSS classes for this specific frame
        const newClasses = needCssStyle(currentStyle);

        // 3. Remove old classes before adding new ones
        if (previousClasses.length > 0) {
          textElement.classList.remove(...previousClasses);
        }

        textElement.classList.add(...newClasses);
        previousClasses = newClasses;
      });
    } else {
      classes = needCssStyle(needNodePropertiesOptions.style as any);
    }
  }

  textElement.classList.add(...classes);

  if (typeof text === "function") {
    needEffect(() => {
      textElement.textContent = text();

      return textElement;
    });
  } else {
    let span = null;
    const splittedWord = (text as string).split(/(<[^<>]*>)/);
    const parsedSplittedWord = [];

    splittedWord.forEach((word) => {
      if (word.includes("<") && word.includes(">")) {
        span = document.createElement("span");
        span.textContent = word.slice(1, -1);

        span.classList.add(
          ...needCssStyle({
            color: "red",
          }),
        );

        parsedSplittedWord.push(span.outerHTML);
      } else {
        // Escape stray < and > so the browser renders them as text, not as HTML tags!
        const escapedWord = word.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        parsedSplittedWord.push(escapedWord);
      }
    });

    textElement.innerHTML = parsedSplittedWord.join("");
  }

  const events = Object.entries(needNodePropertiesOptions?.events || {});

  if (events.length > 0) {
    events.forEach(([event, callback]) => {
      needEventListener(
        textElement,
        event as keyof HTMLElementEventMap,
        callback as any,
      );
    });
  }

  needSetAttributes(textElement, needNodePropertiesOptions);

  return textElement;
};

export const needSection = (...needNodes: (Node | string)[]) => {
  const section = document.createElement("section");

  needNodes.forEach((node) => {
    section?.append(node);
  });

  return section;
};

export function needBox(
  needNodePropertiesOptions?: NeedNodePropertiesOptions<"div">,
  ...needNodes: (Node | string | Node[] | boolean | Function)[]
) {
  const box = document.createElement("div");
  let classes: string[] = [];

  if (!needNodePropertiesOptions?.style) {
    classes = needCssStyle({ flexDirection: "column", gap: 0 });
  } else {
    if (needNodePropertiesOptions?.style?.dynamic) {
      let previousClasses: string[] = [];

      needEffect(() => {
        // 1. Combine static styles with evaluated dynamic styles
        const currentStyle: any = { ...needNodePropertiesOptions.style };
        delete currentStyle.dynamic;

        Object.entries(needNodePropertiesOptions.style!.dynamic!).forEach(
          ([key, value]) => {
            currentStyle[key] = value(); // Evaluate the state!
          },
        );

        // 2. Generate the CSS classes for this specific frame
        const newClasses = needCssStyle(currentStyle);

        // 3. Remove old classes before adding new ones
        if (previousClasses.length > 0) {
          box.classList.remove(...previousClasses);
        }

        box.classList.add(...newClasses);
        previousClasses = newClasses;
      });
    } else {
      classes = needCssStyle(needNodePropertiesOptions.style as any);
    }
  }

  box.classList.add(...classes);

  const events = Object.entries(needNodePropertiesOptions?.events || {});

  if (events.length > 0) {
    events.forEach(([event, callback]) => {
      needEventListener(
        box,
        event as keyof HTMLElementEventMap,
        callback as any,
      );
    });
  }

  needSetAttributes(box as HTMLElement, needNodePropertiesOptions);
  needNodes.forEach(async (node) => {
    console.log("node: ", node);
    if (Array.isArray(node)) {
      node.forEach((child) => {
        box.append(child);
      });

      return;
    }

    if (typeof node === "function") {
      const parentNode = document.createElement("div");
      parentNode.classList.add("kontol");

      needEffect(() => {
        console.log("here: ", box);
        parentNode.textContent = node();
        console.log("parent: ", parentNode)
        // box.innerText = node();
      });

      return box.append(parentNode);
    }

    box?.append(node as HTMLElement);
  });

  return box;
}

export function needNav(
  needNodePropertiesOptions?: NeedNodePropertiesOptions<"nav">,
  ...needNodes: (Node | string | Node[])[]
) {
  const nav = document.createElement("nav");

  needNodes.forEach(async (node) => {
    if (Array.isArray(node)) {
      node.forEach((child) => {
        nav.append(child);
      });

      return;
    }

    nav.append(node);
  });

  if (needNodePropertiesOptions?.style) {
    nav.classList.add(...needCssStyle(needNodePropertiesOptions.style));
  }

  const events = Object.entries(needNodePropertiesOptions?.events || {});

  if (events.length > 0) {
    events.forEach(([event, callback]) => {
      needEventListener(
        nav,
        event as keyof HTMLElementEventMap,
        callback as any,
      );
    });
  }

  needSetAttributes(nav, needNodePropertiesOptions);
  return nav;
}

export function needLink(
  needNodePropertiesOptions?: NeedNodePropertiesOptions<"a">,
  ...needNodes: (Node | string)[]
) {
  const a = document.createElement("a");

  needNodes.forEach((node) => {
    a.append(node);
  });
  // console.log("nav height: ", nav.getBoundingClientRect().height)

  if (needNodePropertiesOptions?.style) {
    a.classList.add(...needCssStyle(needNodePropertiesOptions.style));
  }

  const events = Object.entries(needNodePropertiesOptions?.events || {});

  if (events.length > 0) {
    events.forEach(([event, callback]) => {
      needEventListener(a, event as keyof HTMLElementEventMap, callback as any);
    });
  }

  needSetAttributes(a, needNodePropertiesOptions);
  return a;
}

export function needSvg(
  needNodePropertiesOptions: NeedNodePropertiesOptions<"svg">,
) {
  const svgNamespace = "http://www.w3.org/2000/svg";
  // SVG elements MUST be created with their specific namespace!
  const svg = document.createElementNS(svgNamespace, "svg");

  svg.setAttribute("xmlns", needNodePropertiesOptions?.xmlns || svgNamespace);
  svg.setAttribute(
    "width",
    needNodePropertiesOptions?.width?.toString() || "100",
  );
  svg.setAttribute(
    "height",
    needNodePropertiesOptions?.height?.toString() || "100",
  );
  svg.setAttribute(
    "viewBox",
    needNodePropertiesOptions?.viewBox || "0 0 100 100",
  );

  if (
    needNodePropertiesOptions?.path &&
    needNodePropertiesOptions.path.length > 0
  ) {
    needNodePropertiesOptions.path.forEach((path) => {
      // Paths also MUST use the namespace
      const pathElement = document.createElementNS(svgNamespace, "path");
      pathElement.setAttribute("d", path.d);
      pathElement.setAttribute("fill", path.fill || "black");
      svg.appendChild(pathElement);
    });
  }

  if (needNodePropertiesOptions?.style) {
    svg.classList.add(...needCssStyle(needNodePropertiesOptions.style));
  }

  delete needNodePropertiesOptions.path;

  const events = Object.entries(needNodePropertiesOptions?.events || {});

  if (events.length > 0) {
    events.forEach(([event, callback]) => {
      needEventListener(
        svg,
        event as keyof HTMLElementEventMap,
        callback as any,
      );
    });
  }
  needSetAttributes(svg as unknown as HTMLElement, needNodePropertiesOptions);

  return svg;
}

export const needCssStyle = (style: CSS.Properties): string[] => {
  const classes: string[] = [];

  if (!document.getElementById("needy-base-flex")) {
    const flexStyle = document.createElement("style");
    flexStyle.id = "needy-base-flex";
    flexStyle.innerHTML = `.flex-box { display: flex; }`;
    document.head.appendChild(flexStyle);
  }

  const cssProperties = Object.entries(style);

  cssProperties.forEach(([key, value]) => {
    if (key === "pseudo") {
      /**
       * need to remove from class:
       * - {}
       * - .
       * ""
       * - ()
       */
      const pseudo = Object.entries(value);

      pseudo.forEach(([pseudoKey, pseudoValue]) => {
        let finalPseudoValue = {};

        const pseudoValueEntries = Object.entries(pseudoValue);

        pseudoValueEntries.forEach(([pseudoValueKey, pseudoValueValue]) => {
          if (typeof pseudoValueValue === "string") {
            pseudoValueValue = pseudoValueValue.split(" ").join("");
          }

          finalPseudoValue[pseudoValueKey] = pseudoValueValue;
        });

        const className = `needy-${pseudoKey}-${JSON.stringify(finalPseudoValue)
          .replaceAll(",", "_")
          .replaceAll(/["'{}.()]/g, "")
          .replaceAll(":", "")
          .replaceAll(" ", "")
          .replaceAll("%", "")
          .replaceAll("#", "")}`;
        // classes.push(className);

        if (!document.getElementById(className)) {
          const pseudoEl = document.createElement("style");
          pseudoEl.id = className;

          const stringifiedPseudoValue = JSON.stringify(pseudoValue);
          const stringRemovedPseudoValue = stringifiedPseudoValue
            .replace(/["']/g, "")
            .replace(/,/g, ";");

          pseudoEl.innerHTML = `.${className}:${pseudoKey} ${stringRemovedPseudoValue
            .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
            .toLowerCase()}`;
          document.head.appendChild(pseudoEl);
        }

        classes.push(className);
      });
    } else {
      const className = `needy-${key}-${value}`
        .replaceAll(",", "_")
        .replaceAll(/["'{}.()]/g, "")
        .replaceAll(":", "")
        .replaceAll(" ", "")
        .replaceAll("%", "")
        .replaceAll("#", "");

      classes.push(className);

      if (!document.getElementById(className)) {
        const styleEl = document.createElement("style");
        styleEl.id = className;

        const cssValue = typeof value === "number" ? `${value}px` : value;

        const cssKey = key
          .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
          .toLowerCase();

        styleEl.innerHTML = `.${className} { ${cssKey}: ${cssValue}; }`;
        document.head.appendChild(styleEl);
      }
    }
  });

  return classes;
};

const needSetAttributes = (
  node: HTMLElement,
  attributes?: Record<string, any>,
) => {
  if (!attributes) return;

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "style" || key === "onClick") {
      return;
    }

    if (key === "class" || key === "className") {
      const classes = String(value).split(" ").filter(Boolean);
      if (classes.length > 0) {
        node.classList.add(...needCssStyle({ [key]: value }));
      }
      return;
    }

    if (value === true) {
      node.setAttribute(key, "");
    } else if (value === false) {
      node.removeAttribute(key);
    } else if (value !== undefined && value !== null) {
      const parsedValue =
        typeof value === "object" ? JSON.stringify(value) : String(value);
      node.setAttribute(key, parsedValue);
    }
  });
};

const needEventListener = (
  node: HTMLElement | SVGSVGElement,
  event: keyof HTMLElementEventMap,
  callback?: (e: MouseEvent) => void,
) => {
  // CLEAN EVENT LISTENER IF UNMOUNTED
  if (callback) {
    // 1. Create an AbortController for this node if it doesn't exist yet
    if (!(node as any)._abortController) {
      (node as any)._abortController = new AbortController();
    }

    // 2. Attach the signal to the event listener
    const signal = (node as any)._abortController.signal;
    node.addEventListener(event, callback as EventListener, { signal });
  }
};
