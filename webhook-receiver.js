/**

Google Apps Script Webhook Receiver

Handles incoming Jotform POST requests and logs to Sheets */

function doPost(e) { try { const postData = JSON.parse(e.postData.contents); const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Submissions");

// Extracting core fields from Jotform's standard JSON structure
const submissionId = postData.submissionID;
const formTitle = postData.formTitle;
const timestamp = new Date();

// Mapping submission fields to columns
const row = [
  timestamp,
  submissionId,
  formTitle,
  JSON.stringify(postData) // Raw data for audit
];

sheet.appendRow(row);

return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);


} catch (err) { console.error("Webhook Error: " + err.message); return ContentService.createTextOutput("Error").setMimeType(ContentService.MimeType.TEXT); } }