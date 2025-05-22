// Background service worker for the ONNX extension
// Handles extension lifecycle and communication

// Extension installation/startup
chrome.runtime.onInstalled.addListener(() => {
  console.log('{{extensionName}} installed');
});

// Handle messages from popup or other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);
  
  // Handle any background tasks here if needed
  // For this basic template, we don't need much background processing
  
  return false; // Don't keep the message channel open
});

// Optional: Handle extension startup
chrome.runtime.onStartup.addListener(() => {
  console.log('{{extensionName}} started');
});