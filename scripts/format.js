const cssBeautify = require('js-beautify')['css_beautify'];
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const options = JSON.parse(fs.readFileSync(path.join(__dirname, '../.jsbeautifyrc'), 'utf8'));

// scss
glob('client/**/*.scss', {
  absolute: true
}, (er, files) => {
  files.forEach(file => {
    const data = fs.readFileSync(file, 'utf8');
    const nextData = cssBeautify(data, options);
    fs.writeFileSync(file, nextData, 'utf8');
  });
});
