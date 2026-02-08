import { analyzeSelection } from './capture.js';
import { showCaptureModal } from './modal.js';

console.log("Content script running");

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "capture_context") {
    // If background passed selection, use it, otherwise analyze page
    let selectionText = message.selectionText || window.getSelection().toString();

    // Default to analyzing what we have
    let nodeData = analyzeSelection(selectionText);

    // If context menu was page-level (no selection)
    if (!selectionText) {
      nodeData = {
        type: 'webpage',
        content: document.title,
        sourceUrl: window.location.href,
        xpath: ''
      };
    }

    // Show Modal
    showCaptureModal(nodeData, (userNote) => {
      // Send to background to save
      const finalNode = { ...nodeData, userNote };

      chrome.runtime.sendMessage({
        action: "save_node",
        node: finalNode
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError);
        } else if (response && response.success) {
          console.log("Node saved successfully:", response.node);
        } else {
          console.error("Failed to save node:", response ? response.error : "Unknown error");
        }
      });
    });
  }
});
