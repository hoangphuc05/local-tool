const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

const pages = fs.readdirSync('./src/pages').filter(file => file.endsWith('.js'));

for (const page of pages) {
  const pageObject = require(`./src/pages/${page}`);
  if (pageObject.ipcName != undefined) {
    contextBridge.exposeInMainWorld('pageApi', {
      [pageObject.ipcName]: (...args) => ipcRenderer.invoke(pageObject.ipcName, args)
    })
  }
}

contextBridge.exposeInMainWorld('electronAPI',{
  executeAsync: (func) => ipcRenderer.invoke('main:executeAsync', func),
  
})