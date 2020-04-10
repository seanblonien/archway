/* eslint-disable react/no-find-dom-node */
import ReactDOM from 'react-dom';
import insertTextAtCursor from 'insert-text-at-cursor';

/**
 * Insert the given text into the ReactMde textarea at the cursor.
 *
 * @param outerRef The outer ref to use when looking for the ReactMde textarea
 * @param text The text value to use to insert
 * @returns {null|String} The modified textarea value, or null if error
 */
const insertText = (outerRef, text) => {
  // Because ReactMde doesn't give us a ref value for the text area, we have to find it ourselves
  const inputs = ReactDOM.findDOMNode(outerRef.current).getElementsByClassName('mde-text');

  // Return if not found or found multiple editors
  if (!inputs || inputs.length === 0) {
    return null;
  }
  // Select the single textarea input
  const input = inputs[0];
  // Insert the text at the cursor
  insertTextAtCursor(input, text);

  // Return the changed input value to update the state value in the React state
  return input.value;
};

export default insertText;
