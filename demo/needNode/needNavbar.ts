import {
  needBox,
  needConditionalState,
  needLink,
  needNav,
  needSvg,
  needText,
  needToCreateState,
  needToLoop,
  needToRenderBoolean,
} from "needy";
import needNavMenu from "./needNavMenu";
import needNavMain from "./needNavMain";
import needNavExtend from "./needNavExtend";

type User = {
  name: string;
  id: number;
};

export default function needNavbar() {
  const titleState = needToCreateState<number>(0);

  const users = needToCreateState<User[]>([
    { name: "Nihayet1", id: 0 },
    { name: "Nihayet2", id: 1 },
    { name: "Nihayet3", id: 2 },
    { name: "Nihayet4", id: 3 },
    { name: "Nihayet5", id: 4 },
    { name: "Nihayet6", id: 5 },
    { name: "Nihayet7", id: 6 },
  ]);

  // console.log("users: ", users)

  const handleState = (prev: number) => {
    return prev + 1;
  };

  return needBox(
    {
      style: {
        width: "100%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        background: "red",
      },
      events: {
        click: () => {
          titleState(handleState);
        },
      },
    },
    needBox(
      {
        style: {
          display: "flex",
          gap: "10px",
        },
      },

      needText(
        {
          style: { color: "white", fontSize: "50px" },
        },
        "Counter: ",
        "h1",
      ),
      needText(
        {
          style: { color: "white", fontSize: "50px" },
        },
        () => (titleState() === 10 ? "Ini mah sepuluh!" : titleState()),
        "h1",
      ),
    ),

    needBox(
      {
        style: {
          dynamic: {
            background: () => (titleState() >= 10 ? "purple" : "green"),
          },
          background: "white",
          height: "100px",
          width: "500px",
        },
      },

      needToLoop<User>(users, (user) => {
        // console.log("run")
        return needText(
          {
            style: {
              color: "white",
              fontSize: "20px",
              marginBottom: "20px",
              cursor: "pointer",
              dynamic: {
                background: () => (user.name === "Fadhil" ? "orange" : "none"),
              },
            },
            events: {
              click: (e) => {
                e.stopPropagation();

                user.name = "Fadhil";

                users(users());
              },
            },
          },
          user.name,
          "h1",
        );
      }),
    ),
  );
}
