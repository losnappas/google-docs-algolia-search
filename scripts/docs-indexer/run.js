/**
 * Run this script to index files from google docs.
 */
const { getThreeFiles } = require('./google/drive');
const { addToIndex } = require('./algolia/indexer');
const { getDoc } = require('./google/docs/docs');
const { extractParagraphs } = require('./google/docs/indexes');

if (!process.env.ALGOLIA_API_KEY) {
  console.error('Missing env vars `ALGOLIA_API_KEY` & `ALGOLIA_APP_ID`.');
  process.exit(1);
}

(async () => {
  const three = await getThreeFiles();
  three.forEach(async one => {
    const doc = await getDoc(one.id);
    await addToIndex(one, extractParagraphs(doc.data.body));
  });
})();
