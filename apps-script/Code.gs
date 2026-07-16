/**
 * Adds a "Force Republish" menu to this Sheet that triggers the GitHub Actions
 * workflow which rebuilds and redeploys https://ps5pta.github.io/.
 *
 * One-time setup (see apps-script/SETUP.md for full steps):
 *   1. Paste this file into Extensions ▸ Apps Script (replace the default Code.gs).
 *   2. Project Settings ▸ Script Properties ▸ add GITHUB_TOKEN = <a fine-grained PAT
 *      scoped to just the ps5pta.github.io repo, "Actions: Read and write" permission>.
 *   3. Reload the Sheet — the "🔄 Website" menu appears next to Help.
 */

const REPO = 'ps5pta/ps5pta.github.io';
const WORKFLOW_FILE = 'deploy.yml';

function onOpen() {
	SpreadsheetApp.getUi()
		.createMenu('🔄 Website')
		.addItem('Force Republish Now', 'forceRepublish')
		.addToUi();
}

function forceRepublish() {
	const ui = SpreadsheetApp.getUi();
	const token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');

	if (!token) {
		ui.alert(
			'Not set up yet',
			'No GitHub token is configured for this Sheet.\n\n' +
				'Go to Extensions ▸ Apps Script ▸ Project Settings ▸ Script Properties, ' +
				'and add GITHUB_TOKEN with a scoped Personal Access Token. See apps-script/SETUP.md ' +
				'in the site repo for exact steps.',
			ui.ButtonSet.OK
		);
		return;
	}

	const url = `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`;
	const response = UrlFetchApp.fetch(url, {
		method: 'post',
		contentType: 'application/json',
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/vnd.github+json'
		},
		payload: JSON.stringify({ ref: 'main' }),
		muteHttpExceptions: true
	});

	const code = response.getResponseCode();

	if (code === 204) {
		SpreadsheetApp.getActiveSpreadsheet().toast(
			'Republish triggered! The live site will update in about 30–60 seconds.',
			'PS5 PTA Website',
			8
		);
	} else {
		ui.alert(
			'Something went wrong',
			`GitHub responded with status ${code}:\n\n${response.getContentText()}\n\n` +
				'Common cause: the token is missing, expired, or lacks "Actions: Read and write" permission on this repo.',
			ui.ButtonSet.OK
		);
	}
}
