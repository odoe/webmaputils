/**
 * @author odoe@odoe.net (Rene Rubalcava)
 */
/*global define */
/*jshint laxcomma:true*/
(function() {
  'use strict';

  define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/Evented',
    'dojo/Deferred',
    'dojo/dom-construct',
    // dijit stuff
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'utils/converter'
  ], function(declare, array, lang, on, Evented, Deferred, domConstruct, _WidgetBase, _TemplatedMixin, converter) {

    return declare('widgets/map/map', [_WidgetBase, _TemplatedMixin, Evented], {

      options: {},

      templateString: '<div id="container-main"><div id="map"></div></div>',

      constructor: function(options) {
        declare.safeMixin(this.options, options);

        this.options = this.options || {};
        this.mapOptions = this.options.mapOptions || {};
      },

      postCreate: function() {
        domConstruct.place(this.domNode, document.body);
      },

      startup: function() {
        var data = converter.fromWebMapAsJSON(this.options);

        // initialize the map
        this.set('map', data.map);
        on.once(this.get('map'), 'layers-add-result', lang.hitch(this, this._layersAddedHandler));
        this.map.addLayers(data.layers);
      },

      // private methods
      _layersAddedHandler: function() {
        this._init();
      },

      _init: function() {
        this.set('loaded', true);
        var params = {
          map: this.get('map'),
          config: this.options
        };
        this.emit('map-ready', params);
      }

    });

  });

})(this);
