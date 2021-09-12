const algoliasearch = require('algoliasearch');

const index = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
).initIndex('GoogleDocsIndex');

module.exports.addToIndex = (file, segments) => {
  const indices = segments.map((segment, i) => ({
    googleId: file.id,
    headingId: segment.heading.id,
    headingContent: segment.heading.content,
    content: segment.content,
    name: file.name,
    objectID: file.id + i,
  }));
  // TODO prob need to delete extra objectIDs?
  return index.saveObjects(indices);
};
