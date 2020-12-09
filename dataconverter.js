import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data/ted.json', 'utf8'));

data.forEach((talk) => {
  talk.tags = talk.tags.replace(/'/g, '"');
});

fs.writeFileSync('ted2.json', JSON.stringify(data));

// Add this to package.json whenever using this:
//   "type": "module",
