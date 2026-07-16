# PS5 PTA Website

SvelteKit static site for the Jersey City PS5 PTA, deployed to GitHub Pages at [ps5pta.github.io](https://ps5pta.github.io/).

## Content model

Page copy lives in a Google Sheet (one tab per page: `Home`, `Clubs`, `Fundraising`, `BeforeAfterSchool`, `GeneralInfo`, `Donate`). Each tab has `key | label | value | notes` columns — **only edit the `value` column**. Everything is fetched at build time via a service account; nothing runs client-side.

If Sheets credentials aren't configured (e.g. local dev), the build falls back to the committed JSON fixtures in `src/lib/server/fallback/`.

## Development

```sh
npm install
npm run dev       # uses fallback fixtures, no credentials needed
npm run build     # set GOOGLE_SERVICE_ACCOUNT_KEY + CONTENT_SHEET_ID to pull live content
npm run preview
```

## Re-seeding the Google Sheet

```sh
node scripts/seed-sheet.mjs --key /path/to/service-account.json --sheet-id <SHEET_ID>
```

Creates any missing tabs and (re)writes every row from the fallback fixtures. This overwrites the `value` column — don't run it after volunteers have made live edits you want to keep, unless you've updated the fixtures to match first.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`, on manual dispatch, and on a daily schedule (so Google Sheet edits show up even without a code change). Requires two GitHub repo settings:

- **Secret** `GOOGLE_SERVICE_ACCOUNT_KEY` — the service account's JSON key, raw.
- **Variable** `CONTENT_SHEET_ID` — the Google Sheet's ID (from its URL).

To manually trigger a rebuild after editing the sheet: `gh workflow run deploy.yml`.
