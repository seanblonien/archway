import _ from 'lodash';

const StorageManager = {
  getItem: (key) => {
    // Get the item
    const item = localStorage.getItem(key);
    // If non null
    if(item) {
      // Check if item is JSON
      const isJSON = !_.isError(_.attempt(JSON.parse.bind(null, item)));
      // Return the string value or parsed JSON object
      return isJSON ? JSON.parse(item) : item;
    }
    return null;
  },
  setItem: (key, value) => {
    // If non null value
    if(value){
      // Set the item to itself if it is a string, or convert the object to a JSON string
      const item = typeof value === 'string' ? value : JSON.stringify(value);
      // Set the item
      localStorage.setItem(key, item);
    }
  },
  clearLocalStorage: () => localStorage.clear(),
};
export default StorageManager;
