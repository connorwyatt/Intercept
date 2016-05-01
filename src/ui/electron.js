'use strict';

const electron = require('electron'),
  url = require('url'),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;

let windows = {};

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

function startElectronApp(port) {
  app.on('ready', function() {
    windows.mainWindow = new BrowserWindow({
      width: 1200,
      height: 900,
      titleBarStyle: 'hidden',
      webPreferences: {
        nodeIntegration: false,
        preload: __dirname + '/preload.js'
      }
    });

    let uiUrl = url.format({
      protocol: 'http',
      hostname: 'localhost',
      port: port
    });

    windows.mainWindow.loadURL(uiUrl);

    windows.mainWindow.on('closed', function() {
      windows.mainWindow = null;
    });
  });
}

module.exports = {
  windows: windows,
  startElectronApp: startElectronApp
};
