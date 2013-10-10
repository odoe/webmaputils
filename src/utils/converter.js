/**
 * @author odoe@odoe.net (Rene Rubalcava)
 */
/*global define */
/*jshint laxcomma:true*/
/** for details refer to:
*   - http://resources.arcgis.com/en/help/arcgis-web-map-json/#/Web_map_data/02qt0000000q000000/
*   - http://resources.arcgis.com/en/help/main/10.1/index.html#//0154000004w8000000
* **/
(function() {
  'use strict';

  define([
    'esri/tasks/PrintTask',
    'esri/map',
    'esri/SpatialReference',
    'esri/geometry/Extent',
    'esri/geometry/Point',
    './layerLoader',
  ], function(PrintTask, Map, SpatialReference, Extent, Point, layerLoader) {

    /**
     * Generates a map from mapOptions
     * @private
     * @param {Object} mapOptions
     * @return {esri/map}
     */
    function mapGen(mapOptions) {
      if (!mapOptions) {
        return null;
      }
      if (!!mapOptions.spatialReference) {
        mapOptions.spatialReference = new SpatialReference(mapOptions.wkid);
        if (!!mapOptions.center) {
          mapOptions.center = new Point(mapOptions.center, mapOptions.spatialReference);
        }
        if (!!mapOptions.extent) {
          mapOptions.extent = new Extent(mapOptions.extent);
        }
      }

      // initialize the map
      return new Map('map', mapOptions);
    }

    return {

      /**
       * Uses {esri/tasks/PrintTask} to convert
       * a map to ExportWebMapJSON specs.
       * @param {esri/map} map
       * @return {Object}
       */
      toWebMapAsJSON: function(map) {
        return PrintTask.prototype._getPrintDefinition(map);
      },

      /**
       * Converts a json config to a map and
       * operational layers.
       * @param {Object} obj
       * @return {Object} - object contains map & operational layers
       */
      fromWebMapAsJSON: function(obj) {
        var mapOptions = obj.mapOptions
          , operationalLayers = obj.operationalLayers
          , map
          , layers;

        map = mapGen(mapOptions);
        layers = layerLoader(operationalLayers);

        return {
          map: map,
          layers: layers
        };
      }

    };

  });

})(this);
