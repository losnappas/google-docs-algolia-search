/**
 * Run this script to index files from google docs.
 */
const { getFiles } = require('./google/drive');
const { addToIndex } = require('./algolia/indexer');
const { getDoc } = require('./google/docs/docs');
const { extractParagraphs } = require('./google/docs/indexes');
const Bottleneck = require('bottleneck');

if (!process.env.ALGOLIA_API_KEY) {
  console.error('Missing env vars `ALGOLIA_API_KEY` & `ALGOLIA_APP_ID`.');
  process.exit(1);
}

const limiter = new Bottleneck({
  // 300 per user per 60 seconds: https://developers.google.com/docs/api/limits
  minTime: 60_000 / 300,
});

(async () => {
  const files = await getFiles();
  console.log('found %d files', files.length);
  files.forEach(file => {
    limiter.schedule(async () => {
      const doc = await getDoc(file.id);
      console.log('syncing doc', file.id);
      await addToIndex(file, extractParagraphs(doc.data.body));
    });
  });
})();
