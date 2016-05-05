(function() {
  let packages = {
    app: {
      main: 'bootstrap',
      defaultExtension: 'js'
    }
  };

  let map = {
    '@angular': 'node_modules/@angular',
    'es6-shim': 'node_modules/es6-shim/es6-shim',
    'socket.io': 'node_modules/socket.io-client/socket.io'
  };

  let packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade'
  ];

  packageNames.forEach((packageName) => {
    packages[packageName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    defaultJSExtensions: true,
    transpiler: false,

    map: map,
    packages: packages
  };

  System.config(config);
}());
