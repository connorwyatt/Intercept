'use strict';

const electron = require('electron'),
  url = require('url'),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

function startElectronApp(port) {
  app.on('ready', function() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    let uiUrl = url.format({
      protocol: 'http',
      hostname: 'localhost',
      port: port
    });

    mainWindow.loadURL(uiUrl);

    mainWindow.on('closed', function() {
      mainWindow = null;
    });
  });
}

module.exports = {
  startElectronApp: startElectronApp
};
