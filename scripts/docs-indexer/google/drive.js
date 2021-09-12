const { googleAuth } = require('./auth');
const { drive: gDrive } = require('@googleapis/drive');

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.photos.readonly',
];

/** @type import("@googleapis/drive").drive_v3.Drive */
let _drive;
const getDrive = async () => {
  if (!_drive) {
    const authClient = await googleAuth(SCOPES);

    _drive = gDrive({
      version: 'v3',
      auth: authClient,
    });
  }

  return _drive;
};

module.exports.getFiles = async () => {
  const drive = await getDrive();

  const files = await drive.files.list({
    pageSize: 1000,
    q: `(mimeType = 'application/vnd.google-apps.document')`,
  });

  return Promise.all(
    files.data.files.map(async f => {
      const file = await drive.files.get({
        fileId: f.id,
        fields:
          'id, name, description, mimeType, size, webContentLink, createdTime, modifiedTime, lastModifyingUser',
      });
      return file.data;
    })
  );
};
