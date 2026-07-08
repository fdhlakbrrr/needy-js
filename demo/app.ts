import { needText, NeedApp, needToInitiate, needBox } from "needy";
import { aboutRoutes, homeRoutes } from "@/needRoutes";
import needNavbar from "./needNode/needNavbar";

const needApp: NeedApp = {
  html: {
    title: "Apple",
    body: {
      style: {
        backgroundColor: "white",
      },
    },
  },
  notFoundPage: needBox(
    { style: { height: "100vh" } },
    needText(null, "Gaada kocak", "h1"),
  ),
  routes: [homeRoutes],
  layouts: [
    {
      needNodes: [needNavbar()],
      routes: ["*"],
    },
  ],
};

needToInitiate(needApp);
