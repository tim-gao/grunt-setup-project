// Set the require.js configuration for your application.
require.config({
  
  baseUrl: '',
  paths: {
    'jquery': 'lib/jquery-3.2.0',
    'mytime':'src/mytime'
  },

  waitSeconds: 0,
  
  shim: {
    'jquery': {
      exports: '$'
    },
    'main': {
      deps: ['jquery']
    }
  },
  deps: ['main']
});