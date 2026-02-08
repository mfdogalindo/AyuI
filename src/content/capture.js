// src/content/capture.js

export function analyzeSelection(selectionText) {
  if (!selectionText) {
    return {
      type: 'webpage',
      content: document.title,
      sourceUrl: window.location.href,
      xpath: ''
    };
  }

  const selection = window.getSelection();
  let type = 'text_selection';
  let xpath = '';

  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;

    // Check if inside code block
    let element = container.nodeType === 3 ? container.parentElement : container;
    while (element) {
      if (element.tagName === 'PRE' || element.tagName === 'CODE') {
        type = 'code_block';
        break;
      }
      element = element.parentElement;
    }

    xpath = getXPath(range.startContainer.parentElement);
  }

  return {
    type,
    content: selectionText,
    sourceUrl: window.location.href,
    xpath
  };
}

function getXPath(element) {
  if (element.id !== '') {
    return `//*[@id="${element.id}"]`;
  }
  if (element === document.body) {
    return element.tagName;
  }
  let ix = 0;
  let siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    let sibling = siblings[i];
    if (sibling === element) {
      return getXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
    }
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
}
