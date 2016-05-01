process.once('loaded', function() {
  global.ELECTRON_IPC = require('electron').ipcRenderer;
});
