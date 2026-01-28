/**
 * onEdit trigger runs automatically
 * whenever a user edits the Google Sheet
 */
function onEdit(e) {

  // Get the active sheet where the edit happened
  const sheet = e.source.getActiveSheet();

  // Get the exact cell (range) that was edited
  const range = e.range;

  // Run the script only on the main working sheet
  // Prevents execution on other sheets/tabs
  if (sheet.getName() !== "Automated Timestamp Tracker") return;

  // Check if:
  // 1. The edited column is Column C (Task column)
  // 2. The edited row is not the header row (row > 1)
  if (range.getColumn() === 3 && range.getRow() > 1) {

    // Get the corresponding Timestamp cell in Column D
    // Same row as the edited task
    const timestampCell = sheet.getRange(range.getRow(), 4);

    // Add timestamp only if it is empty
    // This ensures the original entry time is preserved
    if (!timestampCell.getValue()) {

      // Insert current date and time into the Timestamp cell
      timestampCell.setValue(new Date());
    }
  }
}
