System.config({
  defaultJSExtensions: true,
  transpiler: false,

  packages: {
    app: {
      main: 'bootstrap',
      defaultExtension: 'js'
    }
  },

  map: {
    'es6-shim': 'node_modules/es6-shim/es6-shim'
  }
});
