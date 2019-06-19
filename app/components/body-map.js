import Ember from 'ember';

export default Ember.Component.extend({
  esriLoader: Ember.inject.service('esri-loader'),
  store: Ember.inject.service('store'),  

  didInsertElement () {
    //alert('entre al didInsertElement !'); 
    this._super(...arguments);    
    // load the map modules
      
    this.get('esriLoader').loadModules(['esri/map', 'esri/SpatialReference', 'esri/geometry/Extent', 'esri/dijit/Scalebar']).then(modules => {
      const [Map, SpatialReference, Extent, Scalebar] = modules;          
      //alert('entre al esriLoader en esri-map !');
      //var startExtent = new Extent(-97.8486, 22.2604, -97.843, 22.2631, new SpatialReference({ wkid:4326 }) ); // mi home extent      
      
      this._map = new Map(this.elementId, {
        center: [-10.0, 40.0], // longitude, latitude initial         
        basemap: 'hybrid',  //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray' "gray", "oceans", "osm", "national-geographic"
        //center: [-97.8456, 22.2624], // longitude, latitude Tampico
        //extent: startExtent,
        zoom: 3
      });      
      //this._map.setExtent(startExtent);
      /*
      var scalebar = new Scalebar({
        map: this._map,
        attachTo: 'bottom-left',
        scalebarUnit: 'metric' //'metric' 'dual' 'english'
      });
      */      
   })
  },

    basemapChanged: function() {
    var basemap = this.get('selectedBasemap');
    var project = this.get('selectedProject');
    if (!basemap) {
      return;
    }
    //this.willDestroyElement();
    this.get('esriLoader').loadModules(['esri/map', 'esri/SpatialReference', 'esri/geometry/Extent', 'esri/dijit/Scalebar']).then(modules => {
      const [Map, SpatialReference, Extent, Scalebar] = modules;          

      if (!project) {
        this.willDestroyElement();
        this._map = new Map(this.elementId, {                         
          basemap: basemap.id,  //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray' "gray", "oceans", "osm", "national-geographic"        
          center: [-10.0, 40.0],
          zoom: 3
        });
        return;
      }
      console.log("entre al basemapChanged de body-map cambie el mapa y voy a recuperar el proyecto !!");      
      this.projectChanged();                            
    })    
  }.observes('selectedBasemap'),

    projectChanged: function() {
    //alert("entre al projectChanged de body-map a cambiar de proyecto !!");
    var basemap = this.get('selectedBasemap');
    if (!basemap) {
      return;
    }
    this.willDestroyElement();
    this.get('esriLoader').loadModules(['esri/map', 'esri/SpatialReference', 'esri/geometry/Extent', 'esri/dijit/Scalebar', 'esri/geometry/webMercatorUtils']).then(modules => {
      const [Map, SpatialReference, Extent, Scalebar, webMercatorUtils] = modules;          
      
      this._map = new Map(this.elementId, {                         
          basemap: basemap.id,  //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray' "gray", "oceans", "osm", "national-geographic"        
          //zoom: 10
      });
      var startExtent = null;
      var project = this.get('selectedProject.id');
      if (!project) {
        //xmin: -87.5149753459953, ymin: 21.2379778182316, xmax: -87.0975774085202, ymax: 21.7033886259071…}
        //startExtent = new Extent(-95.271, 38.933, -95.228, 38.976, new SpatialReference({ wkid:4326 }) ); oklahoma
        //startExtent = new Extent(-90.271, 23.2, -89.228, 23.8, new SpatialReference({ wkid:4326 }) ); // Cancun
        //startExtent = new Extent(-87.514, 21.237, -87.097, 21.703, new SpatialReference({ wkid:4326 }) ); // Ballena
        startExtent = new Extent(-95.98973437499683, 13.83468072493534, -81.16917773437575, 23.88915262202465, new SpatialReference({ wkid:4326 }) ); // Cinpa        
      } else {
        //alert('el proyecto es : ' + project);
        var proyecto = this.get('store').peekRecord('project', project);
        //alert('el proyecto es : ' + proyecto);
        //let proyecto = project.get('project');
        var minX = proyecto.get('minX');
        var minY = proyecto.get('minY');
        var maxX = proyecto.get('maxX');
        var maxY = proyecto.get('maxY');                  
        var spRef = proyecto.get('spRef');
        //alert('el proyecto es minX: ' + minX);        
        startExtent = new Extent(minX, minY, maxX, maxY, new SpatialReference({ wkid: spRef }) );
        //startExtent = new Extent(parseFloat(minX), parseFloat(minY), parseFloat(maxX), parseFloat(maxY), new SpatialReference({ wkid: spRef }) );
        //startExtent = new Extent(-95.271, 38.933, -95.228, 38.976, new SpatialReference({ wkid:4326 }) );
        //startExtent = new Extent(-93.400, 18.433, -83.142, 21.851, new SpatialReference({ wkid:4326 }) ); //Cinpa no jala
        let _refGringa = 102100;
        
        if (spRef === _refGringa) {
          //console.log('toy en el web mercator !');
            startExtent = webMercatorUtils.webMercatorToGeographic(startExtent); //102100 4326
        } 
    }                        
      this._map.setExtent(startExtent);      

      var scalebar = new Scalebar({
        map: this._map,
        attachTo: 'bottom-left',
        scalebarUnit: 'metric' //'metric' 'dual' 'english'
      });

      //var mapOnLoad = this._map.on("load", function() {
        //this._map.graphics.on("click", myGraphicsClickHandler);
      //});

      this.rerender();
        // pruebas
        //mapOnLoad = this._map.on("load", () => {
        //alert("entre al mapOnLoad !! ");
         //this._map.disableScrollWheelZoom(); //si jalo
        // let the rest of the app know that the map is available
        //this.trigger('load');
        this._map.on("click", myPointClickHandler); //si jala        

        //});
        var self = this;              

        function myPointClickHandler(event) {
          
          let modo = self.get('selectedMode');
          //alert("el modo es: " + modo.name);
          if (modo.name === 'Agregar') {

            var figure = self.get('selectedFigure');
            if (!figure) {
                alert("Seleccione una figura !");
                return;
            }
            var feature = self.get('selectedFeature');
            if (!feature) {
                alert("Seleccione un grupo !");
                return;
            }
            var mobil = self.get('selectedMobil');
            if (!mobil) {
                alert("Seleccione un componente !");
                return;
            }                        
            let name = self.get('name');          
            if (name === undefined) {
                alert("Introdusca un nombre para el componente !");
                return;
            }
            var reference = self.get('reference');
            if (reference === undefined) {
                alert("Introdusca una referencia para el componente !");
                return;
            }            
            let draw = self.get('startDraw');
            if(!draw) {
              alert("estoy en pausa de dibujado !");
              return
            }
            console.log("User clicked at " +
              event.screenPoint.x + ", " + event.screenPoint.y +
              " on the screen. The map coordinate at this point is " +
              event.mapPoint.x + ", " + event.mapPoint.y
            );            

            if (figure.id === 'Punto') {
              var params = {
                name: name,
                isActive: true,
                reference: reference,
                icon: '',       
                spRef: '102100',
                X: event.mapPoint.x,
                Y: event.mapPoint.y,       
                mobil: mobil
              };
              console.log("voy a grabar el nuevo punto !");    
              self.sendAction('savePoint', params);            
              let aGraphic = showPoint(event, mobil, self);                       
              return;  
            }
            //demas figuras            
            let flag = self.get('deletePreviousJson');
            //alert("el deleteJsonFlag es : " + flag);
            if (flag) {
              self.set('firstJson', null);
              self.set('acumJson', null);
              self.set('deletePreviousJson', false); 
            } 
            if (figure.id === 'Polígono') {
              let newJson = '[' + event.mapPoint.x + ',' + event.mapPoint.y + ']';
              let firstJson = self.get('firstJson');
              if (!firstJson) {              
                self.set('firstJson', newJson);  
              }
              let acumJson = self.get('acumJson');
              if (!acumJson) { 
                self.set('acumJson', newJson);
              } else {
                self.set('acumJson', acumJson + ',' + newJson);
              }            
              console.log("el acumulado Json es: " + self.get('acumJson'));                            
              let aGraphic = showMiniPoint(event, self);                       
              return;  
            }
            if (figure.id === 'Línea') {
              let newJson = '[' + event.mapPoint.x + ',' + event.mapPoint.y + ']';            
              let acumJson = self.get('acumJson');
              if (!acumJson) { 
                self.set('acumJson', newJson);
              } else {
                self.set('acumJson', acumJson + ',' + newJson);
              }            
              console.log("el acumulado Json es: " + self.get('acumJson'));                            
              let aGraphic = showMiniPoint(event, self);                       
              return;  
            }
            if (figure.id === 'Elipse') {
              let newJson = '[' + event.mapPoint.x + ',' + event.mapPoint.y + ']';                           
              self.set('acumJson', newJson);                         
              console.log("el acumulado Json es: " + newJson);                            
              let aGraphic = showMiniPoint(event, self);                       
              return;  
            }
            
          } else {  //no es modo aregar              
            var grafico = event.graphic;
            //var it = grafico.getInfoTemplate();
            //var node = grafico.getNode();
            var title = grafico.getTitle();
            var content = grafico.getContent();        
            //console.log("User clicked on event.target" + event.target);
            //console.log("User clicked on event.graphic" + event.graphic);
            //console.log("User clicked on it " + it);
            console.log("User clicked on grafico.getTitle() " + title);
            console.log("User clicked on cont " + content);          
            //let element = this._map.$(event.target); //Basically to the get the DOM element created by the view

            self.set('selectedDoc', null);
            let l = -1;
            l = content.search("<b>Punto:");
            if (l > -1) {
              var n = content.search("id: </b>");
              var pointId = content.substring(n + 8, n + 8 + 20)
              console.log("el pointId es: " + pointId);          
              var point = self.get('store').peekRecord('point', pointId);                          
              var selectedDocs = point.get('docs');
              console.log("el numero de selectedDocs es: " + selectedDocs.get('length'));
              if (selectedDocs.get('length') === 0) {          
                self.set('isDocVisible', false);
                return;
              }                
              self.set('selectedDocs', selectedDocs);                              
              self.set('isDocVisible', true);
              return;
            }
              l = content.search("<b>Circulo:"); 
              if (l > -1) {
                var n = content.search("id: </b>");
                var ellipseId = content.substring(n + 8, n + 8 + 20)
                console.log("el ellipseId es: " + ellipseId);                             
                self.set('isDocVisible', false);          
                return;
              }
            }                                                        
        };

        function showPoint(event, theMobil, self) {        
          console.log("entre al showPoint !");
          self.get('esriLoader').loadModules(['esri/graphic', 'esri/layers/GraphicsLayer', 'esri/geometry/Point', 'esri/SpatialReference', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/webMercatorUtils']).then(modules => {
          const [Graphic, GraphicsLayer, Point, SpatialReference, PictureMarkerSymbol, webMercatorUtils] = modules;            
          console.log("pase el loadModules !");
          let X = event.mapPoint.x;
          let Y = event.mapPoint.y;
          let spRef = 102100;
          //var X = thePoint.get('X');
          //var Y = thePoint.get('Y');                                      
          //var spRef = thePoint.get('spRef');
          //let _refGringa = 102100;      
          var point = new Point(X, Y, new SpatialReference({ wkid: spRef }));
          //if (point.spatialReference === _refGringa) {
            console.log('toy en el web mercator !');
            point = webMercatorUtils.webMercatorToGeographic(point); //102100 4326
          //}                    
          
          var markerPicture = new PictureMarkerSymbol();      
          markerPicture.setHeight(20);
          markerPicture.setWidth(20);
          
          //var url = thePoint.get('imagePath');
          //if (url === '/assets/logos/') {
            let url = theMobil.get('imagePath');
            console.log('el url = ' + url);
          //}    
          markerPicture.setUrl(url);    
          let aGraphic = new Graphic(point, markerPicture);    
          /*
          var infoTemplate = new InfoTemplate();
          infoTemplate.setTitle(thePoint.get('name'));
          infoTemplate.setContent("<b>Reference: </b>" + thePoint.get('reference') + "<br/>"
          + "<b>id: </b>" + thePoint.get('id') + "<br/>");
          aGraphic.setInfoTemplate(infoTemplate);
          //console.log('ya pase el aGraphic de showPoint y es : ' + aGraphic);
          */
          //let ahora = new Date().getTime(); // este covierte a timestamp
          //console.log('el ahora es = ' + ahora);        
          let pointLayer = new GraphicsLayer(); 
          pointLayer.add(aGraphic);
          self._map.addLayer(pointLayer);
          return// aGraphic;
          })         
        }

        function showMiniPoint(event, self) {        
          console.log("entre al showMiniPoint !");
          self.get('esriLoader').loadModules(['esri/graphic', 'esri/layers/GraphicsLayer', 'esri/geometry/Point', 'esri/SpatialReference', 'esri/symbols/SimpleMarkerSymbol', 'esri/geometry/webMercatorUtils', 'esri/Color']).then(modules => {
          const [Graphic, GraphicsLayer, Point, SpatialReference, SimpleMarkerSymbol, webMercatorUtils, Color] = modules;            
          console.log("pase el loadModules !");
          let X = event.mapPoint.x;
          let Y = event.mapPoint.y;
          let spRef = 102100;
                
          var point = new Point(X, Y, new SpatialReference({ wkid: spRef }));
          
          point = webMercatorUtils.webMercatorToGeographic(point); //102100 4326                            
          /*
          var markerPicture = new PictureMarkerSymbol();      
          markerPicture.setHeight(20);
          markerPicture.setWidth(20);
                  
          let url = theMobil.get('imagePath');
          console.log('el url = ' + url);
              
          markerPicture.setUrl(url);
          */
          var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 6);
          markerSymbol.setColor(new Color([230, 0, 169, 0.84]));

          let aGraphic = new Graphic(point, markerSymbol);    
                  
          let pointLayer = new GraphicsLayer(); 
          pointLayer.add(aGraphic);
          self._map.addLayer(pointLayer);
          return// aGraphic;
          })         
        }
    })    
  }.observes('selectedProject'),

/*
    showPoint: function (event, theMobil) {
    //esta subrutina no me ha funcionado
    console.log("entre al showPoint !");
    this.get('esriLoader').loadModules(['esri/graphic', 'esri/geometry/Point', 'esri/SpatialReference', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/webMercatorUtils']).then(modules => {
    const [Graphic, Point, SpatialReference, PictureMarkerSymbol, webMercatorUtils] = modules;            
    console.log("pase el loadModules !");
    let X = event.mapPoint.x;
    let Y = event.mapPoint.y;
    let spRef = '102100';
    //var X = thePoint.get('X');
    //var Y = thePoint.get('Y');                                      
    //var spRef = thePoint.get('spRef');
    let _refGringa = 102100;      
    var point = new Point(X, Y, new SpatialReference({ wkid: spRef }));
    if (point.spatialReference === _refGringa) {
      //console.log('toy en el web mercator !');
        point = webMercatorUtils.webMercatorToGeographic(point); //102100 4326
    }                    
    
    var markerPicture = new PictureMarkerSymbol();      
    markerPicture.setHeight(20);
    markerPicture.setWidth(20);
    
    //var url = thePoint.get('imagePath');
    //if (url === '/assets/logos/') {
        url = theMobil.get('imagePath');
    //}    
    markerPicture.setUrl(url);    
    var aGraphic = new Graphic(point, markerPicture);    
    /*
    var infoTemplate = new InfoTemplate();
    infoTemplate.setTitle(thePoint.get('name'));
    infoTemplate.setContent("<b>Reference: </b>" + thePoint.get('reference') + "<br/>"
    + "<b>id: </b>" + thePoint.get('id') + "<br/>");
    aGraphic.setInfoTemplate(infoTemplate);
    //console.log('ya pase el aGraphic de showPoint y es : ' + aGraphic);
    
    return aGraphic;
    })         
  }, 
*/

  docChanged: function() {
    var doc = this.get('selectedDoc');
    if (!doc) {
      this.set('isDocVisible', false);
      return
    }
       
    var midoc = this.get('store').peekRecord('doc', doc.id);
    let docto = midoc.get('name');
    let format = midoc.get('format');  
    console.log("entre a docChanged de body-map el documento es: " + docto);
    let path = midoc.get('path');
    let m = path.search("https://");  
    if (m > -1) {    
      let href = path; 
      //window.location=href;
      window.open(href);
    }
    m = path.search("http://");    
    if (m > -1) {
      let href = path; 
      //window.location=href;
      window.open(href);
    } 
    m = path.search(".jpg");    
    if (m > -1) {
      path = midoc.get('imagePath');
      this.set('myPath', path);
      this.set('isImage', true);
      let name = format + ': ' + docto + 'isImage' + path;    
      this.send('showModalDialog', name);            
      return;     
    }
    m = path.search(".jpeg");    
    if (m > -1) {
      path = midoc.get('imagePath');
      this.set('myPath', path);
      this.set('isImage', true);
      let name = format + ': ' + docto + 'isImage' + path;
      this.send('showModalDialog', name);     
      return;     
    }
    m = path.search(".png");    
    if (m > -1) {
      path = midoc.get('imagePath');
      this.set('myPath', path);
      this.set('isImage', true);
      let name = format + ': ' + docto + 'isImage' + path;
      this.send('showModalDialog', name); 
      return;     
    }
    m = path.search(".gif");    
    if (m > -1) {
      path = midoc.get('imagePath');
      this.set('myPath', path);
      this.set('isImage', true);
      let name = format + ': ' + docto + 'isImage' + path;
      this.send('showModalDialog', name); 
      return;     
    } 
    m = path.search(".pdf");    
    if (m > -1) {
      path = midoc.get('imagePath');
      this.set('myPath', path);
      this.set('isPdf', true);
      let name = format + ': ' + docto + 'isPdf' + path;
      this.send('showModalDialog', name); 
      return;     
    }     
    m = path.search(".webm");    
    if (m > -1) {
      //let addendum = "type='video/webm; codecs="vp8, vorbis"'
      path = midoc.get('imagePath');
      console.log('el path es: ' + path)
      this.set('myPath', path);
      this.set('isVideo', true);    
      let name = format + ': ' + docto + 'isVideo' + path;
      this.send('showModalDialog', name); 
      return;     
    }  
    m = path.search(".ogg");    
    if (m > -1) {
      path = midoc.get('imagePath');
      this.set('myPath', path);
      this.set('isVideo', true);
      let name = format + ': ' + docto + 'isVideo' + path;    
      this.send('showModalDialog', name); 
      return;     
    }
    m = path.search(".mp3");    
    if (m > -1) {
      path = midoc.get('imagePath');
      this.set('myPath', path);
      this.set('isVideo', true);
      let name = format + ': ' + docto + 'isVideo' + path;
      this.send('showModalDialog', name); 
      return;     
    }
    m = path.search(".mp4");    
    if (m > -1) {
      path = midoc.get('imagePath');
      this.set('myPath', path);
      this.set('isVideo', true);
      let name = format + ': ' + docto + 'isVideo' + path;
      this.send('showModalDialog', name); 
      return;     
    } 
    m = path.search(".pptx");    
    if (m > -1) {
      path = midoc.get('imagePath');
      this.set('myPath', path);
      this.set('isPower', true);
      let name = format + ': ' + docto + 'isPower' + path;
      this.send('showModalDialog', name); 
      return;     
    } 
    //this.set('isShowingModal', true); 
  }.observes('selectedDoc'), 

  clearRequired: function() {              
    let mobil = this.get('selectedMobil');
    if (mobil !== null) {
      this.layerCleaner(mobil);
      return;        
    }
    let feature = this.get('selectedFeature');
    if (feature !== null) {
      this.layerCleaner(feature);
      return;       
    }
    let figure = this.get('selectedFigure');
    if (figure !== null) {
      this.layerCleaner(figure);
      return;        
    }
  }.observes('clearLayer'),
    
  layerCleaner (layer) {
    var graphicLayerIds = this._map.graphicsLayerIds;
    var len = graphicLayerIds.length;
    for (var i = 0; i < len; i++) {
        var gLayer = this._map.getLayer(graphicLayerIds[i]);
        console.log("glayer es: " + gLayer.id + ' layer.id: ' + layer.id);
        if(gLayer.id === layer.id) {
          //console.log("entre a clearRequired y voy a borrar: ", feature.id);              
          gLayer.clear();
          return;
        }            
    }  
  },

DrawFigures: function() {  
  let mode = this.get('selectedMode');  
  if (!mode) {
    console.log("voy a cortar por mode = " + mode);
    return;
  }
  if (mode.id !== 'Agregar') {
      console.log("voy a cortar por el mode.id = " + mode.id);
      return;
  }
  var basemap = this.get('selectedBasemap');
  if (!basemap) {
    return;
  }
  var project = this.get('selectedProject');
  if (!project) {
    return;
  }
  var name = this.get('name');  
  if (name === undefined) {
      alert("Introdusca un nombre para el componente !");
      return;
  }
  var reference = this.get('reference');
  if (reference === undefined) {
      alert("Introdusca una referencia para el componente !");
      return;
  }     

}.observes('startDraw'),
/*
pauseDrawFigures: function() {
  let pause = this.get('pauseDraw');
  if(!pause) {
    return;
  }  
}.observes('pauseDraw'),

quitDrawFigures: function() {  
  this.set('acumJson', null);
  this.set('firstJson', null);       
}.observes('quitDraw'),
*/
saveDrawFigures: function() {    
  let acumJson = this.get('acumJson');
  if(!acumJson) {
    return;
  };
  var figure = this.get('selectedFigure');
  if (!figure) {
      alert("Seleccione una figura !");
      return;
  }
  var feature = this.get('selectedFeature');
  if (!feature) {
      alert("Seleccione un grupo !");
      return;
  }
  var mobil = this.get('selectedMobil');
  if (!mobil) {
      alert("Seleccione un componente !");
      return;
  }                        
  let name = this.get('name');          
  if (name === undefined) {
      alert("Introdusca un nombre para el componente !");
      return;
  }
  var reference = this.get('reference');
  if (reference === undefined) {
      alert("Introdusca una referencia para el componente !");
      return;
  }
  //alert("el mobil es: " + mobil.id);
  var elMobil = this.get('store').peekRecord('mobil', mobil.id);
  let elColor = elMobil.get('color');
  if (elColor === undefined) {
      alert("El componente seleccionado no tiene color asignado !");
      return;       
  }
  let radio = elMobil.get('radio');
  let uArea = elMobil.get('uArea');
  let uLong = elMobil.get('uLong');  

  if (figure.id === 'Polígono') {
    if (uArea === undefined) {
      alert("El componente seleccionado no tiene unidad de área asignada !");
      return;       
    }
    if (uLong === undefined) {
      alert("El componente seleccionado no tiene unidad de longitud asignada !");
      return;       
    }
    let acumJson = '[[' + this.get('acumJson') + ',' + this.get('firstJson') + ']]';    
    console.log("voy a generar el nuevo polígono !");
    var par = {
      name: this.get('name'),      
      reference: this.get('reference'),
      color: 'Red',             
      json: acumJson      
    };
    let self = this;
    let aGraphic = showPolygon(par, self);        
      //this.set('acumJson', null); no jalan de regreso
      //this.set('firstJson', null); no jalan de regreso                                      
    return;

    function showPolygon(par, self) {
      console.log("entre al showPolygon !");      

      self.get('esriLoader').loadModules(['esri/graphic', 'esri/layers/GraphicsLayer', 'esri/geometry/Polygon', 'esri/SpatialReference', 'esri/symbols/SimpleLineSymbol', 'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/SimpleFillSymbol', 'esri/geometry/webMercatorUtils', 'esri/Color', 'esri/InfoTemplate', 'esri/tasks/GeometryService', 'esri/tasks/AreasAndLengthsParameters']).then(modules => {
        const [Graphic, GraphicsLayer, Polygon, SpatialReference, SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol, webMercatorUtils, Color, InfoTemplate, GeometryService, AreasAndLengthsParameters] = modules;            
        //console.log("pase el loadModules !");
        alert('Coordenadas = ' + par.json);
        var jsonPolygon = JSON.parse(par.json);
        var wkid = '102100';          
        var polygonJson = {
          'spatialReference': {'wkid': wkid},
          'rings': jsonPolygon                                   
        };                

        var polygon = new Polygon(polygonJson);

        var geometryService = new GeometryService("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
        geometryService.on("areas-and-lengths-complete", outputAreaAndLength);

        //setup the parameters for the areas and lengths operation
        var areasAndLengthParams = new AreasAndLengthsParameters();
                
        switch (uArea) {
          case 'Kilometros_cuadrados':
              areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_KILOMETERS;              
              break;
          case 'Hectáreas':
              areasAndLengthParams.areaUnit = GeometryService.UNIT_HECTARES;
              break;
          case 'Metros_cuadrados':
              areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_METERS;              
              break;
          case 'Square_miles':
              areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_MILES;
              break;
          case 'Acres':
              areasAndLengthParams.areaUnit = GeometryService.UNIT_ACRES;
              break;
          case 'Square_feet':
              areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_FEET;
              break;
          default:
              areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_METERS;
        }
        switch (uLong) {
          case 'Kilometros':
              areasAndLengthParams.lengthUnit = GeometryService.UNIT_KILOMETER;              
              break;
          case 'Metros':
              areasAndLengthParams.lengthUnit = GeometryService.UNIT_METER;
              break;
          case 'Miles':
              areasAndLengthParams.lengthUnit = GeometryService.UNIT_STATUTE_MILE;              
              break;
          case 'Feet':
              areasAndLengthParams.lengthUnit = GeometryService.UNIT_FOOT;
              break;          
          default:
              areasAndLengthParams.lengthUnit = GeometryService.UNIT_KILOMETER;
        }
        //UAreas: Ember.String.w('Kilometros_cuadrados Hectáreas Metros_cuadrados Square_miles Acres Square_feet'), 
        //ULongitudes: Ember.String.w('Kilometros Metros Miles Feet'),                 
        areasAndLengthParams.calculationType = "geodesic";
        geometryService.simplify([polygon], function(simplifiedGeometries) {
          areasAndLengthParams.polygons = simplifiedGeometries;
          geometryService.areasAndLengths(areasAndLengthParams);
        });

        polygon = webMercatorUtils.webMercatorToGeographic(polygon); //102100 4326          

        let color = 'Red';                          
        let colorCode = self.getFillColorCode(color);
        //console.log('el codigo de color resultante es: ' + colorCode);                                 

        var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
          new Color([255,0,0]), 1),new Color(colorCode)                    
        );
        
        //var polygonExtent = polygon.getExtent(); //si jala
        //console.log("polygonExtent", polygonExtent);
                          
        var aGraphic = new Graphic(polygon, sfs);

        var infoTemplate = new InfoTemplate();
        infoTemplate.setTitle(par.name);
        infoTemplate.setContent("<b>Polígono: Referencia: </b>" + par.reference + "<br/>");
        //+ "<b>Area: </b>" + thePolygon.get('area') + ' ' + thePolygon.get('uArea') + "<br/>"
        //+ "<b>Perímetro: </b>" + thePolygon.get('perimeter') + ' ' + thePolygon.get('uPerimeter') + "<br/>"
        //+ "<b>id: </b>" + thePolygon.get('id') + "<br/>");
        aGraphic.setInfoTemplate(infoTemplate);          
      
        let polygonLayer = new GraphicsLayer(); 
        polygonLayer.add(aGraphic);
        self._map.addLayer(polygonLayer);
        return;

        function outputAreaAndLength(evtObj) {
          let result = evtObj.result;                    
          alert(result.areas[0].toFixed(2) + ' ' + uArea);
          alert(result.lengths[0].toFixed(2) + ' ' + uLong);          
          var params = {
            name: self.get('name'),
            isActive: true,
            reference: self.get('reference'),
            color: elColor,       
            spRef: '102100',
            json: acumJson,
            area: result.areas[0].toFixed(2),
            perimeter: result.lengths[0].toFixed(2),
            uArea: uArea,
            uPerimeter: uLong,                    
            mobil: self.get('selectedMobil')
          };
          console.log("voy a grabar el nuevo polígono !");
          self.sendAction('savePolygon', params);          
          return;
        }
      })         
    }
  }

  if (figure.id === 'Elipse') {
    if (uArea === undefined) {
      alert("El componente seleccionado no tiene unidad de área asignada !");
      return;       
    }
    if (uLong === undefined) {
      alert("El componente seleccionado no tiene unidad de longitud asignada !");
      return;       
    }
    if (radio === undefined) {
      alert("El componente seleccionado no tiene radio asignado !");
      return;       
    }
    let acumJson = this.get('acumJson');    
    console.log("voy a generar la nueva elipse !");
    var par = {
      name: this.get('name'),      
      reference: this.get('reference'),
      color: 'Red',             
      json: acumJson      
    };
    let self = this;
    let aGraphic = showEllipse(par, self);        
      //this.set('acumJson', null); no jalan de regreso
      //this.set('firstJson', null); no jalan de regreso                                      
    return;

    function showEllipse(par, self) {
      console.log("entre al showEllipse !");      

      self.get('esriLoader').loadModules(['esri/graphic', 'esri/layers/GraphicsLayer', 'esri/geometry/Point', 'esri/geometry/Circle', 'esri/SpatialReference', 'esri/symbols/SimpleLineSymbol', 'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/SimpleFillSymbol', 'esri/geometry/webMercatorUtils', 'esri/Color', 'esri/InfoTemplate', 'esri/units']).then(modules => {
        const [Graphic, GraphicsLayer, Point, Circle, SpatialReference, SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol, webMercatorUtils, Color, InfoTemplate, Units] = modules;            
        //console.log("pase el loadModules !");
        alert('Coordenadas = ' + par.json);
        //var centerPoint = new Point(par.json);
        var jsonEllipse = JSON.parse(par.json);
        var wkid = '102100';
                        
        var centerPoint = new Point(jsonEllipse, new SpatialReference({ wkid: wkid }));                          
        centerPoint = webMercatorUtils.webMercatorToGeographic(centerPoint); //102100 4326        

        switch (uLong) {
          case 'Kilometros':
              var circleGeometry = new Circle({
                center: centerPoint,
                radius: radio,
                radiusUnit: Units.KILOMETERS
              });              
              break;
          case 'Metros':
              var circleGeometry = new Circle({
                center: centerPoint,
                radius: radio,
                radiusUnit: Units.METERS
              });              
              break;
          case 'Miles':
              var circleGeometry = new Circle({
                center: centerPoint,
                radius: radio,
                radiusUnit: Units.MILES
              });              
              break;
          case 'Feet':
              var circleGeometry = new Circle({
                center: centerPoint,
                radius: radio,
                radiusUnit: Units.FEET
              });              
              break;          
          default:
              var circleGeometry = new Circle({
                center: centerPoint,
                radius: radio,
                radiusUnit: Units.METERS
              });              
        }      
 
        circleGeometry = webMercatorUtils.webMercatorToGeographic(circleGeometry); //102100 4326          
        
        let color = 'Red';                          
        let colorCode = self.getFillColorCode(color);
        //console.log('el codigo de color resultante es: ' + colorCode);

        let area = radio * radio * 3.1415926535;
        let perimetro = 2 * radio * 3.1415926535;       
        alert(area.toFixed(2) + ' ' + uArea);
        alert(perimetro.toFixed(2) + ' ' + uLong);                                 
        
        var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
          new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
          new Color([255,0,0]), 1),new Color(colorCode)
        );                                    
        //circleLayer.add(new Graphic(circle, sfs));
        var aGraphic = new Graphic(circleGeometry, sfs);

        var infoTemplate = new InfoTemplate();
        infoTemplate.setTitle(par.name);
        infoTemplate.setContent("<b>Circulo: Referencia: </b>" + par.reference + "<br/>"
        + "<b>Area: </b>" + area.toFixed(2) + ' ' + uArea + "<br/>"
        + "<b>Perímetro: </b>" + perimetro.toFixed(2) + ' ' + uLong + "<br/>");
        
        aGraphic.setInfoTemplate(infoTemplate);
                          
        let circleLayer = new GraphicsLayer(); 
        circleLayer.add(aGraphic);
        
        self._map.addLayer(circleLayer);        
                            
          var params = {
            name: self.get('name'),
            isActive: true,
            reference: self.get('reference'),
            color: elColor,       
            spRef: '102100',
            json: acumJson,
            area: area.toFixed(2),
            perimeter: perimetro.toFixed(2),
            radio: radio,
            uArea: uArea,
            uPerimeter: uLong,                    
            mobil: self.get('selectedMobil')
          };
          console.log("voy a grabar el nuevo circulo !");
          self.sendAction('saveEllipse', params);          
          return;        
      })         
    }
  }

  if (figure.id === 'Línea') {    
    if (uLong === undefined) {
      alert("El componente seleccionado no tiene unidad de longitud asignada !");
      return;       
    }
    let acumJson = '[[' + this.get('acumJson') + ']]';
    console.log("voy a generar la nueva polilínea !");
    var par = {
      name: this.get('name'),      
      reference: this.get('reference'),
      color: 'Red',             
      json: acumJson      
    };
        
    let self = this;            
    let aGraphic = showPolyline(par, self);                       
    return;

    function showPolyline(par, self) {
      console.log("entre al showPolyline !");
      self.get('esriLoader').loadModules(['esri/graphic', 'esri/layers/GraphicsLayer', 'esri/geometry/Polyline','esri/SpatialReference', 'esri/symbols/SimpleLineSymbol', 'esri/geometry/webMercatorUtils', 'esri/Color', 'esri/InfoTemplate', 'esri/tasks/GeometryService', 'esri/tasks/LengthsParameters']).then(modules => {
        const [Graphic, GraphicsLayer, Polyline, SpatialReference, SimpleLineSymbol, webMercatorUtils, Color, InfoTemplate, GeometryService, LengthsParameters] = modules;            
        console.log("pase el loadModules !");
        alert('Coordenadas = ' + par.json);                                                
        var jsonLine = JSON.parse(par.json);
        var wkid = '102100';          
        var polylineJson = {
          'spatialReference': {'wkid': wkid}, 
          'paths': jsonLine                                   
        };                

        var polyline = new Polyline(polylineJson);

        var geometryService = new GeometryService("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
        geometryService.on("lengths-complete", outputLength);

        //setup the parameters for the areas and lengths operation
        var lengthParams = new LengthsParameters();
        
        switch (uLong) {
          case 'Kilometros':
              lengthParams.lengthUnit = GeometryService.UNIT_KILOMETER;              
              break;
          case 'Metros':
              lengthParams.lengthUnit = GeometryService.UNIT_METER;
              break;
          case 'Miles':
              lengthParams.lengthUnit = GeometryService.UNIT_STATUTE_MILE;              
              break;
          case 'Feet':
              lengthParams.lengthUnit = GeometryService.UNIT_FOOT;
              break;          
          default:
              lengthParams.lengthUnit = GeometryService.UNIT_KILOMETER;
        }                        
        lengthParams.geodesic = true;
        lengthParams.polylines = [polyline];
        geometryService.lengths(lengthParams);        

        polyline = webMercatorUtils.webMercatorToGeographic(polyline); //102100 to 4326                  

        // Create a simple line symbol for rendering the line in the view
        var polylineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID).setWidth(2);
        //polylineSymbol.setColor(new Color([255, 0, 0, 1]));
        let color = 'Red';                        
        let colorCode = self.getColorCode(color);
        //console.log('el codigo de color resultante es: ' + colorCode); 
        
        polylineSymbol.setColor(new Color(colorCode));                

        //var polylineLayer = new GraphicsLayer();
        //polylineLayer.add(new Graphic(polyline, polylineSymbol));
        var aGraphic = new Graphic(polyline, polylineSymbol);

        var infoTemplate = new InfoTemplate();
        infoTemplate.setTitle(par.name);
        infoTemplate.setContent("<b>Polígono: Referencia: </b>" + par.reference + "<br/>");
        //+ "<b>Area: </b>" + thePolygon.get('area') + ' ' + thePolygon.get('uArea') + "<br/>"
        //+ "<b>Perímetro: </b>" + thePolygon.get('perimeter') + ' ' + thePolygon.get('uPerimeter') + "<br/>"
        //+ "<b>id: </b>" + thePolygon.get('id') + "<br/>");
        aGraphic.setInfoTemplate(infoTemplate);
      
        let polylineLayer = new GraphicsLayer(); 
        polylineLayer.add(aGraphic);
        self._map.addLayer(polylineLayer);
        return// aGraphic;

        function outputLength(evtObj) {
          let result = evtObj.result;                              
          alert(result.lengths[0].toFixed(3) + ' ' + uLong);

          var params = {
            name: self.get('name'),
            isActive: true,
            reference: self.get('reference'),
            color: elColor,       
            spRef: '102100',
            json: acumJson,            
            long: result.lengths[0].toFixed(3),
            uLong: uLong,                    
            mobil: self.get('selectedMobil')
          };
          console.log("voy a grabar la nueva polilínea !");
          self.sendAction('saveLine', params);                    
          return;
        }
      })         
    }  
  }
}.observes('saveDraw'),


