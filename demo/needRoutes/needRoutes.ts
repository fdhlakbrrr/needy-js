import needHome from "@/needPage/needHome";
import needAbout from "@/needPage/needAbout";
import { NeedRoutes } from "needy/types";

export const homeRoutes: NeedRoutes = {
  path: "/",
  needNode: needHome(),
};

export const aboutRoutes: NeedRoutes = {
  path: "/about",
  needNode: needAbout(),
} 

// export default needRoutes;
