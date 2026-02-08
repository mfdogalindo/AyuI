// src/content/modal.js

export function showCaptureModal(capturedData, onSave) {
  const container = document.createElement('div');
  const shadow = container.attachShadow({ mode: 'open' });

  // Styles
  const style = document.createElement('style');
  style.textContent = `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      font-family: sans-serif;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 300px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    h3 {
      margin-top: 0;
      color: #333;
    }
    .preview {
      background: #f4f4f4;
      padding: 10px;
      border-radius: 4px;
      max-height: 100px;
      overflow-y: auto;
      font-size: 0.9em;
      margin-bottom: 10px;
      white-space: pre-wrap;
    }
    textarea {
      width: 100%;
      height: 80px;
      margin-bottom: 10px;
      padding: 8px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-cancel {
      background: #eee;
      color: #333;
    }
    .btn-save {
      background: #3498db;
      color: white;
    }
  `;
  shadow.appendChild(style);

  // HTML
  const wrapper = document.createElement('div');
  wrapper.className = 'modal-overlay';
  wrapper.innerHTML = `
    <div class="modal-content">
      <h3>Add to Graph</h3>
      <div class="preview">${escapeHtml(capturedData.content || capturedData.title)}</div>
      <label for="userNote">User Note:</label>
      <textarea id="userNote" placeholder="Why is this important?"></textarea>
      <div class="actions">
        <button class="btn-cancel">Cancel</button>
        <button class="btn-save">Save</button>
      </div>
    </div>
  `;
  shadow.appendChild(wrapper);

  document.body.appendChild(container);

  // Events
  const textarea = shadow.querySelector('#userNote');
  const btnSave = shadow.querySelector('.btn-save');
  const btnCancel = shadow.querySelector('.btn-cancel');

  btnSave.addEventListener('click', () => {
    const note = textarea.value;
    onSave(note);
    document.body.removeChild(container);
  });

  btnCancel.addEventListener('click', () => {
    document.body.removeChild(container);
  });

  textarea.focus();
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
