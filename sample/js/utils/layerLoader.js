/**
 * @author odoe@odoe.net (Rene Rubalcava)
 */
/*global define*/
/* jshint indent:false */
// TODO - add loaders for other maptypes
(function() {
  'use strict';

  define([
    'dojo/_base/array',
    'esri/lang',
    'esri/SpatialReference',
    'esri/layers/FeatureLayer',
    'esri/layers/ArcGISDynamicMapServiceLayer',
    'esri/layers/ArcGISImageServiceLayer',
    'esri/renderers/SimpleRenderer',
    'esri/renderers/jsonUtils'
  ], function(array, esriLang, SpatialReference, FeatureLayer, ArcGISDynamicMapServiceLayer, ArcGISImageServiceLayer, SimpleRenderer, jsonUtils) {

    /**
     * Private function to create a Dynamic Layer from config file
     * @param {Object} Layer options from config
     * @return {ArcGISDynamicMapServiceLayer} Dynamic Map Service Layer for map
     */
    function dynamicLoader(lyr) {
      var dlyr = new ArcGISDynamicMapServiceLayer(lyr.url, lyr);
      dlyr.title = lyr.title;
      dlyr.setVisibleLayers(lyr.visibleLayers);
      return dlyr;
    }

    /**
     * Private function to create a Dynamic Layer from config file
     * @param {Object} Layer options from config
     * @return {ArcGISImageServiceLaye} Image Map Service Layer for map
     */
    function imageLoader(lyr) {
      if (esriLang.isDefined(lyr.spatialReference)) {
        lyr.spatialReference = new SpatialReference(lyr.spatialReference);
      }
      return new ArcGISImageServiceLayer(lyr.url, lyr);
    }

    /**
     * Private function to create a FeatureLayer from config file
     * @param {Object} Layer options from config
     * @return {FeatureLayer} Feature Layer for map
     */
    function featureLoader(lyr) {
      if (lyr.drawingInfo) {
        return renderFeature(lyr, jsonUtils.fromJson(lyr.drawingInfo.renderer));
      }
      return new FeatureLayer(lyr.url, lyr);
    }

    function renderFeature(lyr, renderer, selectionSymbol) {
      var flyr = new FeatureLayer(lyr.url, lyr);
      if (renderer) {
        flyr.setRenderer(renderer);
      }
      if (selectionSymbol) {
        flyr.setSelectionSymbol(selectionSymbol);
      }
      return flyr;
    }

    function parseLayers(lyr) {
      var url = lyr.url.toLowerCase();
      if (url.indexOf('/mapserver') > -1) {
        return dynamicLoader(lyr);
      }

      if (url.indexOf('/featureserver') > -1) {
        return featureLoader(lyr);
      }

      if (url.indexOf('/imageserver') > -1) {
        return imageLoader(lyr);
      }
      console.warn(['ERROR - Layer type not currently supported for: ', lyr.url].join(' '));
      return null;
    }

    /**
     * The purpose of this function is to parse config layers to map layers
     * @param {Array} layers
     * @return {Object} object
     */
    function loadLayers(layers) {
      return array.map(layers, function(lyr) {
        return parseLayers(lyr);
      });
    }

    return loadLayers;

  });

})(this);

