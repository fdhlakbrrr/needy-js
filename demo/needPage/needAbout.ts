import { needBox, needText } from "needy";

export default function needAbout(): Node {
  return needBox(
    {
      style: {
        // backgroundColor: "black",
        backgroundImage: "linear-gradient(to bottom, black, #350a61ff)",
        color: "white",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: "500px",
      },
    },

    needText(
      null,
      "About Page",
      "h1",
    ),
  );
}
