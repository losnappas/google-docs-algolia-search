# Google doc search with Algolia

_This project was generated with [create-instantsearch-app](https://github.com/algolia/create-instantsearch-app) by [Algolia](https://algolia.com)._

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
