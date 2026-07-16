# Setting up the "Force Republish" menu

One-time setup, done once by whoever manages the GitHub account. After this, anyone with Editor access to the Sheet can use the menu.

## 1. Create a scoped GitHub token

Don't reuse the broad admin token used to set up the repo — create a new one limited to just this repo and just the ability to trigger a rebuild.

1. Log into GitHub as `ps5pta`, go to **Settings ▸ Developer settings ▸ Personal access tokens ▸ Fine-grained tokens ▸ Generate new token**.
2. **Repository access**: "Only select repositories" → `ps5pta.github.io`.
3. **Permissions**: expand "Repository permissions" → set **Actions** to **Read and write**. Leave everything else as "No access".
4. Generate, copy the token (starts with `github_pat_...`).

## 2. Paste the script into the Sheet

1. Open the [PS5 PTA Website Content sheet](https://docs.google.com/spreadsheets/d/1H8tW75hrFUE_Sg2vXxR1uAkKrVsV0yaRWHlmtytR8AA/edit).
2. **Extensions ▸ Apps Script**.
3. Delete whatever's in the default `Code.gs` and paste in the contents of `apps-script/Code.gs` from this repo.
4. Save (the disk icon or Cmd/Ctrl+S).

## 3. Store the token

1. Still in the Apps Script editor, click **Project Settings** (gear icon, left sidebar).
2. Scroll to **Script Properties ▸ Add script property**.
3. Property: `GITHUB_TOKEN`. Value: the token from step 1.
4. Save.

## 4. Use it

Reload the Google Sheet tab. A **🔄 Website** menu appears next to Help — click **Force Republish Now**. First run will prompt you to authorize the script (it needs permission to make external requests) — approve it, then click the menu item again.
