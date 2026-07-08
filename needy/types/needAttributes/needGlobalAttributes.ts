import { NeedStyle } from "../needNode.types";

export interface NeedGlobalAttributes {
  // Global Attributes
  class?: string;
  className?: string; // React-style fallback
  id?: string;
  title?: string;
  role?: string;
  tabIndex?: number;
  hidden?: boolean;
  disabled?: boolean;
  dir?: "ltr" | "rtl" | "auto";
  lang?: string;
  draggable?: boolean;
  spellcheck?: boolean;

  // Wildcards for accessibility and custom data (STRICTLY TYPED)
  [key: `data-${string}`]: string | number | boolean | object | any[];
  [key: `aria-${string}`]: string;
}
