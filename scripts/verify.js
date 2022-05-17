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
  const nohyphen = icon.name.replace(/-/g, '');
  if (set.has(nohyphen)) {
    console.error(`Error: duplicate no hyphen name "${nohyphen}" / "${icon.name}"`);
  }
  set.add(nohyphen);
  if (files.includes(`${icon.name}.svg`)) {
    // Good
  } else {
    console.error(`Error: ${icon.name} not found!`);
  }
});
if (icons.length !== set.size) {
  // Ex: textbox === text-box, will error
  // Ex: calendar-weekend === calendar-week-end, will also error
  console.error('Error: An icon name conflicts when hyphens are removed!');
}
// Console error all duplicates
const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
icons.forEach(icon => {
  const aliasDups = findDuplicates(icon.aliases);
  if (aliasDups.length > 0) {
    console.error(`Error: Aliases "${icon.name}" has duplicates "${aliasDups.join('", "')}"`);
  }
  const tagDups = findDuplicates(icon.tags);
  if (tagDups.length > 0) {
    console.error(`Error: Tags "${icon.name}" has duplicates "${tagDups.join('", "')}"`);
  }
});
console.log('Done!');