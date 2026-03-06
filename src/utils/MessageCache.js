import * as SQLite from 'expo-sqlite';

class MessageCache {
  constructor() {
    this.db = null;
  }

  async init() {
    if (!this.db) {
      this.db = await SQLite.openDatabaseAsync('cipherchat.db');
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS decrypted_messages (
          id TEXT PRIMARY KEY,
          text TEXT NOT NULL,
          chatId TEXT NOT NULL
        );
      `);
    }
  }

  async cacheMessage(id, text, chatId) {
    await this.init();
    try {
      await this.db.runAsync(
        'INSERT OR IGNORE INTO decrypted_messages (id, text, chatId) VALUES (?, ?, ?)',
        id,
        text,
        chatId,
      );
    } catch (e) {
      console.warn('Cache Insert Error:', e);
    }
  }

  async getCachedMessage(id) {
    await this.init();
    try {
      const result = await this.db.getFirstAsync(
        'SELECT text FROM decrypted_messages WHERE id = ?',
        id,
      );
      return result ? result.text : null;
    } catch (e) {
      console.warn('Cache Select Error:', e);
      return null;
    }
  }
}

export default new MessageCache();
