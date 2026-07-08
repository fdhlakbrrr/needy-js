import { NeedApp, NeedLayout, NeedRoutes, NeedState } from "@/types";
import { needText, needCssStyle } from "./htmlNode";

let activeEffect: (() => void) | null = null;

export const needToInitiate = (needApp: NeedApp) => {
  const currentPath = window.location.pathname;
  const root = document.getElementById("root") as HTMLElement;

  needToRenderHtml(needApp, root);

  needToRenderLayout(needApp.layouts, root);

  if (!isCurrentPathFound(needApp.routes, currentPath)) {
    return needToRenderNotFoundPage(needApp, root);
  }

  return needToRender(currentPath, root, needApp.routes);
};

export function needEffect<T>(fn: () => T) {
  activeEffect = fn;

  fn();

  activeEffect = null;
}

export function needToLoop<T>(
  array: T[] | NeedState<T[]>,
  callback: (eachData: T, eachIndex?: number) => Node,
): any[] {
  if (typeof array === "function") {
    const parent = document.createElement("div");
    needEffect(() => {
      if (parent.childNodes.length === 0) {
        return array().map((eachData, eachIndex) => {
          return parent.append(callback(eachData, eachIndex));
        });
      }

      Array.from(parent.childNodes).map((child: HTMLElement, index) => {
        const oldNode = child as HTMLElement;
        const newNode = callback(array()[index]) as HTMLElement;

        if (oldNode.textContent !== newNode.textContent) {
          oldNode.replaceWith(newNode);
        }
      });
    });

    return [parent];
  } else {
    return array.map((eachData, eachIndex) => {
      return callback(eachData, eachIndex);
    });
  }
}

export function needToRenderBoolean(
  // needState: NeedState<any>,
  conditionFn: () => boolean,
  ifTrue: Node | string | Node[] | boolean,
  ifFalse: Node | string | Node[] | boolean | undefined | null,
): HTMLElement {
  const parentNode = document.createElement("div") as HTMLElement;
  parentNode.classList.add("kontol");

  needEffect(() => {
    console.log("run")
    const hasSameContent =
      (parentNode as HTMLElement).children[0] === (ifTrue as HTMLElement);

    console.log("parentNode: ", (parentNode as HTMLElement).children[0]);
    console.log("to render: ", ifTrue as HTMLElement);
    console.log("is same ?: ", hasSameContent);
    // TODO: ONLY RENDER WHEN ITS CONDITIONFn CHANGED!
    // console.log("run: ", conditionFn, needState(), needState() < 2);
    if (!conditionFn()) {
      if (hasSameContent) return;

      if (typeof ifFalse === "undefined" || ifFalse === null) {
        parentNode.append("");
      } else {
        parentNode.append(ifFalse as HTMLElement);
      }

      return;
    }

    if (hasSameContent) return;

    if (typeof ifTrue === "undefined" || ifTrue === null) {
      parentNode.append("");
    } else {
      parentNode.append(ifTrue as HTMLElement);
    }
  });

  return parentNode;
}

export function needToCreateState<T>(value: T): NeedState<T> {
  const state = {
    value,
    subscribedNodes: [],
  };

  const stateProxyHandler: ProxyHandler<{
    value: any;
    subscribedNodes: Function[];
  }> = {
    get(target, prop, receiver) {
      if (prop === "value" && activeEffect) {
        target.subscribedNodes.push(activeEffect);
      }

      return Reflect.get(target, prop, receiver);
    },

    set(target, prop, newValue, receiver) {
      const result = Reflect.set(target, prop, newValue, receiver);

      if (prop === "value") {
        target.subscribedNodes.forEach((effectFn) => {
          return effectFn();
        });
      }

      return result;
    },
  };

  const stateProxy = new Proxy(state, stateProxyHandler);

  return (newValue?: T | ((prev: T) => T | void)) => {
    if (newValue !== undefined) {
      if (typeof newValue === "function") {
        const valueReturned = (newValue as Function)(stateProxy.value);

        if (valueReturned) {
          stateProxy.value = valueReturned;
        }
        return stateProxy.value;
      }

      stateProxy.value = newValue;

      return stateProxy.value;
    }

    return stateProxy.value;
  };
}

