import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data/original-data.json', 'utf8'));

data.forEach((talk, index) => {
  talk.tags = talk.tags.replace(/'/g, '"');
  talk.ratings = talk.ratings.replace(/'/g, '"');
  talk.related_talks = talk.related_talks.replace(/'/g, '"');

  // New objects
  talk.id = parseInt(`${index + 1 * 10000}`, 10);
  talk.slug = talk.url.slice(26);
});

fs.writeFileSync('ted.json', JSON.stringify(data));

// Add this to package.json whenever using this:
//   "type": "module",

// Run this to execute program: node dataconverter.js
