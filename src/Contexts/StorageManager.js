const StorageManager = {
  getItem: (key) => {
    const item = localStorage.getItem(key);
    return typeof item === 'string' ? item : JSON.parse(item);
  },
  setItem: (key, value) => {
    const item = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, item);
  },
  clearLocalStorage: () => localStorage.clear(),
};
export default StorageManager;
