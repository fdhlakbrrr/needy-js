import { NeedGlobalAttributes } from "../needAttributes/needGlobalAttributes";
import {
  NeedAnchorAttributes,
  NeedButtonAttributes,
  NeedFormAttributes,
  NeedImgAttributes,
  NeedInputAttributes,
  NeedLabelAttributes,
  NeedMediaAttributes,
  NeedTextareaAttributes,
  NeedVideoAttributes,
} from "../needAttributes/needElementAttributes";

export interface NeedIntrinsicElementAttributes {
  a: NeedAnchorAttributes;
  abbr: NeedGlobalAttributes;
  address: NeedGlobalAttributes;
  area: NeedAnchorAttributes; // Shares many attributes with anchor
  article: NeedGlobalAttributes;
  aside: NeedGlobalAttributes;
  audio: NeedMediaAttributes;
  b: NeedGlobalAttributes;
  base: NeedGlobalAttributes;
  bdi: NeedGlobalAttributes;
  bdo: NeedGlobalAttributes;
  big: NeedGlobalAttributes;
  blockquote: NeedGlobalAttributes;
  body: NeedGlobalAttributes;
  br: NeedGlobalAttributes;
  button: NeedButtonAttributes;
  canvas: NeedGlobalAttributes & { height?: number | string; width?: number | string };
  caption: NeedGlobalAttributes;
  cite: NeedGlobalAttributes;
  code: NeedGlobalAttributes;
  col: NeedGlobalAttributes & { span?: number };
  colgroup: NeedGlobalAttributes & { span?: number };
  data: NeedGlobalAttributes & { value?: string };
  datalist: NeedGlobalAttributes;
  dd: NeedGlobalAttributes;
  del: NeedGlobalAttributes & { cite?: string; dateTime?: string };
  details: NeedGlobalAttributes & { open?: boolean };
  dfn: NeedGlobalAttributes;
  dialog: NeedGlobalAttributes & { open?: boolean };
  div: NeedGlobalAttributes;
  dl: NeedGlobalAttributes;
  dt: NeedGlobalAttributes;
  em: NeedGlobalAttributes;
  embed: NeedGlobalAttributes & { height?: number | string; src?: string; type?: string; width?: number | string };
  fieldset: NeedGlobalAttributes & { disabled?: boolean; form?: string; name?: string };
  figcaption: NeedGlobalAttributes;
  figure: NeedGlobalAttributes;
  footer: NeedGlobalAttributes;
  form: NeedFormAttributes;
  h1: NeedGlobalAttributes;
  h2: NeedGlobalAttributes;
  h3: NeedGlobalAttributes;
  h4: NeedGlobalAttributes;
  h5: NeedGlobalAttributes;
  h6: NeedGlobalAttributes;
  head: NeedGlobalAttributes;
  header: NeedGlobalAttributes;
  hgroup: NeedGlobalAttributes;
  hr: NeedGlobalAttributes;
  html: NeedGlobalAttributes;
  i: NeedGlobalAttributes;
  iframe: NeedGlobalAttributes & { allow?: string; allowFullScreen?: boolean; height?: number | string; loading?: "eager" | "lazy"; name?: string; sandbox?: string; src?: string; srcDoc?: string; width?: number | string };
  img: NeedImgAttributes;
  input: NeedInputAttributes;
  ins: NeedGlobalAttributes & { cite?: string; dateTime?: string };
  kbd: NeedGlobalAttributes;
  keygen: NeedGlobalAttributes;
  label: NeedLabelAttributes;
  legend: NeedGlobalAttributes;
  li: NeedGlobalAttributes & { value?: string | number };
  link: NeedGlobalAttributes & { as?: string; crossOrigin?: string; href?: string; hreflang?: string; integrity?: string; media?: string; rel?: string; sizes?: string; type?: string; charSet?: string };
  main: NeedGlobalAttributes;
  map: NeedGlobalAttributes & { name?: string };
  mark: NeedGlobalAttributes;
  menu: NeedGlobalAttributes;
  menuitem: NeedGlobalAttributes;
  meta: NeedGlobalAttributes & { charSet?: string; content?: string; httpEquiv?: string; name?: string };
  meter: NeedGlobalAttributes & { form?: string; high?: number; low?: number; max?: number | string; min?: number | string; optimum?: number; value?: string | number };
  nav: NeedGlobalAttributes;
  noindex: NeedGlobalAttributes;
  noscript: NeedGlobalAttributes;
  object: NeedGlobalAttributes & { data?: string; form?: string; height?: number | string; name?: string; type?: string; useMap?: string; width?: number | string };
  ol: NeedGlobalAttributes & { reversed?: boolean; start?: number; type?: "1" | "a" | "A" | "i" | "I" };
  optgroup: NeedGlobalAttributes & { disabled?: boolean; label?: string };
  option: NeedGlobalAttributes & { disabled?: boolean; label?: string; selected?: boolean; value?: string | number };
  output: NeedGlobalAttributes & { form?: string; htmlFor?: string; name?: string };
  p: NeedGlobalAttributes;
  param: NeedGlobalAttributes & { name?: string; value?: string | number };
  picture: NeedGlobalAttributes;
  pre: NeedGlobalAttributes;
  progress: NeedGlobalAttributes & { max?: number | string; value?: string | number };
  q: NeedGlobalAttributes & { cite?: string };
  rp: NeedGlobalAttributes;
  rt: NeedGlobalAttributes;
  ruby: NeedGlobalAttributes;
  s: NeedGlobalAttributes;
  samp: NeedGlobalAttributes;
  script: NeedGlobalAttributes & { async?: boolean; charSet?: string; crossOrigin?: string; defer?: boolean; integrity?: string; noModule?: boolean; src?: string; type?: string };
  section: NeedGlobalAttributes;
  select: NeedGlobalAttributes & { autoComplete?: string; autoFocus?: boolean; disabled?: boolean; form?: string; multiple?: boolean; name?: string; required?: boolean; size?: number; value?: string | number };
  small: NeedGlobalAttributes;
  source: NeedGlobalAttributes & { height?: number | string; media?: string; sizes?: string; src?: string; srcSet?: string; type?: string; width?: number | string };
  span: NeedGlobalAttributes;
  strong: NeedGlobalAttributes;
  style: NeedGlobalAttributes & { media?: string; type?: string };
  sub: NeedGlobalAttributes;
  summary: NeedGlobalAttributes;
  sup: NeedGlobalAttributes;
  svg: NeedGlobalAttributes & { width?: number; height?: number; viewBox?: string, xmlns?: string, path: {d: string, fill?: string}[] };
  table: NeedGlobalAttributes;
  template: NeedGlobalAttributes;
  tbody: NeedGlobalAttributes;
  td: NeedGlobalAttributes & { colSpan?: number; headers?: string; rowSpan?: number };
  textarea: NeedTextareaAttributes;
  tfoot: NeedGlobalAttributes;
  th: NeedGlobalAttributes & { colSpan?: number; headers?: string; rowSpan?: number; scope?: "col" | "row" | "colgroup" | "rowgroup" };
  thead: NeedGlobalAttributes;
  time: NeedGlobalAttributes & { dateTime?: string };
  title: NeedGlobalAttributes;
  tr: NeedGlobalAttributes;
  track: NeedGlobalAttributes & { default?: boolean; kind?: string; label?: string; src?: string; srcLang?: string };
  u: NeedGlobalAttributes;
  ul: NeedGlobalAttributes;
  var: NeedGlobalAttributes;
  video: NeedVideoAttributes;
  wbr: NeedGlobalAttributes;
}
