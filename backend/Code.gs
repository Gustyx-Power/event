/**
 * Google Apps Script Web App Backend
 * Web Trivia Marathon (Google One AI Pro 5TB Giveaway)
 *
 * Handles concurrent score submissions, prevents duplicate submissions per session,
 * and appends verified results into Google Sheets.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Attempt to acquire lock for up to 15 seconds to prevent race conditions
  var success = lock.tryLock(15000);

  if (!success) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Server is currently busy. Please retry shortly."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Sheet1") || ss.getActiveSheet();
    
    // Parse incoming payload
    var contents = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(contents);

    var username = (data.username || "").toString().trim();
    var session = parseInt(data.session, 10);
    var score = parseInt(data.score, 10) || 0;
    var correctAnswers = parseInt(data.correctAnswers, 10) || 0;
    var totalDuration = parseInt(data.totalDuration, 10) || 0;
    var userAgent = (data.userAgent || "Unknown").toString();

    // Basic Validation
    if (!username.startsWith("@") || isNaN(session) || session < 1 || session > 5) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Invalid payload parameters."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Score sanity check: max score per question is ~205 pts * 30 questions = ~6,150 pts
    if (score > 6500 || correctAnswers > 30 || correctAnswers < 0) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Score exceeds theoretical maximum limits."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Duplicate Check: Each Telegram username can only submit ONCE per session
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      var rowUser = rows[i][1].toString().toLowerCase();
      var rowSession = parseInt(rows[i][2], 10);

      if (rowUser === username.toLowerCase() && rowSession === session) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Session " + session + " has already been submitted by " + username
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Append new row
    // Column A: Timestamp
    // Column B: Telegram Username
    // Column C: Sesi Ke (1-5)
    // Column D: Skor Sesi
    // Column E: Jumlah Benar (0-30)
    // Column F: Total Durasi (Detik)
    // Column G: User Agent / Browser Info
    sheet.appendRow([
      new Date(),
      username,
      session,
      score,
      correctAnswers,
      totalDuration,
      userAgent
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Score recorded successfully for session " + session
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Google One AI Pro Trivia Marathon Backend",
    timestamp: new Date()
  })).setMimeType(ContentService.MimeType.JSON);
}
