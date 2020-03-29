import jwtDecode from 'jwt-decode';
const StorageManager = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
  getProfile: () => {
    if(localStorage.getItem('id_token')) {
      return jwtDecode(localStorage.getItem('id_token'));
    }
    return {};
  },
  clearLocalStorage: () => localStorage.clear(),
};
export default StorageManager;