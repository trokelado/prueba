import Ember from 'ember';

export default Ember.Component.extend({
    esriLoader: Ember.inject.service('esri-loader'),

    didInsertElement () {
    //alert('entre al didInsertElement !');
    this._super(...arguments);    
    // load the map modules

    this.get('esriLoader').loadModules(['esri/map', 'esri/graphic', 'esri/geometry/Point', 'esri/layers/GraphicsLayer', 'esri/SpatialReference', 'esri/units', 'esri/dijit/Scalebar', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/Extent', 'esri/geometry/webMercatorUtils', "esri/tasks/locator"]).then(modules => {
    const [Map, Graphic, Point, GraphicsLayer, SpatialReference, Units, Scalebar, PictureMarkerSymbol, Extent, webMercatorUtils, Locator] = modules;            
                 
      //alert('entre al esriLoader en esri-map !');      
      //var startExtent = new Extent(-97.8486, 22.2604, -97.843, 22.2631, new SpatialReference({ wkid:4326 }) ); // mi home extent      
      //me -10892524.74775520, 2542952.92608241
      this._map = new Map(this.elementId, {
        center: [-97.846, 22.262], // longitude, latitude initial         
        basemap: 'streets',  //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray' "gray", "oceans", "osm", "national-geographic"
        //center: [-97.8456, 22.2624], // longitude, latitude Tampico
        //extent: startExtent,
        zoom: 15
      });      
      //this._map.setExtent(startExtent);
      var scalebar = new Scalebar({
        map: this._map,
        attachTo: 'bottom-left',
        scalebarUnit: 'metric' //'metric' 'dual' 'english'
      });
      let pointLayer = new GraphicsLayer({ id: 'pointLayer' });
                                                                                    
        // Create a point graphic //
        var X = -10892210.0;
        var Y = 2543022.0;                                                        
        var spRef = 102100;      
        let point = new Point(X, Y, new SpatialReference({ wkid: spRef }));        
        point = webMercatorUtils.webMercatorToGeographic(point); //102100 4326                           
        let markerPicture = new PictureMarkerSymbol();      
        markerPicture.setHeight(20);
        markerPicture.setWidth(20);
        
        let url = '/assets/logos/GrupoGBeige.png';                  
        
        markerPicture.setUrl(url);
        let aGraphic = new Graphic(point, markerPicture);                                    

        pointLayer.add(aGraphic);                  
                                                    
        this._map.addLayer(pointLayer);

        var locator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");

        locator.on("location-to-address-complete", function(evt) {
            if (evt.address.address) {
                var address = evt.address.address;
                var location = evt.address.location;                                        
                //alert('el location es  x: ' + location.x + ' ' + location.y);
                alert(address.Address + ' ' + address.Neighborhood + ' ' + address.City + ', ' + address.Region + ' ' + address.Postal + ' ' + address.CountryCode);
                                    
                //var location = webMercatorUtils.geographicToWebMercator(evt.address.location);
                //this service returns geocoding results in geographic - convert to web mercator to display on map
                // var location = webMercatorUtils.geographicToWebMercator(evt.location);
                //var graphic = new Graphic(location, symbol);
                //map.graphics.add(graphic);                                                                                
            }
        });

        this._map.on("click", myPointClickHandler); //si jala

        function myPointClickHandler(event) {
            //alert('entre al myPointClickHandler de new-project-map !');                
            //self.map.graphics.clear();
            locator.locationToAddress(webMercatorUtils.webMercatorToGeographic(event.mapPoint), 100);
        }
   })
  },

    basemapChanged: function() {
    var basemap = this.get('selectedBasemap');
    if (!basemap) {
      return;
    }
    this.willDestroyElement();

    this.get('esriLoader').loadModules(['esri/map', 'esri/graphic', 'esri/geometry/Point', 'esri/layers/GraphicsLayer', 'esri/SpatialReference', 'esri/units', 'esri/dijit/Scalebar', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/Extent', 'esri/geometry/webMercatorUtils', "esri/tasks/locator"]).then(modules => {
    const [Map, Graphic, Point, GraphicsLayer, SpatialReference, Units, Scalebar, PictureMarkerSymbol, Extent, webMercatorUtils, Locator] = modules;            

      this._map = new Map(this.elementId, {                         
          basemap: basemap.id,  //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray' "gray", "oceans", "osm", "national-geographic"        
          center: [-97.846, 22.262],
          zoom: 15
      });
                            
      var scalebar = new Scalebar({
        map: this._map,
        attachTo: 'bottom-left',
        scalebarUnit: 'metric' //'metric' 'dual' 'english'
      });
      
        let pointLayer = new GraphicsLayer({ id: 'pointLayer' });
                                                                                    
        // Create a point graphic //
        var X = -10892210.0;
        var Y = 2543022.0;                                                        
        var spRef = 102100;      
        let point = new Point(X, Y, new SpatialReference({ wkid: spRef }));        
        point = webMercatorUtils.webMercatorToGeographic(point); //102100 4326                           
        let markerPicture = new PictureMarkerSymbol();      
        markerPicture.setHeight(20);
        markerPicture.setWidth(20);
        
        let url = '/assets/logos/GrupoGBeige.png';                  
        
        markerPicture.setUrl(url);
        let aGraphic = new Graphic(point, markerPicture);                                    

        pointLayer.add(aGraphic);                  
                                                    
        this._map.addLayer(pointLayer);

        var locator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");

        locator.on("location-to-address-complete", function(evt) {
            if (evt.address.address) {
                var address = evt.address.address;
                var location = evt.address.location;                                        
                //alert('el location es  x: ' + location.x + ' ' + location.y);
                alert(address.Address + ' ' + address.Neighborhood + ' ' + address.City + ', ' + address.Region + ' ' + address.Postal + ' ' + address.CountryCode);
                                    
                //var location = webMercatorUtils.geographicToWebMercator(evt.address.location);
                //this service returns geocoding results in geographic - convert to web mercator to display on map
                // var location = webMercatorUtils.geographicToWebMercator(evt.location);
                //var graphic = new Graphic(location, symbol);
                //map.graphics.add(graphic);                                                                                
            }
        });

        this._map.on("click", myPointClickHandler); //si jala

        function myPointClickHandler(event) {
            //alert('entre al myPointClickHandler de new-project-map !');                
            //self.map.graphics.clear();
            locator.locationToAddress(webMercatorUtils.webMercatorToGeographic(event.mapPoint), 100);
        }                
    })    
  }.observes('selectedBasemap'), 

  // destroy the map before this component is removed from the DOM
  willDestroyElement () {
    if (this._map) {
      this._map.destroy();
      delete this._map;
    }
  },

  actions: {
    /*
    chooseBasemap(basemap) {
     alert("entre al chooseBasemap de esri-contact.js");
      this.set('selectedBasemap', basemap);                  
    },
    */
  }
});
