const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    signMessage: (message, privateKey) => ipcRenderer.invoke('sign-message', message, privateKey)
});