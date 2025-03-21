/// <reference types="@fastly/js-compute" />

import { Router } from "@fastly/expressly";

const router = new Router();
let backendResponse;
let root = "/my-site/"; //change to your repo name if you forked the site

router.use(async (req, res) => {
  res.set("x-powered-by", "expressly");
  backendResponse = await fetch(req.url, {
    backend: "blog"
  });
});

router.get(`${root}feed/feed.json`, async (req, res) => {
  let originData = await backendResponse.json();
  let posts = ``; // change to your repo name
  for (const pst of originData.items) {
    let date = new Date(pst.date_published);
    date = date.toDateString();
    let linkUrl = new URL(pst.url);
    posts += `<p><a href="${linkUrl.pathname}"><strong>${pst.title}</strong></a> – ${date}</p>`;
  }
  let page =`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${originData.title} – Feed 🗞️</title>
      <!-- 🚧 Change CSS location to suit your site 🚧 -->
      <link rel="stylesheet" href="${root}css/index.css"/>
    </head>
    <body>
      <header><a class="home-link" href="${root}">My Website</a></header>
      <h2>${originData.title} – Feed 🗞️</h2>
      <div>${posts}</div>
    </body>
  </html>`;

  res.withStatus(backendResponse.status).html(page);
});

router.all("(.*)", async (req, res) => {
  res.send(backendResponse);
});

router.listen();
