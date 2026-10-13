# PS5 PTA Website

SvelteKit static site for the Jersey City PS5 PTA, deployed via GitHub Pages and served at [ps5pta.org](https://ps5pta.org/) (the underlying `ps5pta.github.io` host now redirects there).

## Content model

Page copy lives in a Google Sheet (one tab per page: `Home`, `Clubs`, `Fundraising`, `BeforeAfterSchool`, `GeneralInfo`, `Donate`). Each tab has `key | label | value | notes` columns — **only edit the `value` column**. Everything is fetched at build time via a service account; nothing runs client-side.

The live Sheet is the single source of truth. Dev and build both fail without Sheets credentials.

## Development

```sh
npm install
npm run dev       # needs GOOGLE_SERVICE_ACCOUNT_KEY + CONTENT_SHEET_ID (e.g. in a gitignored .env)
npm run build     # same env vars required
npm run preview
```

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`, on manual dispatch, and on a daily schedule (so Google Sheet edits show up even without a code change). Requires two GitHub repo settings:

- **Secret** `GOOGLE_SERVICE_ACCOUNT_KEY` — the service account's JSON key, raw.
- **Variable** `CONTENT_SHEET_ID` — the Google Sheet's ID (from its URL).

To manually trigger a rebuild after editing the sheet: `gh workflow run deploy.yml`.
