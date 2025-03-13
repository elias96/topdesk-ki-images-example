import router from "@sitevision/api/common/router";
import requester from "@sitevision/api/server/Requester";
import * as React from "react";
import { renderToString } from "react-dom/server";
import App from "./components/App";

const HARDCODED_URL =
  "https://sitevision.topdesk.net/tas/api/knowledgeItems/bc3b4238-a8c2-451a-a7ef-fc798c9ded72/images/image-f6b95434-de3e-4e5a-9ad1-cf1999caaf68.png/download";

router.get("/", (req, res) => {
  const data = {};
  res.agnosticRender(renderToString(<App {...data} />), data);
});

router.get("/image", (req, res) => {
  requester
    .get(HARDCODED_URL, {
      preemptiveAuthentication: true,
      username: "🚀",
      password: "🛸",
      dataType: "file",
    })
    .done((response) => {
      return res.type("image/png").sendFile(response);
    })
    .fail((error) => {
      // eslint-disable-next-line no-undef
      console.error(`Failed to fetch image, case: ${JSON.stringify(error)}`);
      return res.status(500).send("Failed to fetch image");
    });
});
