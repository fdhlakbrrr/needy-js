import type * as CSS from "csstype";
import { NeedIntrinsicElementAttributes } from "./needTags/needHtmlTags";

export interface NeedApp {
  // root: Node;
  html?: {
    meta?: NeedNodePropertiesOptions<"meta">[];
    title?: string;
    body?: NeedNodePropertiesOptions<"body">;
    scripts?: {
      src?: string;
      // async?: boolean;
      defer?: boolean;
      // crossOrigin?: "anonymous" | "use-credentials" | "";
      type?: string;
    }[];
  };
  document?: Document;
  routes: NeedRoutes[];
  notFoundPage?: Node;
  // theme
  // layouts
  layouts?: NeedLayout[];
}

export interface NeedNode extends Partial<HTMLElement> {
  type: keyof HTMLElementTagNameMap;
  nodeName?: string;
  id?: string;
  needClass?: string[];
  parent?: NeedNode;
}

export interface NeedStyle extends CSS.Properties {
  dynamic?: {
    [key in keyof Partial<CSS.Properties>]: () => string | number;
  };
  pseudo?: {
    hover?: CSS.Properties;
    active?: CSS.Properties;
    focus?: CSS.Properties;
    // etc
  };
}

export type NeedState<T> = (newValue?: T | ((prev: T) => T | void)) => T;

export type NeedNodePropertiesOptions<
  T extends keyof NeedIntrinsicElementAttributes = "div",
> = NeedIntrinsicElementAttributes[T] & {
  style?: NeedStyle;
  events?: {
    [key in keyof HTMLElementEventMap]?: (event?: MouseEvent) => void;
  };
};

// TEXTS
export interface NeedFonts {
  fontSize: string;
  fontWeight: string;
}

export interface NeedTextOptions {
  fonts?: NeedFonts;
}

export interface NeedText {
  text?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  options?: NeedTextOptions;
}

// ROUTES
export interface NeedRoutes {
  path: string;
  needNode: Node | Promise<Node>;
}

// LAYOUTS {
export interface NeedLayout {
  needNodes: Node[];
  routes: string[];
}
