# Google doc search with Algolia

_This project was generated with [create-instantsearch-app](https://github.com/algolia/create-instantsearch-app) by [Algolia](https://algolia.com)._

Stupid simple search of Google docs via Algolia.

Features

- Links directly to subheading
- Indexes just about every google doc file (because I forgot to add the [size limit check](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/tutorials/google-drive-algolia/#case-1-you-dont-want-to-index-the-content) 😎) 

Non-features

- Images
- Sheets or anything that isn't google docs
- Nice layouts in search results; this is low effort. Prob worth to check it in gitpod if you're curious/looking for this. Contribute back thx!

You'll need to:

- Index your Google docs to Algolia (more on that below; use the script)
- Fork this repo and change some of the hard coded keys (more on that below below)

## Get started

To run this project locally, install the dependencies and run the local server:

```sh
npm install
npm start
```

Alternatively, you may use [Yarn](https://http://yarnpkg.com/):

```sh
yarn
yarn start
```

Open http://localhost:3000 to see your app.

## Indexer script steps

For running the indexer script, get:

- Algolia api key + app id
- Google service account json file
  - Save it in scripts/docs-indexer/google-service-account.json
  - You need to share the google docs you want to index with the service account email for it to find them

Then run the indexer script with:

```sh
ALGOLIA_API_KEY=... ALGOLIA_APP_ID=... node scripts/docs-indexer/run.sh
```

## API keys on the frontend

Change `appId` and `apiKey` in `src/App.js` at `algoliasearch("appId", "apiKey")`.
