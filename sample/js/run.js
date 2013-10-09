/**
 * @author odoe@odoe.net (Rene Rubalcava)
 */
/*global require, location*/
/*jshint laxcomma:true*/
(function() {
  'use strict';

  var pathRX = new RegExp(/\/[^\/]+$/)
    , locationPath = location.pathname.replace(pathRX, '');

  require({
    async: true,
    parseOnLoad: true,
    aliases: [['text', 'dojo/text']],
    packages: [{
      name: 'controllers',
      location: locationPath + 'js/controllers'
    }, {
      name: 'utils',
      location: locationPath + 'js/utils'
    }, {
      name: 'widgets',
      location: locationPath + 'js/widgets'
    }, {
      name: 'app',
      location: locationPath + 'js',
      main: 'main'
    }]
  }, ['app']);

}).call(this);
