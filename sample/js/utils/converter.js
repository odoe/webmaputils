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
    'esri/lang',
    'esri/SpatialReference',
    'esri/geometry/Extent',
    'esri/geometry/Point',
    './layerLoader',
  ], function(PrintTask, Map, esriLang, SpatialReference, Extent, Point, layerLoader) {

    function mapGen(mapOptions) {
      if (esriLang.isDefined(mapOptions.spatialReference)) {
        mapOptions.spatialReference = new SpatialReference(mapOptions.wkid);
        if (esriLang.isDefined(mapOptions.center)) {
          mapOptions.center = new Point(mapOptions.center, mapOptions.spatialReference);
        }
        if (esriLang.isDefined(mapOptions.extent)) {
          mapOptions.extent = new Extent(mapOptions.extent);
        }
      }

      // initialize the map
      return new Map('map', mapOptions);

    }

    return {

      toWebMapAsJSON: function(map) {
        return PrintTask.prototype._getPrintDefinition(map);
      },

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
