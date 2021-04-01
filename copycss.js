const fs = require(`fs`);
const path = require(`path`);


const oldCSS = path.join(__dirname, `build/`, `css/`, `news-widget.css`);
const newCSS = path.join(__dirname, `markup/`, `css/`, `news-widget.css`);

fs.copyFile(newCSS, oldCSS, (err) => {
  if (err) {
    console.log(err);
    return;
  }
});
