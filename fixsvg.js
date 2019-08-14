const fs = require('fs');

fs.readdir('svg', function (err, files) {
  files.forEach(file => {
    //const newFile = file.match(/^[^-]+-(.+)$/)[1];
    var content = fs.readFileSync(`svg/${file}`, 'utf8')
      .replace(/id="/, `id="mdi-`);
    fs.writeFileSync(`svg/${file}`, content);
    //fs.renameSync(`svg/${file}`, `svg/${newFile}`);
  });
});