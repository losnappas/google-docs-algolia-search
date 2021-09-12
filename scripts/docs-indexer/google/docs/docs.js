const { googleAuth } = require('../auth');
const { docs: gDocs } = require('@googleapis/docs');

const SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];

/** @type import("@googleapis/docs").docs_v1.Docs */
let _docs;
const getDocs = async () => {
  if (!_docs) {
    _docs = gDocs({
      version: 'v1',
      auth: await googleAuth(SCOPES),
    });
  }

  return _docs;
};

module.exports.getDoc = async fileId => {
  const docs = await getDocs();
  const doc = await docs.documents.get({
    documentId: fileId,
  });

  return doc;
};
