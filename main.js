
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const fs = require('fs');

async function executeFunctionAsync(func) {
  return func();
}

function executeFunctionCallback(func, callback) {
  callback(func());
}

// read all file in src/pages folder
const pages = fs.readdirSync('./src/pages').filter(file => file.endsWith('.js'));
console.log(pages);
function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  //load the index.html from a url
  win.loadURL('http://localhost:3000');

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle("main:executeAsync", executeFunctionAsync);
  ipcMain.handle("main:executeCallback", executeFunctionCallback);

  // register all ipc in pages
  for (const page of pages) {

    const pageObject = require(`./src/pages/${page}`);
    if (pageObject.ipcName != undefined) {
      ipcMain.handle(pageObject.ipcName, pageObject.mainFunction);
    }
  }
  createWindow();
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.