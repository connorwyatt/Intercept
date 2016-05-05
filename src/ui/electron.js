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

    let menuTemplate = [
      {
        label: 'Application',
        submenu: [
          { label: `About ${app.getName()}`, selector: 'orderFrontStandardAboutPanel:' },
          { type: 'separator' },
          { label: 'Quit', accelerator: 'Command+Q', click: () => app.quit() }
        ]
      }, {
        label: 'Edit',
        submenu: [
          { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
          { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
        ]
      }
    ];

    electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(menuTemplate));
  });
}

module.exports = {
  windows: windows,
  startElectronApp: startElectronApp
};
