const StorageManager = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
  clearLocalStorage: () => localStorage.clear(),
};
export default StorageManager;
