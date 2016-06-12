(function() {
  let packages = {
    app: {
      main: 'bootstrap',
      defaultExtension: 'js'
    }
  };

  let map = {
    '@angular': 'node_modules/@angular',
    '@ngrx': 'node_modules/@ngrx',
    'rxjs': 'node_modules/rxjs',
    'es6-shim': 'node_modules/es6-shim/es6-shim'
  };

  let packageConfigs = [
    { name: '@angular/common' },
    { name: '@angular/compiler' },
    { name: '@angular/core' },
    { name: '@angular/http' },
    { name: '@angular/platform-browser' },
    { name: '@angular/platform-browser-dynamic' },
    { name: '@angular/router' },
    { name: '@angular/router-deprecated' },
    { name: '@angular/testing' },
    { name: '@angular/upgrade' },
    { name: '@ngrx/core', format: 'cjs' },
    { name: '@ngrx/store', format: 'cjs' }
  ];

  packageConfigs.forEach((config) => {
    packages[config.name] = { main: 'index', defaultExtension: 'js' };

    if (config.format) {
      packages[config.name].format = config.format;
    }
  });

  var config = {
    defaultJSExtensions: true,
    transpiler: false,

    map: map,
    packages: packages
  };

  System.config(config);
}());