mapShowFigures: function() {
  //alert("entre a mapShowFigures !");
  var project = this.get('selectedProject');
      if (!project) {
        return;
  }
  var mode = this.get('selectedMode');  
      if (!mode) {
        return;
  }
  if (mode.id !== 'Consultar') {
    //alert("entre a mapShowFigures el mode es: " + mode.id);
      //console.log("voy a cortar por mode.id = " + mode.id);
      return;
  }   
  this.get('esriLoader').loadModules(['esri/map', 'esri/graphic', 'esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/Polygon', 'esri/geometry/Circle', 'esri/symbols/SimpleLineSymbol', 'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/SimpleFillSymbol', 'esri/layers/GraphicsLayer', 'esri/SpatialReference', 'esri/Color', 'esri/units', 'esri/dijit/Scalebar', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/Extent', 'esri/geometry/webMercatorUtils', 'esri/InfoTemplate']).then(modules => {
  const [Map, Graphic, Point, Polyline, Polygon, Circle, SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol, GraphicsLayer, SpatialReference, Color, Units, Scalebar, PictureMarkerSymbol, Extent, webMercatorUtils, InfoTemplate] = modules;            
  
    //map.graphics.clear();
    var mobil = this.get('selectedMobil');    
    var feature = this.get('selectedFeature');
    var figure = this.get('selectedFigure');    
    if (mobil === null) {
      //console.log('No hay mobil seleccionado !');
      if (feature === null) {
        //console.log('No hay feature seleccionado !');
        if (!figure) {
          //console.log('No hay figura seleccionada !');
          return;  
        } else {
          //solo hay figure     
          if (figure.id === 'Punto') { 
            //console.log("entre a figure.id = 'Punto' !");                                  
            var pointLayer = new GraphicsLayer({ id: figure.id });

            var projectFeatures = project.get('features');
            //alert("theOtherFeatures are: " + projectFeatures.get('length'));
            var filteredFeatures = projectFeatures.filterBy('figure', figure.id);
            //alert("filteredFeatures are: " + filteredFeatures.get('length'));
            //var theFeatures = this.get('store').peekAll('feature').filterBy('figure', figure.id); 
            filteredFeatures.forEach(theFeature => {              
              var theMobils = theFeature.get('mobils');                            
              theMobils.forEach(theMobil => {                
                var thePoints = theMobil.get('points');                                                       
                thePoints.forEach(thePoint => {

                  // Create a point graphic //
                  var X = thePoint.get('X');
                  var Y = thePoint.get('Y');                                      
                  var spRef = thePoint.get('spRef');
                  var _refGringa = 102100;      
                  var point = new Point(X, Y, new SpatialReference({ wkid: spRef }));
                  if (point.spatialReference === _refGringa) {
                    //console.log('toy en el web mercator !');
                      point = webMercatorUtils.webMercatorToGeographic(point); //102100 4326
                  }                    

                  var markerPicture = new PictureMarkerSymbol();      
                  markerPicture.setHeight(20);
                  markerPicture.setWidth(20);
                  
                  var url = thePoint.get('imagePath');
                  if (url === '/assets/logos/') {
                      url = theMobil.get('imagePath');
                  }
                  
                  markerPicture.setUrl(url);
              
                  //markerPicture.setUrl("http://img3.wikia.nocookie.net/__cb20140427224234/caramelangel714/images/7/72/Location_Icon.png");
                  
                  //var attr = {"Title": thePoint.get('name'), "reference": thePoint.get('reference'), "id": thePoint.get('id')};
                  //console.log("el attr es:" + attr.id);

                  var aGraphic = new Graphic(point, markerPicture);                   
                  //aGraphic.setAttributes(attr);
                  //aGraphic.setAttributes(reference, thePoint.get('reference'));
                  //aGraphic.setAttributes(id, thePoint.get('id'));
                  //var basura = aGraphic.getContent();
                  //console.log("el aGraphic.getContent() es:" + basura.get('name'));

                  var infoTemplate = new InfoTemplate();
                  infoTemplate.setTitle(thePoint.get('name'));
                  infoTemplate.setContent("<b>Punto: Referencia: </b>" + thePoint.get('reference') + "<br/>"
                  + "<b>id: </b>" + thePoint.get('id') + "<br/>");
                  aGraphic.setInfoTemplate(infoTemplate);
                  
                  //let aGraphic = this.showPoint(thePoint, theMobil); //no me ha funcionado usar esta subrutina
                  pointLayer.add(aGraphic);                  
                  
                    //map.graphics.add(new Graphic(jsonGraphic));
                  //console.log("pointLayer", pointLayer); //Object {_attrs: Object, _url: null, url: null, spatialReference: Object, initialExtent: Object…}
                });                                
              }); 
            });            
            this._map.addLayer(pointLayer);
            
            // aqui empiezan las polylineas
          } else if (figure.id === 'Línea') {
            //alert("entre a figure.id = 'Línea' !");
            //this._map.pointLayer.clear();            
            var polylineLayer = new GraphicsLayer({ id: figure.id });
            
            var projectFeatures = project.get('features');
            //alert("the projectFeatures are: " + projectFeatures.get('length'));
            var filteredFeatures = projectFeatures.filterBy('figure', figure.id);
            //alert("filteredFeatures are: " + filteredFeatures.get('length'));             
            filteredFeatures.forEach(theFeature => {              
              var theMobils = theFeature.get('mobils');                            
              theMobils.forEach(theMobil => {
                //alert("theMobil es :" + theMobil.get('name'));                
                var theLines = theMobil.get('lines');                                                       
                theLines.forEach(theLine => {
                  //alert("la linea es :" + theLine.get('name'));
                  // Create a polyline graphic //                               
                //alert("el jsonLine antes del parseo: " + theLine.get('json'));
                var jsonLine = JSON.parse(theLine.get('json'));
                //alert("el jsonLine despues del parseo : " + jsonLine);                
                var wkid = theLine.get('spRef'); 
                //var spRef = new SpatialReference({ 'wkid': 4326 });
                //otra forma que si jala
                var polylineJson = {
                  'spatialReference': {'wkid': wkid}, 
                  'paths': jsonLine                                   
                };
                var polyline = new Polyline(polylineJson);
                if (polyline.spatialReference === '102100') { 
                    polyline = webMercatorUtils.webMercatorToGeographic(polyline); //102100 to 4326
                    //polyline = webMercatorUtils.geographicToWebMercator(polyline); //4326 to 102100
                }                
                //console.log("polyline.spatialReference", polyline.spatialReference);                                                          
                
                // Create a simple line symbol for rendering the line in the view
                var polylineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID).setWidth(2);
                //polylineSymbol.setColor(new Color([255, 0, 0, 1]));
                let color = theLine.get('color');
                console.log('el color seleccionado es: ' + color);                
                let colorCode = this.getColorCode(color);
                //console.log('el codigo de color resultante es: ' + colorCode); 
                
                polylineSymbol.setColor(new Color(colorCode));                

                //var polylineLayer = new GraphicsLayer();
                //polylineLayer.add(new Graphic(polyline, polylineSymbol));
                var aGraphic = new Graphic(polyline, polylineSymbol);

                var infoTemplate = new InfoTemplate();
                infoTemplate.setTitle(theLine.get('name'));
                infoTemplate.setContent("<b>Polilínea: Referencia: </b>" + theLine.get('reference') + "<br/>"
                + "<b>Longitud: </b>" + theLine.get('long') + ' ' + theLine.get('uLong') + "<br/>"
                + "<b>id: </b>" + theLine.get('id') + "<br/>");
                aGraphic.setInfoTemplate(infoTemplate);

                polylineLayer.add(aGraphic);
                });                                
              }); 
            });            
            this._map.addLayer(polylineLayer);             

            // aqui empiezan los poligonos
          } else if (figure.id === 'Polígono') { 
            //alert("entre a figure.id = Polígono !");
            //this._map.polygonLayer.clear();            
            var polygonLayer = new GraphicsLayer({ id: figure.id });
            
            var projectFeatures = project.get('features');
            //alert("the projectFeatures are: " + projectFeatures.get('length'));
            var filteredFeatures = projectFeatures.filterBy('figure', figure.id);
            //alert("filteredFeatures are: " + filteredFeatures.get('length'));             
            filteredFeatures.forEach(theFeature => {              
              var theMobils = theFeature.get('mobils');                            
              theMobils.forEach(theMobil => {
                //alert("theMobil es :" + theMobil.get('name'));                
                var thePolygons = theMobil.get('polygons');                                                       
                thePolygons.forEach(thePolygon => {
                  //alert("el poligono es :" + thePolygon.get('name'));
                  // Create a polygon graphic //
                  var jsonPolygon = JSON.parse(thePolygon.get('json'));
                  var wkid = thePolygon.get('spRef');
                  //alert("el poligono es :" + thePolygon.get('name') + ' wkid= ' + wkid);
                  var polygonJson = {
                    'spatialReference': {'wkid': wkid},
                    'rings': jsonPolygon                                   
                  };                
       
                  var polygon = new Polygon(polygonJson);                  
                  if (wkid === '102100') {
                      polygon = webMercatorUtils.webMercatorToGeographic(polygon); //102100 4326
                  }

                  let color = thePolygon.get('color');
                  console.log('el color seleccionado es: ' + color);                
                  let colorCode = this.getFillColorCode(color);
                  //console.log('el codigo de color resultante es: ' + colorCode);                                 

                  var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255,0,0]), 1),new Color(colorCode)                    
                  );
                  //var polygonExtent = polygon.getExtent(); //si jala
                  //console.log("polygonExtent", polygonExtent);
                                    
                  var aGraphic = new Graphic(polygon, sfs);

                  var infoTemplate = new InfoTemplate();
                  infoTemplate.setTitle(thePolygon.get('name'));
                  infoTemplate.setContent("<b>Polígono: Referencia: </b>" + thePolygon.get('reference') + "<br/>"
                  + "<b>Area: </b>" + thePolygon.get('area') + ' ' + thePolygon.get('uArea') + "<br/>"
                  + "<b>Perímetro: </b>" + thePolygon.get('perimeter') + ' ' + thePolygon.get('uPerimeter') + "<br/>"
                  + "<b>id: </b>" + thePolygon.get('id') + "<br/>");
                  aGraphic.setInfoTemplate(infoTemplate);

                  polygonLayer.add(aGraphic);           
                });                                
              }); 
            });            
            this._map.addLayer(polygonLayer);

            // aqui empiezan las elipses
          } else if (figure.id === 'Elipse') {
            //alert("entre a figure.id = Elipse !");            
            var circleLayer = new GraphicsLayer({ id: figure.id });                        
            
            var projectFeatures = project.get('features');
            //alert("the projectFeatures are: " + projectFeatures.get('length'));
            var filteredFeatures = projectFeatures.filterBy('figure', figure.id);
            //alert("filteredFeatures are: " + filteredFeatures.get('length'));             
            filteredFeatures.forEach(theFeature => {              
              var theMobils = theFeature.get('mobils');                            
              theMobils.forEach(theMobil => {
                //alert("theMobil es :" + theMobil.get('name'));                
                var theEllipses = theMobil.get('ellipses');                                                       
                theEllipses.forEach(theEllipse => {
                  //alert("la elipse es :" + theEllipse.get('name'));
                  // Create a circle graphic //
                  var jsonEllipse = JSON.parse(theEllipse.get('json'));
                  var wkid = theEllipse.get('spRef');
          
                  // home -97.84640077331348,22.262364334775313                  
                  var centerPoint = new Point(jsonEllipse, new SpatialReference({ wkid: wkid }));                  
                  if (centerPoint.spatialReference === '102100') {
                      centerPoint = webMercatorUtils.webMercatorToGeographic(centerPoint); //102100 4326
                  }
                                    
                  switch (theEllipse.get('uPerimeter')) {
                    case 'Kilometros':
                        var circle = new Circle({
                          center: centerPoint,
                          radius: theEllipse.get('radio'),
                          radiusUnit: Units.KILOMETERS
                        });              
                        break;
                    case 'Metros':
                        var circle = new Circle({
                          center: centerPoint,
                          radius: theEllipse.get('radio'),
                          radiusUnit: Units.METERS
                        });              
                        break;
                    case 'Miles':
                        var circle = new Circle({
                          center: centerPoint,
                          radius: theEllipse.get('radio'),
                          radiusUnit: Units.MILES
                        });              
                        break;
                    case 'Feet':
                        var circle = new Circle({
                          center: centerPoint,
                          radius: theEllipse.get('radio'),
                          radiusUnit: Units.FEET
                        });              
                        break;          
                    default:
                        var circle = new Circle({
                          center: centerPoint,
                          radius: theEllipse.get('radio'),
                          radiusUnit: Units.METER
                        });              
                  } 

                  let color = theEllipse.get('color');
                  console.log('el color seleccionado es: ' + color);                
                  let colorCode = this.getFillColorCode(color);
                  //console.log('el codigo de color resultante es: ' + colorCode);
                                                                                                                   
                  var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255,0,0]), 1),new Color(colorCode)
                  );                                    
                  //circleLayer.add(new Graphic(circle, sfs));
                  var aGraphic = new Graphic(circle, sfs);

                  var infoTemplate = new InfoTemplate();
                  infoTemplate.setTitle(theEllipse.get('name'));
                  infoTemplate.setContent("<b>Circulo: Referencia: </b>" + theEllipse.get('reference') + "<br/>"
                  + "<b>Area: </b>" + theEllipse.get('area') + ' ' + theEllipse.get('uArea') + "<br/>"
                  + "<b>Perímetro: </b>" + theEllipse.get('perimeter') + ' ' + theEllipse.get('uPerimeter') + "<br/>"
                  + "<b>id: </b>" + theEllipse.get('id') + "<br/>");
                  aGraphic.setInfoTemplate(infoTemplate);

                  circleLayer.add(aGraphic);          
                });                                
              }); 
            });            
            this._map.addLayer(circleLayer);
          }
        } 
      } else {
        //si hay feature ó grupo
        if (figure.id === 'Punto') {
            //alert("entre a figure.id = 'Punto' !");                      
            //this._map.pointLayer.clear();          
            var theFeature = this.get('selectedFeature');
            var pointLayer = new GraphicsLayer({ id: theFeature.id });           

            var theMobils = theFeature.get('mobils');                            
            theMobils.forEach(theMobil => {                
              var thePoints = theMobil.get('points');                                                       
              thePoints.forEach(thePoint => {
                // Create a point graphic //
                var X = thePoint.get('X');
                var Y = thePoint.get('Y');                                      
                var spRef = thePoint.get('spRef');      
                var point = new Point(X, Y, new SpatialReference({ wkid: spRef }));
                if (point.spatialReference === '102100') {
                    point = webMercatorUtils.webMercatorToGeographic(point); //102100 4326
                }                    

                var markerPicture = new PictureMarkerSymbol();      
                markerPicture.setHeight(20);
                markerPicture.setWidth(20);
                
                var url = thePoint.get('imagePath');
                if (url === '/assets/logos/') {
                    url = theMobil.get('imagePath');
                }
                markerPicture.setUrl(url);
                //markerPicture.setUrl("http://img3.wikia.nocookie.net/__cb20140427224234/caramelangel714/images/7/72/Location_Icon.png");                
                //pointLayer.add(new Graphic(point, markerPicture));
                var aGraphic = new Graphic(point, markerPicture);
                var infoTemplate = new InfoTemplate();
                infoTemplate.setTitle(thePoint.get('name'));
                infoTemplate.setContent("<b>Punto: Referencia: </b>" + thePoint.get('reference') + "<br/>"
                + "<b>id: </b>" + thePoint.get('id') + "<br/>");
                aGraphic.setInfoTemplate(infoTemplate);

                pointLayer.add(aGraphic);                                  
                //map.graphics.add(new Graphic(jsonGraphic));
                //console.log("pointLayer", pointLayer); //Object {_attrs: Object, _url: null, url: null, spatialReference: Object, initialExtent: Object…}
              });                                
            }); 
            this._map.addLayer(pointLayer);

            // si hay feature ó grupo y aqui empiezan las polylineas
        } else if (figure.id === 'Línea') {
            //alert("entre a figure.id = 'Línea' !");
            //this._map.pointLayer.clear();            
            var theFeature = this.get('selectedFeature');
            var polylineLayer = new GraphicsLayer({ id: theFeature.id });
                          
            var theMobils = theFeature.get('mobils');                            
            theMobils.forEach(theMobil => {
              //alert("theMobil es :" + theMobil.get('name'));                
              var theLines = theMobil.get('lines');                                                       
              theLines.forEach(theLine => {

                var jsonLine = JSON.parse(theLine.get('json'));
                //alert("el jsonLine despues del parseo : " + jsonLine);                
                var wkid = theLine.get('spRef'); 

                var polylineJson = {
                  'spatialReference': {'wkid': wkid}, 
                  'paths': jsonLine                                   
                };
                var polyline = new Polyline(polylineJson);
                if (polyline.spatialReference === '102100') {
                    polyline = webMercatorUtils.webMercatorToGeographic(polyline); //102100 to 4326
                    //polyline = webMercatorUtils.geographicToWebMercator(polyline); //4326 to 102100
                }                                                                                          
                
                // Create a simple line symbol for rendering the line in the view
                var polylineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID).setWidth(2);
                let color = theLine.get('color');
                console.log('el color seleccionado es: ' + color);                
                let colorCode = this.getColorCode(color);
                //console.log('el codigo de color resultante es: ' + colorCode); 
                
                polylineSymbol.setColor(new Color(colorCode));                

                //var polylineLayer = new GraphicsLayer();                
                //polylineLayer.add(new Graphic(polyline, polylineSymbol));
                var aGraphic = new Graphic(polyline, polylineSymbol);

                var infoTemplate = new InfoTemplate();
                infoTemplate.setTitle(theLine.get('name'));
                infoTemplate.setContent("<b>Polilínea: Referencia: </b>" + theLine.get('reference') + "<br/>"
                + "<b>Longitud: </b>" + theLine.get('long') + ' ' + theLine.get('uLong') + "<br/>"
                + "<b>id: </b>" + theLine.get('id') + "<br/>");
                aGraphic.setInfoTemplate(infoTemplate);

                polylineLayer.add(aGraphic);
              });                                
            });                         
            this._map.addLayer(polylineLayer);             

            // si hay feature ó grupo y aqui empiezan los poligonos
        } else if (figure.id === 'Polígono') {
            //alert("entre a figure.id = Polígono !");
            //this._map.polygonLayer.clear();                        
            var theFeature = this.get('selectedFeature');
            var polygonLayer = new GraphicsLayer({ id: theFeature.id });
                                       
            var theMobils = theFeature.get('mobils');                            
            theMobils.forEach(theMobil => {
              //alert("theMobil es :" + theMobil.get('name'));                
              var thePolygons = theMobil.get('polygons');                                                       
              thePolygons.forEach(thePolygon => {
                //alert("el poligono es :" + thePolygon.get('name'));
                // Create a polygon graphic //
                var jsonPolygon = JSON.parse(thePolygon.get('json'));
                var wkid = thePolygon.get('spRef');

                var polygonJson = {
                  'spatialReference': {'wkid': wkid},
                  'rings': jsonPolygon                                   
                };                
      
                var polygon = new Polygon(polygonJson);
                  if (wkid === '102100') {
                    polygon = webMercatorUtils.webMercatorToGeographic(polygon); //102100 4326
                } 

                let color = thePolygon.get('color');
                console.log('el color seleccionado es: ' + color);                
                let colorCode = this.getFillColorCode(color);
                //console.log('el codigo de color resultante es: ' + colorCode);                   

                var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                  new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                  new Color([255,0,0]), 1),new Color(colorCode)
                );
                //var polygonExtent = polygon.getExtent(); //si jala
                //console.log("polygonExtent", polygonExtent);
                
                //polygonLayer.add(new Graphic(polygon, sfs));
                var aGraphic = new Graphic(polygon, sfs);

                var infoTemplate = new InfoTemplate();
                infoTemplate.setTitle(thePolygon.get('name'));
                infoTemplate.setContent("<b>Polígono: Referencia: </b>" + thePolygon.get('reference') + "<br/>"
                + "<b>Area: </b>" + thePolygon.get('area') + ' ' + thePolygon.get('uArea') + "<br/>"
                + "<b>Perímetro: </b>" + thePolygon.get('perimeter') + ' ' + thePolygon.get('uPerimeter') + "<br/>"
                + "<b>id: </b>" + thePolygon.get('id') + "<br/>");
                aGraphic.setInfoTemplate(infoTemplate);

                polygonLayer.add(aGraphic);          
              });                                
            }); 
                        
            this._map.addLayer(polygonLayer);

            // si hay feature ó grupo y aqui empiezan las elipses          
        } else if (figure.id === 'Elipse') {
          //alert("entre a figure.id = Elipse !");                                                
          var theFeature = this.get('selectedFeature');
          var circleLayer = new GraphicsLayer({ id: theFeature.id });
            
          var theMobils = theFeature.get('mobils');                            
          theMobils.forEach(theMobil => {
            //alert("theMobil es :" + theMobil.get('name'));                
            var theEllipses = theMobil.get('ellipses');                                                       
            theEllipses.forEach(theEllipse => {
              //alert("la elipse es :" + theEllipse.get('name'));
              // Create a circle graphic //
              var jsonEllipse = JSON.parse(theEllipse.get('json'));
              var wkid = theEllipse.get('spRef');
      
              // home -97.84640077331348,22.262364334775313                  
              var centerPoint = new Point(jsonEllipse, new SpatialReference({ wkid: wkid }));                  
              if (centerPoint.spatialReference === '102100') {
                  centerPoint = webMercatorUtils.webMercatorToGeographic(centerPoint); //102100 4326
              }

              switch (theEllipse.get('uPerimeter')) {
                case 'Kilometros':
                    var circle = new Circle({
                      center: centerPoint,
                      radius: theEllipse.get('radio'),
                      radiusUnit: Units.KILOMETERS
                    });              
                    break;
                case 'Metros':
                    var circle = new Circle({
                      center: centerPoint,
                      radius: theEllipse.get('radio'),
                      radiusUnit: Units.METERS
                    });              
                    break;
                case 'Miles':
                    var circle = new Circle({
                      center: centerPoint,
                      radius: theEllipse.get('radio'),
                      radiusUnit: Units.MILES
                    });              
                    break;
                case 'Feet':
                    var circle = new Circle({
                      center: centerPoint,
                      radius: theEllipse.get('radio'),
                      radiusUnit: Units.FEET
                    });              
                    break;          
                default:
                    var circle = new Circle({
                      center: centerPoint,
                      radius: theEllipse.get('radio'),
                      radiusUnit: Units.METER
                    });              
              } 
              let color = theEllipse.get('color');
                  console.log('el color seleccionado es: ' + color);                
                  let colorCode = this.getFillColorCode(color);
                  //console.log('el codigo de color resultante es: ' + colorCode);
                                                                                                                
              var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255,0,0]), 1),new Color(colorCode)
              );                                
              //circleLayer.add(new Graphic(circle, sfs));
              var aGraphic = new Graphic(circle, sfs);

              var infoTemplate = new InfoTemplate();
              infoTemplate.setTitle(theEllipse.get('name'));
              infoTemplate.setContent("<b>Circulo: Referencia: </b>" + theEllipse.get('reference') + "<br/>"
              + "<b>Area: </b>" + theEllipse.get('area') + ' ' + theEllipse.get('uArea') + "<br/>"
              + "<b>Perímetro: </b>" + theEllipse.get('perimeter') + ' ' + theEllipse.get('uPerimeter') + "<br/>"              
              + "<b>id: </b>" + theEllipse.get('id') + "<br/>");
              aGraphic.setInfoTemplate(infoTemplate);

              circleLayer.add(aGraphic);          
            });                                
          }); 
                      
          this._map.addLayer(circleLayer);
        }
      }  
    } else {
      //si hay mobil
        if (figure.id === 'Punto') {                                  
            //this._map.pointLayer.clear();          
            var theMobil = this.get('selectedMobil');
            //alert("Si hay mobil = " + theMobil);
            var pointLayer = new GraphicsLayer({ id: theMobil.id });           
                                        
            var thePoints = theMobil.get('points');                                                       
            thePoints.forEach(thePoint => {
              // Create a point graphic //
              var X = thePoint.get('X');
              var Y = thePoint.get('Y');                                      
              var spRef = thePoint.get('spRef');      
              var point = new Point(X, Y, new SpatialReference({ wkid: spRef }));
              if (point.spatialReference === '102100') {
                  point = webMercatorUtils.webMercatorToGeographic(point); //102100 4326
              }                    

              var markerPicture = new PictureMarkerSymbol();      
              markerPicture.setHeight(20);
              markerPicture.setWidth(20);
              
              var url = thePoint.get('imagePath');
              if (url === '/assets/logos/') {
                  url = theMobil.get('imagePath');
              }
              markerPicture.setUrl(url);
              //markerPicture.setUrl("http://img3.wikia.nocookie.net/__cb20140427224234/caramelangel714/images/7/72/Location_Icon.png");              

              var aGraphic = new Graphic(point, markerPicture);
              var infoTemplate = new InfoTemplate();
              infoTemplate.setTitle(thePoint.get('name'));
              infoTemplate.setContent("<b>Punto: Referencia: </b>" + thePoint.get('reference') + "<br/>"
              + "<b>id: </b>" + thePoint.get('id') + "<br/>");
              aGraphic.setInfoTemplate(infoTemplate);

              pointLayer.add(aGraphic);                                  
              //map.graphics.add(new Graphic(jsonGraphic));
              //console.log("pointLayer", pointLayer); //Object {_attrs: Object, _url: null, url: null, spatialReference: Object, initialExtent: Object…}
            });                                             
            this._map.addLayer(pointLayer);

          //si hay mobil
        } else if (figure.id === 'Línea') {
            var theMobil = this.get('selectedMobil');            
            var polylineLayer = new GraphicsLayer({ id: theMobil.id });                                                                              
            //alert("theMobil es :" + theMobil.get('name'));                
            var theLines = theMobil.get('lines');                                                       
            theLines.forEach(theLine => {

              var jsonLine = JSON.parse(theLine.get('json'));
              //alert("el jsonLine despues del parseo : " + jsonLine);                
              var wkid = theLine.get('spRef'); 

              var polylineJson = {
                'spatialReference': {'wkid': wkid}, 
                'paths': jsonLine                                   
              };
              var polyline = new Polyline(polylineJson);
              if (polyline.spatialReference === '102100') {
                  polyline = webMercatorUtils.webMercatorToGeographic(polyline); //102100 to 4326
                  //polyline = webMercatorUtils.geographicToWebMercator(polyline); //4326 to 102100
              }                                                                                          
              
              // Create a simple line symbol for rendering the line in the view
              var polylineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID).setWidth(2);            
              let color = theLine.get('color');
              console.log('el color seleccionado es: ' + color);                
              let colorCode = this.getColorCode(color);
              //console.log('el codigo de color resultante es: ' + colorCode); 
              
              polylineSymbol.setColor(new Color(colorCode));

              //var polylineLayer = new GraphicsLayer();              
              //polylineLayer.add(new Graphic(polyline, polylineSymbol));
              var aGraphic = new Graphic(polyline, polylineSymbol);

              var infoTemplate = new InfoTemplate();
              infoTemplate.setTitle(theLine.get('name'));
              infoTemplate.setContent("<b>Polilínea: Referencia: </b>" + theLine.get('reference') + "<br/>"
              + "<b>Longitud: </b>" + theLine.get('long') + ' ' + theLine.get('uLong') + "<br/>"
              + "<b>id: </b>" + theLine.get('id') + "<br/>");
              aGraphic.setInfoTemplate(infoTemplate);

              polylineLayer.add(aGraphic);
            });                                                                     
            this._map.addLayer(polylineLayer);
          //si hay mobil
        } else if (figure.id === 'Polígono') {
            var theMobil = this.get('selectedMobil');            
            var polygonLayer = new GraphicsLayer({ id: theMobil.id });
                                                                                               
            var thePolygons = theMobil.get('polygons');                                                       
            thePolygons.forEach(thePolygon => {
              //alert("el poligono es :" + thePolygon.get('name'));
              // Create a polygon graphic //
              var jsonPolygon = JSON.parse(thePolygon.get('json'));
              var wkid = thePolygon.get('spRef');

              var polygonJson = {
                'spatialReference': {'wkid': wkid},
                'rings': jsonPolygon                                   
              };                
    
              var polygon = new Polygon(polygonJson);
                if (wkid === '102100') {
                  polygon = webMercatorUtils.webMercatorToGeographic(polygon); //102100 4326
              }

              let color = thePolygon.get('color');
              console.log('el color seleccionado es: ' + color);                
              let colorCode = this.getFillColorCode(color);
              //console.log('el codigo de color resultante es: ' + colorCode);                     

              var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255,0,0]), 1),new Color(colorCode)
              );
              //var polygonExtent = polygon.getExtent(); //si jala
              //console.log("polygonExtent", polygonExtent);
              
              //polygonLayer.add(new Graphic(polygon, sfs));
              var aGraphic = new Graphic(polygon, sfs);

              var infoTemplate = new InfoTemplate();
              infoTemplate.setTitle(thePolygon.get('name'));
              infoTemplate.setContent("<b>Polígono: Referencia: </b>" + thePolygon.get('reference') + "<br/>"
              + "<b>Area: </b>" + thePolygon.get('area') + ' ' + thePolygon.get('uArea') + "<br/>"
              + "<b>Perímetro: </b>" + thePolygon.get('perimeter') + ' ' + thePolygon.get('uPerimeter') + "<br/>"
              + "<b>id: </b>" + thePolygon.get('id') + "<br/>");
              aGraphic.setInfoTemplate(infoTemplate);

              polygonLayer.add(aGraphic);          
            });                                             
                        
            this._map.addLayer(polygonLayer);          

          //si hay mobil
        } else if (figure.id === 'Elipse') {                                                          
            var theMobil = this.get('selectedMobil');
            //alert("selectedMobil = " + theMobil.id);            
            var circleLayer = new GraphicsLayer({ id: theMobil.id });
                                                                  
            var theEllipses = theMobil.get('ellipses');                                                       
            theEllipses.forEach(theEllipse => {
              //alert("la elipse es :" + theEllipse.get('name'));
              // Create a circle graphic //
              var jsonEllipse = JSON.parse(theEllipse.get('json'));
              var wkid = theEllipse.get('spRef');
      
              // home -97.84640077331348,22.262364334775313                  
              var centerPoint = new Point(jsonEllipse, new SpatialReference({ wkid: wkid }));                  
              if (centerPoint.spatialReference === '102100') {
                  centerPoint = webMercatorUtils.webMercatorToGeographic(centerPoint); //102100 4326
              }

              switch (theEllipse.get('uPerimeter')) {
                case 'Kilometros':
                    var circle = new Circle({
                      center: centerPoint,
                      radius: theEllipse.get('radio'),
                      radiusUnit: Units.KILOMETERS
                    });              
                    break;
                case 'Metros':
                    var circle = new Circle({
                      center: centerPoint,
                      radius: theEllipse.get('radio'),
                      radiusUnit: Units.METERS
                    });              
                    break;
                case 'Miles':
                    var circle = new Circle({
                      center: centerPoint,
                      radius: theEllipse.get('radio'),
                      radiusUnit: Units.MILES
                    });              
                    break;
                case 'Feet':
                    var circle = new Circle({
                      center: centerPoint,
                      radius: theEllipse.get('radio'),
                      radiusUnit: Units.FEET
                    });              
                    break;          
                default:
                    var circle = new Circle({
                      center: centerPoint,
                      radius: theEllipse.get('radio'),
                      radiusUnit: Units.METER
                    });              
              } 
              let color = theEllipse.get('color');
              console.log('el color seleccionado es: ' + color);                
              let colorCode = this.getFillColorCode(color);
              //console.log('el codigo de color resultante es: ' + colorCode);
                                                                                                                
              var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255,0,0]), 1),new Color(colorCode)
              );                                
              //circleLayer.add(new Graphic(circle, sfs));
              var aGraphic = new Graphic(circle, sfs);

              var infoTemplate = new InfoTemplate();
              infoTemplate.setTitle(theEllipse.get('name'));
              infoTemplate.setContent("<b>Circulo: Referencia: </b>" + theEllipse.get('reference') + "<br/>"
              + "<b>Area: </b>" + theEllipse.get('area') + ' ' + theEllipse.get('uArea') + "<br/>"
              + "<b>Perímetro: </b>" + theEllipse.get('perimeter') + ' ' + theEllipse.get('uPerimeter') + "<br/>"
              + "<b>id: </b>" + theEllipse.get('id') + "<br/>");
              aGraphic.setInfoTemplate(infoTemplate);

              circleLayer.add(aGraphic);          
            });                                           
                      
          this._map.addLayer(circleLayer);
