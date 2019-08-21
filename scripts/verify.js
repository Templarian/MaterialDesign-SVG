const fs = require('fs');

const pack = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const icons = JSON.parse(fs.readFileSync('meta.json', 'utf8'));

console.log('Starting...');
if (pack.version.replace(/\./g, '') == icons.length.toString()) {
  console.log(`Success: package.json version ${pack.version}`);
} else {
  console.error('Error: Invalid version in package.json');
}
var files = fs.readdirSync('svg');
// files.forEach(file => {
//   const newFile = file.match(/^[^-]+-(.+)$/)[1];
//   var content = fs.readFileSync(`svg/${file}`, 'utf8')
//     .replace(/id="/, `id="mdi-`);
//   fs.writeFileSync(`svg/${file}`, content);
//   fs.renameSync(`svg/${file}`, `svg/${newFile}`);
// });
if (files.length === icons.length) {
  console.log('Success: svg file count equals meta.json count');
} else {
  console.error('Error: meta.json or svg folder out of sync!');
}
icons.forEach(icon => {
  if (files.includes(`${icon.name}.svg`)) {
    // Good
  } else {
    console.error(`Error: ${icon.name} not found!`);
  }
});
console.log('Done!');