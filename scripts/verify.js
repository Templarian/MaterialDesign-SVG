const fs = require('fs');

const pack = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const fontBuild = JSON.parse(fs.readFileSync('font-build.json', 'utf8'));
const icons = JSON.parse(fs.readFileSync('meta.json', 'utf8'));

console.log('Starting...');
if (pack.version.replace(/\./g, '') == icons.length.toString()) {
  console.log(`Success: package.json version ${pack.version}`);
} else {
  console.error('Error: Invalid version in package.json');
}
if (pack.version !== `${fontBuild.version.major}.${fontBuild.version.minor}.${fontBuild.version.patch}`) {
  console.error('Error: Invalid font-build.json version');
}
var files = fs.readdirSync('svg');
if (files.length === icons.length) {
  console.log('Success: svg file count equals meta.json count');
} else {
  console.error('Error: meta.json or svg folder out of sync!');
}
const set = new Set();
icons.forEach(icon => {
  set.add(icon.name.replace(/-/g, ''));
  if (files.includes(`${icon.name}.svg`)) {
    // Good
  } else {
    console.error(`Error: ${icon.name} not found!`);
  }
});
if (icons.length !== set.size) {
  // Ex: textbox === text-box, will error
  console.error('Error: An icon name conflicts when hyphen is removed!');
}
console.log('Done!');