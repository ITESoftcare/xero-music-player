import PropTypes from 'prop-types';
// import { ipcRenderer } from 'electron';
const { ipcRenderer } = require('electron');

export function sendMessageToNode(message, payload) {
    ipcRenderer.send(message, payload);
}

sendMessageToNode.propTypes = {
    message: PropTypes.String,
    payload: PropTypes.any
};