/*
          for (var j=0, jl= this._map.layerIds.length; j<jl; j++) {
            var currentLayer = this._map.getLayer(this._map.layerIds[j]);
            //alert("id: " + currentLayer.id);
            console.log('id: ' + currentLayer.id);
          }
*/
          var graphicLayerIds = this._map.graphicsLayerIds;
          var len = graphicLayerIds.length;
          for (var i = 0; i < len; i++) {
              var gLayer = this._map.getLayer(graphicLayerIds[i]);
              //clear this Layer
              //gLayer.clear();
              console.log('id: ' + gLayer.id);
          }          
        }
    }
  });
}.observes('updateMap'),

  // whenever items change, update the map
  didUpdateAttrs () {
    //alert("entre a didUpdateAttrs de esri-map.js y aun no se cuando jala ");    
  },

    // destroy the map before this component is removed from the DOM
  willDestroyElement () {
    if (this._map) {
      this._map.destroy();
      delete this._map;
    }
  },

  getFillColorCode: function(color) {    
    switch(color) {
        case "Black":
            return [0,0,0,0.25]; 
        case "Blue":
            return [0,0,255,0.25];
        case "Brown":
            return [165,42,42,0.25]; 
        case "Cyan":
            return [0,255,255,0.25];
        case "Gray":
            return [128,128,128,0.25]; 
        case "Green":
            return [0,128,0,0.25];
        case "Lime":
            return [0,255,0,0.25]; 
        case "Magenta":
            return [255,0,255,0.25];
        case "Orange":
            return [255,165,0,0.25];
        case "Pink":
            return [255,192,203,0.25]; 
        case "Purple":
            return [128,0,128,0.25];
        case "Red":
            return [255,0,0,0.25];             
        case "Salmon":
            return [255,128,114,0.25];
        case "Silver":
            return [192,192,192,0.25];
        case "Violet":
            return [238,130,238,0.25];
        case "White":
            return [255,255,255,0.25];
        case "Yellow":
            return [255,255,0,0.25];                                
        default:
            return [255,0,0,0.25];
    } 
  },

  getColorCode: function(color) {    
    switch(color) {
        case "Black":
            return [0,0,0,1]; 
        case "Blue":
            return [0,0,255,1];
        case "Brown":
            return [165,42,42,1]; 
        case "Cyan":
            return [0,255,255,1];
        case "Gray":
            return [128,128,128,1]; 
        case "Green":
            return [0,128,0,1];
        case "Lime":
            return [0,255,0,1]; 
        case "Magenta":
            return [255,0,255,1];
        case "Orange":
            return [255,165,0,1];
        case "Pink":
            return [255,192,203,1]; 
        case "Purple":
            return [128,0,128,1];
        case "Red":
            return [255,0,0,1];             
        case "Salmon":
            return [255,128,114,1];
        case "Silver":
            return [192,192,192,1];
        case "Violet":
            return [238,130,238,1];
        case "White":
            return [255,255,255,1];
        case "Yellow":
            return [255,255,0,1];                                
        default:
            return [255,0,0,1];
    } 
  },

  myshowExtent(ext){
    var extentString = "";
    extentString = "XMin: " + ext.xmin +
      " YMin: " + ext.ymin +
      " XMax: " + ext.xmax +
      " YMax: " + ext.ymax;
      alert("the extent is: " + extentString);
    //document.getElementById("onExtentChangeInfo").innerHTML = extentString;
  },    

  configNavigation(evt) {
    alert("entre al configNavigation de esri-map.js !");
    evt.map.disableMapNavigation();
  },

  actions: {

      showModalDialog(message) {
        //this.set('modalMessage', message);        
        //this.set('isShowModal', true);
        console.log('ahora Toy en el showModalDialog de body-map component !');
        this.sendAction('showModalDialog', message);                                   
    },    
  }
});