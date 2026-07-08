import { needLink } from "needy";
import { navMenus } from "@/utils/constant";

export default function needNavMenu(showExtend: { isShow: boolean }) {
  return navMenus.map((menu) => {
    return needLink(
      {
        href: menu.href,
        style: {
          cursor: "pointer",
          color: "#252424ff",
          textDecoration: "none",
          fontSize: "11px",
          fontFamily:
            'SF Pro Display, "SF Pro Text", system-ui, Helvetica, Arial, sans-serif',
          fontWeight: "300",
          pseudo: {
            hover: {
              color: "#0f0f0fff",
              transition: "0.2s",
            },
          },
        },

        events: {
          click: (e) => {
            e.stopPropagation();
          },
          mouseenter: () => {
            return showExtend.isShow = true;
          },
        },
      },
      menu.label,
    );
  });
}
