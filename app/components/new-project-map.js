import Ember from 'ember';

export default Ember.Component.extend({
    esriLoader: Ember.inject.service('esri-loader'),
 
    didInsertElement () {
        //alert('entre al didInsertElement !');
        this._super(...arguments);

        // load the map modules      
        this.get('esriLoader').loadModules(['esri/map', "esri/graphic", 'esri/SpatialReference', 'esri/geometry/Extent', 'esri/dijit/Scalebar', 'esri/geometry/webMercatorUtils']).then(modules => {
            const [Map, Graphic, SpatialReference, Extent, Scalebar, webMercatorUtils] = modules;           
            //alert('entre al esriLoader en esri-map !');      
            
            this._map = new Map(this.elementId, {
                center: [-10.0, 40.0], // longitude, latitude initial         
                basemap: 'streets',  //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray' "gray", "oceans", "osm", "national-geographic"        
                zoom: 3
            });      
            
            var scalebar = new Scalebar({
                map: this._map,
                attachTo: 'bottom-left',
                scalebarUnit: 'metric' //'metric' 'dual' 'english'
            });
            var self = this;

            this._map.on("extent-change", function(map) {
                var mapExtent = map.extent;
                //console.log(mapExtent.xmin, mapExtent.ymin, mapExtent.xmax, mapExtent.ymax);             
                self.get('esriLoader').loadModules(['esri/geometry/webMercatorUtils']).then(modules => {
                    const [webMercatorUtils] = modules;                                 
                    var geoExtent = webMercatorUtils.webMercatorToGeographic(mapExtent);
                    //console.log(geoExtent.xmin, geoExtent.ymin, geoExtent.xmax, geoExtent.ymax);             
                    self.set('geoExtent', geoExtent);
                });            
            });                                    
        });
    },  
});