export function needConditionalState(
  condition: boolean,
  cb: (isTrue: boolean) => void,
  // ifTrue: any,
  // ifFalse?: any,
): any {
  cb(condition);
  // if (condition) {
  //   needEffect(() => {
  //     const isFunction = (value: any) => typeof value === "function";
  //     if (condition) {
  //       if (isFunction(ifTrue)) {
  //         return ifTrue();
  //       }

  //       return ifTrue;
  //     }

  //     if (isFunction(ifFalse)) {
  //       return ifFalse();
  //     }

  //     return ifFalse;
  //   });
  // }

  return;
}

function needToRenderHtml(needApp: NeedApp, root: Node) {
  const head = document.head;
  const body = document.body;

  if (needApp.html?.body?.style) {
    const bodyClasses = needCssStyle(needApp.html.body.style);
    body.classList.add(...bodyClasses);
  }

  if (needApp.html?.title) {
    document.title = needApp.html.title;
  }

  if (needApp.html?.meta) {
    needApp.html.meta.forEach((metaAtrribute) => {
      const metaTag = document.createElement("meta");
      Object.entries(metaAtrribute).forEach(([key, value]) => {
        metaTag.setAttribute(key, value as string);
      });

      head.appendChild(metaTag);
    });
  }

  if (needApp.html?.scripts) {
    needApp.html.scripts.forEach((script) => {
      const scriptEl = document.createElement("script");

      if (script.src) {
        scriptEl.src = script.src;
      }

      if (script.type) {
        scriptEl.type = script.type;
      }

      if (script.defer) {
        scriptEl.defer = script.defer;
      }

      // if (script.async) {
      //   scriptEl.async = script.async;
      // }

      // if (script.noModule) {
      //   scriptEl.noModule = script.noModule;
      // }

      // if (script.integrity) {
      //   scriptEl.integrity = script.integrity;
      // }

      // if (script.crossOrigin) {
      //   scriptEl.crossOrigin = script.crossOrigin;
      // }

      // if (script.charSet) {
      //   scriptEl.charSet = script.charSet;
      // }

      body.appendChild(scriptEl);
    });
  }
}

function isCurrentPathFound(
  routes: NeedRoutes[],
  currentPath: string,
): boolean {
  const paths = routes.map((route) => route.path);

  return paths.includes(currentPath);
}

function needToRenderNotFoundPage(needApp: NeedApp, root: Node): Node {
  if (!needApp.notFoundPage)
    return root.appendChild(needText(null, "404 - Not Found", "h1"));

  return root.appendChild(needApp.notFoundPage);
}

function needToRenderLayout(layouts: NeedLayout[], root: Node) {
  const currentPath = window.location.pathname;
  const globalLayout = layouts?.find((layout) => layout.routes.includes("*"));
  const filteredLayouts = layouts?.filter((layout) =>
    layout.routes.includes(currentPath),
  );

  if (globalLayout) {
    globalLayout.needNodes.forEach((needNode) => {
      root.appendChild(needNode);
    });
  } else if (filteredLayouts?.length > 0) {
    filteredLayouts.forEach((layout) => {
      layout.needNodes.forEach((needNode) => {
        root.appendChild(needNode);
      });
    });
  }
}

async function needToRender(
  currentPath: string,
  root: Node,
  routes: NeedRoutes[],
) {
  try {
    routes.forEach(async (route) => {
      if (route.path === currentPath) {
        root.appendChild(route.needNode as Node);

        return;
      }
    });
  } catch (error) {
    console.error("error needToRender: ", error);
  }
}

function needToNavigate(path: string) {
  window.history.pushState({}, "", path);
}
