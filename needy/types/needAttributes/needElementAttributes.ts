import { NeedGlobalAttributes } from "./needGlobalAttributes";

export interface NeedAnchorAttributes extends NeedGlobalAttributes {
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  download?: string | boolean;
  type?: string;
  hreflang?: string;
}

export interface NeedInputAttributes extends NeedGlobalAttributes {
  value?: string | number;
  type?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  checked?: boolean;
  readOnly?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autocomplete?: string;
  autofocus?: boolean;
  multiple?: boolean;
  accept?: string;
}

export interface NeedImgAttributes extends NeedGlobalAttributes {
  src?: string;
  alt?: string;
  crossOrigin?: "anonymous" | "use-credentials" | "";
  decoding?: "async" | "auto" | "sync";
  loading?: "eager" | "lazy";
  referrerPolicy?: "no-referrer" | "origin" | "unsafe-url" | "strict-origin-when-cross-origin";
  sizes?: string;
  srcset?: string;
  useMap?: string;
  width?: number | string;
  height?: number | string;
}

export interface NeedFormAttributes extends NeedGlobalAttributes {
  action?: string;
  method?: "GET" | "POST" | "dialog";
  enctype?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  noValidate?: boolean;
  name?: string;
  rel?: string;
}

export interface NeedButtonAttributes extends NeedGlobalAttributes {
  disabled?: boolean;
  autoFocus?: boolean;
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  name?: string;
  type?: "submit" | "reset" | "button";
  value?: string | number;
}

export interface NeedMediaAttributes extends NeedGlobalAttributes {
  autoplay?: boolean;
  controls?: boolean;
  controlsList?: string;
  crossOrigin?: "anonymous" | "use-credentials" | "";
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
  src?: string;
}

export interface NeedVideoAttributes extends NeedMediaAttributes {
  height?: number | string;
  poster?: string;
  width?: number | string;
  disablePictureInPicture?: boolean;
  disableRemotePlayback?: boolean;
}

export interface NeedTextareaAttributes extends NeedGlobalAttributes {
  autoComplete?: string;
  autoFocus?: boolean;
  cols?: number;
  dirName?: string;
  disabled?: boolean;
  form?: string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rows?: number;
  value?: string | number;
  wrap?: "hard" | "soft" | "off";
}

export interface NeedLabelAttributes extends NeedGlobalAttributes {
  form?: string;
  htmlFor?: string;
}
