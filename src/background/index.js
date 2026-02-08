import { investigationRepository } from '../lib/storage.js';

// Setup Context Menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "add-to-graph",
    title: "Agregar al Grafo",
    contexts: ["selection", "page"]
  });
});

// Handle Context Menu Click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "add-to-graph") {
    chrome.tabs.sendMessage(tab.id, {
      action: "capture_context",
      selectionText: info.selectionText || "",
      pageUrl: info.pageUrl,
      title: tab.title
    });
  }
});

// Handle Messages from Content Script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "save_node") {
    handleSaveNode(message.node, sendResponse);
    return true; // async response
  }
});

async function handleSaveNode(nodeData, sendResponse) {
  try {
    const activeInvId = await investigationRepository.getActiveId();
    if (!activeInvId) {
      sendResponse({ success: false, error: "No active investigation" });
      return;
    }

    const newNode = await investigationRepository.addNodeToActiveInvestigation(nodeData);
    sendResponse({ success: true, node: newNode });
  } catch (error) {
    console.error("Error saving node:", error);
    sendResponse({ success: false, error: error.message });
  }
}
