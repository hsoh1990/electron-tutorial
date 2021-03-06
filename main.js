const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const IpcMainClass = require('./src/communication/ipcMainClass');

let win;

function createWindow() {
  win = new BrowserWindow({width: 900, height: 600});
  let ipcMain = new IpcMainClass();
  ipcMain.setIpc();

  win.loadURL(url.format({
    pathname: path.join(__dirname, './src/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});