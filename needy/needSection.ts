import { needNode } from "./htmlNode";

export const needColumnSection = (...needNodes: (Node | string)[]) => {
  const section = needNode({ type: "section" });

  needNodes.forEach((node) => {
    if (typeof node === "string") {
      section?.appendChild(needNode(node) as Node);

      return;
    }

    section?.appendChild(node);
  });
  return section;
};
