/**
 * @author odoe@odoe.net (Rene Rubalcava)
 */
/*global require*/
(function() {
  'use strict';

  require([
    'esri/config',
    'esri/request',
    'controllers/widgetcontroller',
    'dojo/domReady!'
  ], function (config, esriRequest, WidgetCtrl, tileStorage) {


    function onConfigSuccess(response) {
      var ctrl;
      delete response._ssl;
      if ('proxy' in response) {
        config.defaults.io.proxyUrl = response.proxy.url;
        config.defaults.io.alwaysUseProxy = response.proxy.alwaysUseProxy;
      }
      ctrl = new WidgetCtrl(response);
      ctrl.startup();
    }

    function onConfigError(error) {
      console.log('ERROR - Loading config file:', error);
    }

    function requestParams() {
      return {
        url: 'config.json',
        handleAs: 'json'
      };
    }

    // Read the config from a url
    esriRequest(requestParams()).then(onConfigSuccess, onConfigError);
  });
})(this);
