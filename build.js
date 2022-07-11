const fs = require("fs");
const path = require("path");
const minify = require('html-minifier').minify;

let html = fs.readFileSync("./src/index.html").toString("utf-8");

parseJS();
parseCSS();
write();

function parseJS() {
  let reg = new RegExp('<script[ ]+src="([^"]+)">', "gi");

  const CONTENTS = [];
  let result;
  while (result = reg.exec(html)) {
    const match = result[0];
    const src = result[1];
    const file = path.join(__dirname, "./src/", src);
    const content = fs.readFileSync(file).toString("utf-8");
    html = html.replace(match, `<script>__CONTENT__${CONTENTS.length}`);
    CONTENTS.push(content);
  }

  CONTENTS.forEach((content, index) => {
    html = html.replace(`__CONTENT__${index}`, content);
  })
}

function parseCSS() {
  html = html.replace(
    "<link rel=\"stylesheet\" href=\"styles.css\">",
    `<style>${fs.readFileSync("./src/styles.css").toString("utf-8")}</style>`
  );
}

function write() {
  const minified = minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
  });

  fs.writeFileSync("./index.html", minified)
}


