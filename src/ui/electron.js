'use strict';

const electron = require('electron'),
  url = require('url'),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;

let windows = {};

app.on('window-all-closed', function() {
  app.quit();
});

function startElectronApp(port) {
  app.on('ready', function() {
    windows.mainWindow = new BrowserWindow({
      width: 1200,
      height: 900,
      minWidth: 600,
      minHeight: 450,
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
        role: 'edit',
        submenu: [
          { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
          { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
          { type: 'separator' },
          { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
          { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
        ]
      },
      {
        label: 'Help',
        role: 'help',
        submenu: [
          {
            label: 'Submit Bug/Feature Request',
            click: () => electron.shell.openExternal('https://github.com/connorwyatt/Intercept-Issue-Tracker/issues')
          }
        ]
      }
    ];

    //removeIf(production)
    menuTemplate.push({
      label: 'Developer',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.webContents.toggleDevTools();
            }
          }
        }
      ]
    });
    //endRemoveIf(production)

    electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(menuTemplate));
  });
}

module.exports = {
  windows: windows,
  startElectronApp: startElectronApp
};
