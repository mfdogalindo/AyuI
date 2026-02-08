import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY_INVESTIGATIONS = 'investigations';
const STORAGE_KEY_ACTIVE_ID = 'activeInvestigationId';

// Check if running in extension environment
const isExtension = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;

// Mock storage for development (in-memory)
let mockStorage = {
  [STORAGE_KEY_INVESTIGATIONS]: [],
  [STORAGE_KEY_ACTIVE_ID]: null
};

export const investigationRepository = {
  async getAll() {
    if (isExtension) {
      const result = await chrome.storage.local.get([STORAGE_KEY_INVESTIGATIONS]);
      return result[STORAGE_KEY_INVESTIGATIONS] || [];
    } else {
      return [...mockStorage[STORAGE_KEY_INVESTIGATIONS]];
    }
  },

  async getActiveId() {
    if (isExtension) {
      const result = await chrome.storage.local.get([STORAGE_KEY_ACTIVE_ID]);
      return result[STORAGE_KEY_ACTIVE_ID] || null;
    } else {
      return mockStorage[STORAGE_KEY_ACTIVE_ID];
    }
  },

  async create(title, description) {
    const newInvestigation = {
      id: uuidv4(),
      title,
      description,
      createdAt: new Date().toISOString(),
      nodes: [],
      edges: []
    };

    const investigations = await this.getAll();
    investigations.push(newInvestigation);

    if (isExtension) {
      await chrome.storage.local.set({ [STORAGE_KEY_INVESTIGATIONS]: investigations });
    } else {
      mockStorage[STORAGE_KEY_INVESTIGATIONS] = investigations;
    }

    return newInvestigation;
  },

  async setActive(id) {
    if (isExtension) {
      await chrome.storage.local.set({ [STORAGE_KEY_ACTIVE_ID]: id });
    } else {
      mockStorage[STORAGE_KEY_ACTIVE_ID] = id;
    }
  }
};
