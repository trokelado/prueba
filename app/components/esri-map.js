/*
import Ember from 'ember';
//import layout from '../templates/components/esri-map';
//import fallbackIfUndefined from '../utils/computed-fallback-if-undefined';

export default Ember.Component.extend({
  //layout,  
  esriLoader: Ember.inject.service('esri-loader'),  
  store: Ember.inject.service('store'),
  //src: { src: 'http://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },

  sortedBasemaps: Ember.computed.sort('model.basemaps', '_basemapSort'),
  _basemapSort: ['name'],
  //_basemapSort: ['name:desc']
  sortedProjects: Ember.computed.sort('model.projects', '_projectSort'),
  _projectSort: ['name'],
  //_projectSort: ['name:desc']
  sortedModes: Ember.computed.sort('model.modes', '_modeSort'),
  _modeSort: ['name'],
  //_modeSort: ['name:desc']
  sortedFigures: Ember.computed.sort('model.figures', '_figureSort'),
  _figureSort: ['name'],
  //_figureSort: ['name:desc']          
  sortedFeatures: Ember.computed.sort('selectedFeatures', '_featureSort'),
  _featureSort: ['name'],
  //_featureSort: ['name:desc']    
  sortedMobils: Ember.computed.sort('selectedMobils', '_mobilSort'),
  _mobilSort: ['name'],
  //_mobilSort: ['name:desc']
  sortedDocs: Ember.computed.sort('selectedDocs', '_docSort'),
  _docSort: ['name'],
  //_mobilSort: ['name:desc']  

  matchTriggerWidth: true,
  updateMap: false,
  drawOnMap: false,
  clearLayer: false,
  isShowVisible: false,
  isDrawVisible: false,
  isSelectVisible: false,
  isDocVisible: false,
  selectedProject: null,
  selectedMode: null,
  selectedFigure: null,
  selectedFeature: null,
  selectedMobil: null,
  selectedDoc: null,
  selectedBasemap: null,
  isShowModal: false, 
  isImage: false,
  isPdf: false,
  isVideo: false,

/*
  click: function (event) {
    console.log(event.target); // si jala displays the clicked element
    console.log("Hello from component");
  },
*/
/*
  click: function() {
    let element = this.$(event.target); //Basically to the get the DOM element created by the view
    console.log("el elemento clikeado es: " + element.id);
  },
  */
/*
  click: function() {
      // si jala
    var mode = this.get('selectedMode');
    if (!mode) {
      console.log("voy a cortar por mode = " + mode);
      return;
    }    
    if (mode.id !== 'Agregar') {
      console.log("voy a cortar por mode.id = " + mode.id);
      return;
    }     
    var figure = this.get('selectedFigure');
    if (!figure) {
      console.log("voy a cortar por figure = " + figure);
      return;
    }    
    if (figure.id !== 'Punto') {
      console.log("voy a cortar por figure.id = " + figure.id);
      return;
    } 
    var mobil = this.get('selectedMobil');
    //console.log("el mobil es: " + mobil);
    if (!mobil) {
      console.log("voy a cortar por mobil = " + mobil);
      return;
    }
    if (mobil === 'Componente') {
      console.log("voy a cortar por mobil = " + mobil);
      return;
    }

    console.log("User clicked at " +
      event.screenPoint.x + ", " + event.screenPoint.y +
      " on the screen. The map coordinate at this point is " +
      event.mapPoint.x + ", " + event.mapPoint.y          
    );

    // home -10892210.977870295, 2543189.5187810003
      // home -97.84640077331348,22.262364334775313
      //home -97.846,22.262
      
      var params = {
       name: 'prueba desde mapa',
       isActive: true,
       reference: 'reference',
       icon: '',       
       spRef: '102100',
       X: event.mapPoint.x,
       Y: event.mapPoint.y,       
       mobil: mobil
     };
     //console.log("voy a grabar registro de punto !");    
     this.sendAction('savePoint', params);
     
  },
*/
/*
    mouseEnter: function(evt) {
      //console.log('mouseEnter');
      //var $this = $(evt.target);
        //console.log('$this' + $this);
    },
    mouseLeave: function(evt) {
        console.log('mouseLeave');
    },
*/
/*
    didInsertElement () {
    //alert('entre al didInsertElement !');
    this._super(...arguments);    
    // load the map modules
      
    this.get('esriLoader').loadModules(['esri/map', 'esri/SpatialReference', 'esri/geometry/Extent', 'esri/dijit/Scalebar']).then(modules => {
      const [Map, SpatialReference, Extent, Scalebar] = modules;          
      //alert('entre al esriLoader en esri-map !');

      //var startExtent = new Extent(-95.271, 38.933, -95.228, 38.976, new SpatialReference({ wkid:4326 }) );
      //var startExtent = new Extent(-97.8486, 22.2604, -97.843, 22.2631, new SpatialReference({ wkid:4326 }) ); // mi home extent      
      
      this._map = new Map(this.elementId, {
        center: [-10.0, 40.0], // longitude, latitude initial         
        basemap: 'hybrid',  //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray' "gray", "oceans", "osm", "national-geographic"
        //center: [-97.8456, 22.2624], // longitude, latitude Tampico
        //extent: startExtent,
        zoom: 3
      });      
      //this._map.setExtent(startExtent);
      var scalebar = new Scalebar({
        map: this._map,
        attachTo: 'bottom-left',
        scalebarUnit: 'metric' //'metric' 'dual' 'english'
      });
      //this._map.on("click", myClickHandler); //si jalo el event handler

      function myClickHandler(event) {
        alert("User clicked at " +
          event.screenPoint.x + ", " + event.screenPoint.y +
          " on the screen. The map coordinate at this point is " +
          event.mapPoint.x + ", " + event.mapPoint.y
        ); 
      }
   })
  },    


  basemapChanged: function() {
    var basemap = this.get('selectedBasemap');
    if (!basemap) {
      return;
    }
    this.willDestroyElement();
    this.get('esriLoader').loadModules(['esri/map', 'esri/SpatialReference', 'esri/geometry/Extent', 'esri/dijit/Scalebar']).then(modules => {
      const [Map, SpatialReference, Extent, Scalebar] = modules;          

      this._map = new Map(this.elementId, {                         
          basemap: basemap.id,  //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray' "gray", "oceans", "osm", "national-geographic"        
          center: [-10.0, 40.0],
          zoom: 3
      });
/*
      var startExtent = null;
      var project = this.get('selectedProject.id');
      if (!project) {
        startExtent = new Extent(-90.271, 23.2, -89.228, 23.8, new SpatialReference({ wkid:4326 }) );
        //startExtent = new Extent(-95.271, 38.933, -95.228, 38.976, new SpatialReference({ wkid:4326 }) );
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
        this._map.setExtent(startExtent);
      }
      */ 
      /*                             
      var scalebar = new Scalebar({
        map: this._map,
        attachTo: 'bottom-left',
        scalebarUnit: 'metric' //'metric' 'dual' 'english'
      });
      this.set('selectedProject', 'Proyecto');
      //this.rerender();                
    })    
  }.observes('selectedBasemap'),


  projectChanged: function() {
    //alert("entre al projectChanged a cambiar de proyecto !!");
    var basemap = this.get('selectedBasemap');
    if (!basemap) {
      return;
    }
    this.willDestroyElement();
    this.get('esriLoader').loadModules(['esri/map', 'esri/SpatialReference', 'esri/geometry/Extent', 'esri/dijit/Scalebar']).then(modules => {
      const [Map, SpatialReference, Extent, Scalebar] = modules;          

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
        var grafico = event.graphic;
        //var it = grafico.getInfoTemplate();
        //console.log("User clicked on grafico.getInfoTemplate() " + it);
        //var node = grafico.getNode();
        //console.log("User clicked on grafico.getInfoTemplate() " + it);
        var title = grafico.getTitle();
        var content = grafico.getContent();        
        //console.log("User clicked on event.target" + event.target);
        //console.log("User clicked on event.graphic" + event.graphic);
        //console.log("User clicked on it " + it);
        console.log("User clicked on grafico.getTitle() " + title);
        console.log("User clicked on cont " + content);          
        //let element = this._map.$(event.target); //Basically to the get the DOM element created by the view

        var n = content.search("id: </b>");
        var pointId = content.substring(n + 8, n + 8 + 20)
        console.log("el pointId es: " + pointId);
        var point = self.get('store').peekRecord('point', pointId);                          
        var selectedDocs = point.get('docs');                
        self.set('selectedDocs', selectedDocs);               
        //let placeholder = 'Escoja un componente';
        self.set('selectedDoc', 'Documento');
        //self.set('isDocVisible', true);
                                
      };
      
  //version anterior de dibujado no he podido hacer que jale el action
  var mode = this.get('selectedMode');  
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
  //alert("nombre del componente: "+ name);
  if (name === undefined) {
      alert("Introdusca un nombre para el componente !");
      return;
  }
  var reference = this.get('reference');
  if (reference === undefined) {
      alert("Introdusca una referencia para el componente !");
      return;
  }
  
  var figure = this.get('selectedFigure');
  var _this = this;        
  if (figure === 'Punto') {
    return
  } 

  this.willDestroyElement();
  this.get('esriLoader').loadModules(['esri/map', 'esri/layers/GraphicsLayer', 'esri/graphic', 'esri/toolbars/draw', 'esri/symbols/SimpleLineSymbol', 'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/SimpleFillSymbol', 'esri/symbols/PictureMarkerSymbol', 'esri/Color', 'dojo/dom', 'dojo/parser', 'dijit/registry', 'dijit/form/Button', 'esri/geometry/Extent', 'esri/SpatialReference', 'esri/geometry/webMercatorUtils', 'esri/dijit/Scalebar']).then(modules => {
    const [Map, GraphicsLayer, Graphic, Draw, SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol, PictureMarkerSymbol, Color, dom, parser, registry, Button, Extent, SpatialReference, webMercatorUtils, Scalebar] = modules;            
    //alert('entre al esriLoader en esri-map !');
    //parser.parse();
        
    this._map = new Map(this.elementId, {                         
        basemap: basemap.id,  //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray' "gray", "oceans", "osm", "national-geographic"        
        //zoom: 10
    });
    var proyecto = this.get('store').peekRecord('project', project.id);
    //alert('el proyecto es : ' + proyecto);    
    var minX = proyecto.get('minX');
    var minY = proyecto.get('minY');
    var maxX = proyecto.get('maxX');
    var maxY = proyecto.get('maxY');                  
    var spRef = proyecto.get('spRef');
    //alert('el proyecto es minX: ' + minX);        
    let startExtent = new Extent(minX, minY, maxX, maxY, new SpatialReference({ wkid: spRef }) );
    let _refGringa = 102100;
    
    if (spRef === _refGringa) {
      //console.log('toy en el web mercator !');
        startExtent = webMercatorUtils.webMercatorToGeographic(startExtent); //102100 4326
    } 
                        
    this._map.setExtent(startExtent);

    var scalebar = new Scalebar({
      map: this._map,
      attachTo: 'bottom-left',
      scalebarUnit: 'metric' //'metric' 'dual' 'english'
    });           
    
    this._map.on("load", createToolbar);
    //var figure = this.get('selectedFigure');
    //let tool = figure;
    //tool = tool.toUpperCase();
    //var tool = this.label.toUpperCase().replace(/ /g, "_");
    //console.log("procedo a activar el dibujado de: " + tool);            
    //toolbar.activate(tool); 
    

    this.rerender(); 

      function createToolbar(themap) {
        console.log("carge el mapa y entre al createToolbar !" + themap);
          var toolbar = new esri.toolbars.Draw(themap, {
            //tooltipOffset:20,
            //drawTime:60
          });
          toolbar.on("draw-complete", addDrawToMap);
          console.log("di de alta un toolbar y registre el draw-complete ! " + toolbar);
          toolbar.activate(Draw.POLYGON);
          console.log("acabo de activar el toolbar: " + toolbar);
          themap.disableMapNavigation();
          console.log("el toolbar es: " + toolbar);            
          //themap.hideZoomSlider();          
      };      

      function addDrawToMap(evt) {
        //deactivate the toolbar and clear existing graphics 
        toolbar.deactivate(); 
        map.enableMapNavigation();
        console.log("entre al addDrawToMap y tengo un evt: " + evt);
        // figure out which symbol to use      
        var line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, 2);
        line.setColor(new Color([255, 0, 0, 1]));
        var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 6);
        markerSymbol.setColor(new Color([230, 0, 169, 0.84]));
        markerSymbol.setOutline(line);

        if ( evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
          symbol = markerSymbol;
        } else if ( evt.geometry.type === "line" || evt.geometry.type === "polyline") {
          symbol = lineSymbol;
        }
        else {
          symbol = fillSymbol;
        }
        this._map.graphics.add(new Graphic(evt.geometry, markerSymbol));
      }               
    });
 
    })    
  }.observes('selectedProject'),

figureChanged: function() {
  //map.graphics.clear();

}.observes('selectedFigure'),

featureChanged: function() {

}.observes('selectedFeature'),

mobilChanged: function() {

}.observes('selectedMobil'),

pointChanged: function() {

}.observes('selectedDocs'),


docChanged: function() {
  var doc = this.get('selectedDoc');
  if (!doc) {
    return
  }
  if (doc === 'Documento') {
    console.log("entre a docChanged de esri-map porque el punto tiene Documentos !");
    this.set('isDocVisible', true);
    return
  }    
  var midoc = this.get('store').peekRecord('doc', doc.id);
  let docto = midoc.get('name');
  let format = midoc.get('format');  
  console.log("entre a docChanged de esri-map el documento es: " + docto);
  let path = midoc.get('path');
  let m = path.search("https://");  
  if (m > -1) {    
    let href = path; 
    //window.location=href;
  }
  m = path.search("http://");    
  if (m > -1) {
    let href = path; 
    //window.location=href;
  } 
  m = path.search(".jpg");    
  if (m > -1) {
    path = midoc.get('imagePath');
    this.set('myPath', path);
    this.set('isImage', true);
    let name = format + ': ' + docto;    
    this.send('showModalDialog', name);            
    return;     
  }
  m = path.search(".jpeg");    
  if (m > -1) {
    path = midoc.get('imagePath');
    this.set('myPath', path);
    this.set('isImage', true);
    let name = format + ': ' + docto;
    this.send('showModalDialog', name);     
    return;     
  }
  m = path.search(".png");    
  if (m > -1) {
    path = midoc.get('imagePath');
    this.set('myPath', path);
    this.set('isImage', true);
    let name = format + ': ' + docto;
    this.send('showModalDialog', name); 
    return;     
  } 
  m = path.search(".pdf");    
  if (m > -1) {
    path = midoc.get('imagePath');
    this.set('myPath', path);
    this.set('isPdf', true);
    let name = format + ': ' + docto;
    this.send('showModalDialog', name); 
    return;     
  }  
  m = path.search(".webm");    
  if (m > -1) {
    path = midoc.get('imagePath');
    console.log('el path es: ' + path)
    this.set('myPath', path);
    this.set('isVideo', true);
    let name = format + ': ' + docto;
    this.send('showModalDialog', name); 
    return;     
  }  
  m = path.search(".ogg");    
  if (m > -1) {
    path = midoc.get('imagePath');
    this.set('myPath', path);
    this.set('isVideo', true);
    let name = format + ': ' + docto;
    this.send('showModalDialog', name); 
    return;     
  }
  m = path.search(".mp3");    
  if (m > -1) {
    path = midoc.get('imagePath');
    this.set('myPath', path);
    this.set('isVideo', true);
    let name = format + ': ' + docto;
    this.send('showModalDialog', name); 
    return;     
  }
  m = path.search(".mp4");    
  if (m > -1) {
    path = midoc.get('imagePath');
    this.set('myPath', path);
    this.set('isVideo', true);
    let name = format + ': ' + docto;
    this.send('showModalDialog', name); 
    return;     
  } 
  m = path.search(".pptx");    
  if (m > -1) {
    path = midoc.get('imagePath');
    this.set('myPath', path);
    this.set('isPower', true);
    let name = format + ': ' + docto;
    this.send('showModalDialog', name); 
    return;     
  } 
  //this.set('isShowingModal', true); 
}.observes('selectedDoc'),



clearRequired: function() {
      //graphicsLayer.clear();            
      let mobil = this.get('selectedMobil');
      if (mobil !== 'Componente') {
        var graphicLayerIds = this._map.graphicsLayerIds;
        var len = graphicLayerIds.length;
        for (var i = 0; i < len; i++) {
            var gLayer = this._map.getLayer(graphicLayerIds[i]);
            if(gLayer.id === mobil.id) {
              //console.log("entre a clearRequired y voy a borrar: ", mobil.id);
              //clear this Layer
              //gLayer.visible = false; no jala
              gLayer.clear();
              return;
            }            
        }
      }
      let feature = this.get('selectedFeature');
      if (feature !== 'Grupo') {
        var graphicLayerIds = this._map.graphicsLayerIds;
        var len = graphicLayerIds.length;
        for (var i = 0; i < len; i++) {
            var gLayer = this._map.getLayer(graphicLayerIds[i]);
            //console.log("glayer es: " + gLayer.id + ' feature.id: ' + feature.id);
            if(gLayer.id === feature.id) {
              //console.log("entre a clearRequired y voy a borrar: ", feature.id);
              //clear this Layer
              //gLayer.visible = false; //no jala
              gLayer.clear();
              return;
            }            
        }
      }
      let figure = this.get('selectedFigure');
      let figureLayer = null;
      if (figure.id === 'Punto') {
          figureLayer = 'pointLayer';
      } else if (figure.id === 'Línea') {
          figureLayer = 'polylineLayer';
      } else if (figure.id === 'Polígono') {
          figureLayer = 'polygonLayer';
      } else if (figure.id === 'Elipse') {
          figureLayer = 'circleLayer';
      }
      //console.log("entre a clearRequired a nivel figura: ", figure.id);      
        var graphicLayerIds = this._map.graphicsLayerIds;
        var len = graphicLayerIds.length;
        for (var i = 0; i < len; i++) {
            var gLayer = this._map.getLayer(graphicLayerIds[i]);
            //console.log("la capa en turno es : ", gLayer.id);
            if(gLayer.id === figureLayer) {
              //console.log("encontre la igualdad y procedo a inhibir !");
              //clear this Layer
              //gLayer.visible = false;
              gLayer.clear();
              return;
            }            
        }                        
      
      //this._map.graphics.remove(figure.id); no jalo
      //map.graphics.remove(your_graphic);
      //map.graphics.remove(the_graphic), where the_graphic is the graphic that you want to remove.
      //map.graphics.clear(); to remove all graphics added in this way.
      //If you have added graphics to a particular graphics layer, then you need to remove the graphic from that particular layer,
      // by calling something like gLayer.remove(the_graphic) where gLayer is your graphic layer and the_graphic is the graphic 
      //that you want to remove.

}.observes('clearLayer'),


mapDrawFigures: function() {
  var mode = this.get('selectedMode');
  if (!mode) {
    console.log("voy a cortar por mode = " + mode);
    return;
  }
  if (mode.id !== 'Agregar') {
      console.log("voy a cortar por el mode.id = " + mode.id);
      return;
  }
  var name = this.get('name');
  //alert("nombre del componente: "+ name);
  if (name === undefined) {
      alert("Introdusca un nombre para el componente !");
      return;
  }
  var reference = this.get('reference');
  if (reference === undefined) {
      alert("Introdusca una referencia para el componente !");
      return;
  }
  
  var figure = this.get('selectedFigure');
  var _this = this;        
  if (figure.id === 'Punto') {
    this._map.on("click", myClickHandler); //si jalo el event handler

    function myClickHandler(event) {
      console.log("User clicked at " +
        event.screenPoint.x + ", " + event.screenPoint.y +
        " on the screen. The map coordinate at this point is " +
        event.mapPoint.x + ", " + event.mapPoint.y
      );
      var mobil = _this.get('selectedMobil');
      var params = {
       name: _this.get('name'),
       isActive: true,
       reference: _this.get('reference'),
       icon: '',       
       spRef: '102100',
       X: event.mapPoint.x,
       Y: event.mapPoint.y,       
       mobil: mobil
     };
     console.log("voy a grabar registro de punto !");    
      _this.sendAction('savePoint', params);
      //_this.set('selectedMode', 'Consultar');                               
      let update = _this.get('drawOnMap');
      if(update) {
        _this.set('drawOnMap', false);
      } else {
        _this.set('drawOnMap', true);
      }
      _this.set('isShowVisible', true);
      _this.set('isDrawVisible', false);
      _this.set('isSelectVisible', true);  
    }    
  } else {
    //return;
  //}
  
  this.get('esriLoader').loadModules(['esri/map', 'esri/layers/GraphicsLayer', 'esri/graphic', 'esri/toolbars/draw', 'esri/symbols/SimpleLineSymbol', 'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/SimpleFillSymbol', 'esri/symbols/PictureMarkerSymbol', 'esri/Color', 'dojo/dom', 'dojo/parser', 'dijit/registry', 'dijit/form/Button']).then(modules => {
    const [Map, GraphicsLayer, Graphic, Draw, SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol, PictureMarkerSymbol, Color, dom, parser, registry, Button] = modules;            
    //alert('entre al esriLoader en esri-map !');
    //parser.parse();
    this.willDestroyElement();

    this._map = new Map(this.elementId, {
          basemap: "streets",
          center: [-15.469, 36.428],
          zoom: 3
    });
        
    this._map.on("load", createToolbar);

        // Loosely based on Ember’s event dispatcher
        // https://github.com/emberjs/ember.js/blob/master/packages/ember-views/lib/system/event_dispatcher.js#L132
        //rootElement.on(`${event}.ember`, '.ember-view', function(evt, triggeringManager) {
          /*
        rootEl.on(event, ".ember-view", function (e) {  
          var view = Ember.View.views[this.id];

          handler = findNearestViewWithEvent(view, event);

          if (handler) {
            handler[event].apply(this, e)
          } else if (view) {
            bubbleEvent(view, e, event);
          }
          e.stopPropagation()
        });
*/
/*
      function createToolbar(themap) {
        console.log("carge el mapa y entre al createToolbar !" + themap);
          toolbar = new esri.toolbars.Draw(themap, {
            tooltipOffset:20,
            drawTime:60
          });
          toolbar.on("draw-complete", addDrawToMap);
          console.log("di de alta un toolbar y registre el draw-complete ! " + toolbar);

          var tool = 'Polygon';
          tool = tool.toLowerCase();
          //var tool = this.label.toUpperCase().replace(/ /g, "_");
          console.log("procedo a activar el dibujado de: " + tool);            
          //toolbar.activate(tool); 
          toolbar.activate(esri.toolbars.Draw.POLYGON);
          console.log("acabo de activar el toolbar: " + toolbar);
          themap.disableMapNavigation();
          console.log("el toolbar es: " + toolbar);            
          //themap.hideZoomSlider();
      };
      
      /*
          registry.forEach(function(d) {
              console.log("estoy en el loop de los registros d: " + d.declaredClass);
              // d is a reference to a dijit
              // could be a layout container or a button
              if ( d.declaredClass === "Button" ) {
                d.on("click", activateTool);
              }
          });
*/
/*
      function addDrawToMap(evt) {
        //deactivate the toolbar and clear existing graphics 
        toolbar.deactivate(); 
        map.enableMapNavigation();
        console.log("entre al addDrawToMap y tengo un evt: " + evt);
        // figure out which symbol to use      
        var line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, 2);
        line.setColor(new Color([255, 0, 0, 1]));
        var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 6);
        markerSymbol.setColor(new Color([230, 0, 169, 0.84]));
        markerSymbol.setOutline(line);

        if ( evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
          symbol = markerSymbol;
        } else if ( evt.geometry.type === "line" || evt.geometry.type === "polyline") {
          symbol = lineSymbol;
        }
        else {
          symbol = fillSymbol;
        }
        this._map.graphics.add(new Graphic(evt.geometry, markerSymbol));
      }               
    });
  }
}.observes('drawOnMap'),



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
    if (mobil === 'Componente') {
      //console.log('No hay mobil seleccionado !');
      if (feature === 'Grupo') {
        //console.log('No hay feature seleccionado !');
        if (!figure) {
          //console.log('No hay figura seleccionada !');
          return;  
        } else {
          //solo hay figure     
          if (figure.id === 'Punto') { 
            //console.log("entre a figure.id = 'Punto' !");                                  
            pointLayer = new GraphicsLayer({ id: 'pointLayer' });

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
                  infoTemplate.setContent("<b>Reference: </b>" + thePoint.get('reference') + "<br/>"
                  + "<b>id: </b>" + thePoint.get('id') + "<br/>");
                  aGraphic.setInfoTemplate(infoTemplate);

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
            var polylineLayer = new GraphicsLayer({ id: 'polylineLayer' });
            
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
                polylineLayer.add(new Graphic(polyline, polylineSymbol));
                });                                
              }); 
            });            
            this._map.addLayer(polylineLayer);             

            // aqui empiezan los poligonos
          } else if (figure.id === 'Polígono') { 
            //alert("entre a figure.id = Polígono !");
            //this._map.polygonLayer.clear();            
            var polygonLayer = new GraphicsLayer({ id: 'polygonLayer' });
            
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

                  var polygonJson = {
                    'spatialReference': {'wkid': wkid},
                    'rings': jsonPolygon                                   
                  };                
       
                  var polygon = new Polygon(polygonJson);
                    if (polygon.spatialReference === '102100') {
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
                  
                  polygonLayer.add(new Graphic(polygon, sfs));          
                });                                
              }); 
            });            
            this._map.addLayer(polygonLayer);

            // aqui empiezan las elipses
          } else if (figure.id === 'Elipse') {
            //alert("entre a figure.id = Elipse !");            
            var circleLayer = new GraphicsLayer({ id: 'circleLayer' });                        
            
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

                  var circle = new Circle({
                    center: centerPoint,
                    radius: 100,
                    radiusUnit: Units.KILOMETERS //Units.MILES
                  });

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
                  infoTemplate.setContent("<b>Reference: </b>" + theEllipse.get('reference') + "<br/>"
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
                infoTemplate.setContent("<b>Reference: </b>" + thePoint.get('reference') + "<br/>"
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
                polylineLayer.add(new Graphic(polyline, polylineSymbol));
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
                  if (polygon.spatialReference === '102100') {
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
                
                polygonLayer.add(new Graphic(polygon, sfs));          
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

              var circle = new Circle({
                center: centerPoint,
                radius: 100,
                radiusUnit: Units.KILOMETERS //Units.MILES
              });

              let color = theEllipse.get('color');
                  console.log('el color seleccionado es: ' + color);                
                  let colorCode = this.getFillColorCode(color);
                  //console.log('el codigo de color resultante es: ' + colorCode);
                                                                                                                
              var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255,0,0]), 1),new Color(colorCode)
              );                  
              circleLayer.add(new Graphic(circle, sfs));          
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
              infoTemplate.setContent("<b>Reference: </b>" + thePoint.get('reference') + "<br/>"
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
              polylineLayer.add(new Graphic(polyline, polylineSymbol));
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
                if (polygon.spatialReference === '102100') {
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
              
              polygonLayer.add(new Graphic(polygon, sfs));          
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

              var circle = new Circle({
                center: centerPoint,
                radius: 100,
                radiusUnit: Units.KILOMETERS //Units.MILES
              });

              let color = theEllipse.get('color');
              console.log('el color seleccionado es: ' + color);                
              let colorCode = this.getFillColorCode(color);
              //console.log('el codigo de color resultante es: ' + colorCode);
                                                                                                                
              var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255,0,0]), 1),new Color(colorCode)
              );                  
              circleLayer.add(new Graphic(circle, sfs));          
            });                                           
                      
          this._map.addLayer(circleLayer);
/*
          for (var j=0, jl= this._map.layerIds.length; j<jl; j++) {
            var currentLayer = this._map.getLayer(this._map.layerIds[j]);
            //alert("id: " + currentLayer.id);
            console.log('id: ' + currentLayer.id);
          }
*/
/*
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
    alert("entre a didUpdateAttrs de esri-map.js y aun no se cuando jala ");    
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

    chooseBasemap(basemap) {
     //alert("entre al chooseFeature de infeatures.js"+feature);
      this.set('selectedBasemap', basemap);            
      // this.calculateRoute();
      // this.updatePrice();
    },

    chooseProject(project) {
     //alert("entre al chooseProject a cambiar de proyecto" + project);
      this.set('selectedProject', project);
      this.set('isDocVisible', false);      
    },

    chooseMode(mode) {           
      this.set('selectedMode', mode);
      this.set('isDocVisible', false);      
      if (mode.id === 'Consultar') {        
        this.set('isShowVisible', true);
        this.set('isDrawVisible', false);
        this.set('isSelectVisible', true);         
      } else if (mode.id === 'Agregar') {        
        this.set('isDrawVisible', true);
        this.set('isShowVisible', false);
        this.set('isSelectVisible', true);
      } else {
        this.set('isDrawVisible', false);
        this.set('isShowVisible', false);
        this.set('isSelectVisible', false);          
      }      
    },

    chooseFigure(figure) {     
      this.set('selectedFigure', figure);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);
      var selectedFeatures = this.get('store').peekAll('feature').filterBy('figure', figure.id);
      //alert("entre al chooseFigure de infeatures.js y las selectedFeatures: " + selectedFeatures);
      this.set('selectedFeatures', selectedFeatures);
      this.set('selectedFeature', 'Grupo');
      this.set('selectedMobil', 'Componente');
      this.set('isDocVisible', false);                             
    },

    chooseFeature(feature) {
     //alert("entre al chooseFeature de infeatures.js"+feature);
      this.set('selectedFeature', feature);
      //alert("entre al chooseFeature de infeatures.js y seleccione: " + feature);
      var selectedMobils = feature.get('mobils');
      this.set('selectedMobils', selectedMobils);
      //let placeholder = 'Escoja un componente';
      this.set('selectedMobil', 'Componente');
      this.set('isDocVisible', false);      
      //let participante = selectedMobils.get('firstObject');      
      //alert("entre al chooseFeature de infeatures.js y seleccione: " + participante.id);      
    },

    chooseMobil(mobil) {
     //alert("entre al chooseFeature de infeatures.js" + mobil);
      this.set('selectedMobil', mobil);                  
      this.set('isDocVisible', false);
    },

    chooseDoc(doc) {
     //alert("entre al chooseDoc de infeatures.js" + doc);
      this.set('selectedDoc', doc);
      //this.send('showModal','doc-modal');                 
    },

    showModal(modal) {              
      this.sendAction('showModal', modal);        
    },
 
/*   
    openModal: function(target) {
      this.sendAction('openModal', target);
    },
    */
/*
    close: function() {
      return this.send('closeModal');
    },
*/
/*    showModal: function(name, model) { 
        this.render(name, { into: 'application', outlet: 'modal', model: model }); },
*/
/*
    callUpdateMap() {      
      let update = this.get('updateMap');
      if(update) {
        this.set('updateMap', false);
      } else {
        this.set('updateMap', true);
      }      
    },
    
    clearLayers() {      
      let update = this.get('clearLayer');
      if(update) {
        this.set('clearLayer', false);
      } else {
        this.set('clearLayer', true);
      }      
    },

    closeModalDialog() {
        this.set('isShowModal', false);
        this.set('isImage', false);
        this.set('isPdf', false);
        this.set('isVideo', false);
        console.log('ahora Toy en el closeModalDialog de esri-map component !');
    },
    showModalDialog(message) {
        this.set('modalMessage', message);
        //this.set('title', message);
        this.set('isShowModal', true);
        console.log('ahora Toy en el showModalDialog de esri-map component !');                                   
    },

    drawFigures() {      
      let update = this.get('drawOnMap');
      if(update) {
        this.set('drawOnMap', false);
      } else {
        this.set('drawOnMap', true);
      }      
    },

    showExtent(ext){
      var mapExtent = this._map.extent;
      console.log("mapExtent", mapExtent); //{type: "extent", xmin: -10678190.39729086, ymin: 350103.9780705909, xmax: -9028373.578784052, ymax: 2808318.807721206…}
      console.log("mapExtent.spatialReference", mapExtent.spatialReference);
      this.get('esriLoader').loadModules(['esri/geometry/webMercatorUtils']).then(modules => {
        const [webMercatorUtils] = modules;                 
        //var latLng = webMercatorUtils.xyToLngLat(event.mapPoint.x, event.mapPoint.y);
        var newExtent = webMercatorUtils.webMercatorToGeographic(mapExtent);
        console.log("newExtent", newExtent);      
        //var polygonExtent = polygon.getExtent(); //si jala
        //console.log("polygonExtent", polygonExtent); // {type: "extent", xmin: -87.5149753459953, ymin: 21.2379778182316, xmax: -87.0975774085202, ymax: 21.7033886259071…}
        //var newPoint = webMercatorUtils.webMercatorToGeographic(Point); // 102100 to 4326
      });
    },
  }  
});

/*
didInitAttrs(options) {
    console.log('didInitAttrs', options);
  },

  didUpdateAttrs(options) {
    console.log('didUpdateAttrs', options);
  },

  willUpdate(options) {
    console.log('willUpdate', options);
  },

  didReceiveAttrs(options) {
    console.log('didReceiveAttrs', options);
  },

  willRender() {
    console.log('willRender');
  },

  didRender() {
    console.log('didRender');
  },

  didInsertElement() {
    console.log('didInsertElement');
  },

  didUpdate(options) {
    console.log('didUpdate', options);
  },

*/


/* //los siguientes metodos fueron sacados de https://github.com/tomwayson/ambitious-arcgis-app/blob/master/workshop/5-maps.md
// clear and add graphics to the map
refreshGraphics (jsonGraphics) {
  const map = this._map;
  if (!map || !map.loaded) {
    return;
  }
  // clear any existing graphics
  map.graphics.clear();
  // convert json to graphics and add to map's graphic layer
  if (!jsonGraphics || jsonGraphics.length === 0) {
    return;
  }
  jsonGraphics.forEach(jsonGraphic => {
    map.graphics.add(new Graphic(jsonGraphic));
  });
},

// show new item extents on map
showItemsOnMap () {
  const { symbol, infoTemplate } = config.APP.map.itemExtents;
  const jsonGraphics = this.get('items').map(item => {
    const geometry = coordsToExtent(item.extent);
    return { geometry, symbol, attributes: item, infoTemplate };
  });
  this.get('mapService').refreshGraphics(jsonGraphics);
},

•then update contents of  didInsertElement()  to:

this._super(...arguments);
const mapService = this.get('mapService');
// create a map at this element's DOM node
mapService.newMap(this.elementId, config.APP.map.options);
// show item extents once map loads
mapService.on('load', this, this.showItemsOnMap);

•in app/items/template.hbs update the  extents-map  invocation to  {{extents-map items=model.results}} 
•visit the items route and see the extents on the map
•but they don't update when you change the query, or page, so
•back in app/components/extents-map/component.js add this method:

// whenever items change, update the map
didUpdateAttrs () {
  this.showItemsOnMap();
},
*/

/*
calculatePosition(trigger, content) {
    let { top, left, width, height } = trigger.getBoundingClientRect();
    let { height: contentHeight } = content.getBoundingClientRect();
    let style = {
      left: left + width,
      top: top +  window.pageYOffset + (height / 2) - (contentHeight / 2)
    };
    return { style };
  },
 */ 
  /*
   // Methods
  calculatePosition(trigger, content) {
    let { top, left, width, height } = trigger.getBoundingClientRect();
    let { width: contentWidth, height: contentHeight } = content.getBoundingClientRect();
    let style = {
      left: left - contentWidth,
      top: top +  window.pageYOffset + (height / 2) - (contentHeight / 2) + 25
    };
    return { style };
  },
*/     
 
/*
      view.then(function(){
      // All the resources in the MapView and the map have loaded. Now execute additional processes
      }, function(error){
      // Use the errback function to handle when the view doesn't load properly
      //console.log("The view's resources failed to load: ", error);
      });      
*/
    
      // mi home extent=-97.8486,22.2604,-97.843,22.2631
      // add a layer las primeras dos si jalan
//var maplayer = new VectorTileLayer('https://www.arcgis.com/sharing/rest/content/items/bf79e422e9454565ae0cbe9553cf6471/resources/styles/root.json');
//var maplayer = new VectorTileLayer('https://basemaps.arcgis.com/b2/arcgis/rest/services/World_Basemap/VectorTileServer');
      
      // no jala var maplayer = new VectorTileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer?f=jsapi');      
      //no jala var maplayer = new VectorTileLayer('http://www.arcgis.com/home/webmap/viewer.html?useExisting=1&layers=10df2279f9684e4a9f6a7f08febac2a9');

      //acceso no permitido var maplayer = new VectorTileLayer('https://imentec.maps.arcgis.com/apps/Embed/index.html?webmap=781c829064694363ba8f2cd6c61b1bce&amp;extent=-97.8486,22.2604,-97.843,22.2631&amp;zoom=true&amp;previewImage=false&amp;scale=true&amp;basemap_gallery=true&amp;disable_scroll=true&amp;theme=light');                                              
      //<style>.embed-container {position: relative; padding-bottom: 80%; height: 0; max-width: 100%;} .embed-container iframe, .embed-container object, .embed-container iframe{position: absolute; top: 0; left: 0; width: 100%; height: 100%;} small{position: absolute; z-index: 40; bottom: 0; margin-bottom: -15px;}</style><div class="embed-container"><iframe width="500" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title="Tampico" src="//imentec.maps.arcgis.com/apps/Embed/index.html?webmap=781c829064694363ba8f2cd6c61b1bce&amp;extent=-97.8486,22.2604,-97.843,22.2631&amp;zoom=true&amp;previewImage=false&amp;scale=true&amp;basemap_gallery=true&amp;disable_scroll=true&amp;theme=light"></iframe></div>
      //acceso no permitido var maplayer = new VectorTileLayer('https://imentec.maps.arcgis.com/home/webmap/viewer.html?useExisting=1');      
      // se publica https://arcg.is/008P08 y al navegar se convierte en https://www.arcgis.com/home/webmap/viewer.html?webmap=781c829064694363ba8f2cd6c61b1bce&extent=-97.8486,22.2604,-97.843,22.2631
      //tesela que no jala  var vtlayer = new VectorTileLayer('http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer');
      //tesela que no jala var vtlayer = new VectorTileLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/layers');      
      //tesela que no jala var vtlayer = new VectorTileLayer('http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/SanFrancisco/311Incidents/FeatureServer/0/addFeatures ');      
      //tesela que no jala  var vtlayer = new VectorTileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer');
      //la vi por ahi y no se que es http://js.arcgis.com/3.20compact/ember-debug/addons/ember-new-computed/utils/can-use-new-syntax.js      
      //tesela que no jalavar vtlayer = new VectorTileLayer('http://www.arcgis.com/apps/Viewer/index.html?appid=92158e2c9d7b494c968c0c141f69879b/info/thumbnail/LogoColegio133.jpg');
      // esta ultima puede verse en el navegador no en el sistema https://www.arcgis.com/home/item.html?id=92158e2c9d7b494c968c0c141f69879b
            

/*
// array of Esri module names to load and then register with SystemJS 
    [   parece que son version 4.4
        'esri/geometry/Point',
        'esri/geometry/geometryEngineAsync',
        'esri/Graphic',
        'esri/layers/FeatureLayer',
        'esri/layers/GraphicsLayer',
        'esri/Map',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol',
        'esri/views/MapView',
        'esri/views/SceneView'
    ],
*/
/*
require([ version 3.20 o 3.21
        "dojo/parser", 
        "dojo/ready",
        "dojo/_base/array",
        "esri/Color",
        "dojo/dom-style",
        "dojo/query",

        "esri/map", 
        "esri/request",
        "esri/graphic",
        "esri/geometry/Extent",

        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/PictureMarkerSymbol",
        "esri/renderers/ClassBreaksRenderer",

        "esri/layers/GraphicsLayer",
        "esri/SpatialReference",
        "esri/dijit/PopupTemplate",
        "esri/geometry/Point",
        "esri/geometry/webMercatorUtils",

        "extras/ClusterLayer",

        "dijit/layout/BorderContainer", 
        "dijit/layout/ContentPane", 
        "dojo/domReady!"
      ], function(
        parser, ready, arrayUtils, Color, domStyle, query,
        Map, esriRequest, Graphic, Extent,
        SimpleMarkerSymbol, SimpleFillSymbol, PictureMarkerSymbol, ClassBreaksRenderer,
        GraphicsLayer, SpatialReference, PopupTemplate, Point, webMercatorUtils,
        ClusterLayer
      )
*/

/*
map.addLayer(facilitiesGraphicsLayer);
        
        facilitiesGraphicsLayer.add(new Graphic(new Point(-13625960,4549921,map.spatialReference)));
        facilitiesGraphicsLayer.add(new Graphic(new Point(-13626184,4549247,map.spatialReference)));        

        var facilities = new FeatureSet();
        facilities.features = facilitiesGraphicsLayer.graphics;
        
        params.facilities = facilities;
        params.outSpatialReference = map.spatialReference;
 
*/
/*
      function requestSucceeded(response, io) {
        //loop through the items and add to the feature layer
        var features = [];
        array.forEach(response.items, function(item) {
          var attr = {};
          attr["description"] = item.description;
          attr["title"] = item.title ? item.title : "Flickr Photo";

          var geometry = new Point(item);

          var graphic = new Graphic(geometry);
          graphic.setAttributes(attr);
          features.push(graphic);
        });

        featureLayer.applyEdits(features, null, null);
      }

*/
/*
      var map = new WebMap({      
          portalItem: { // autocasts as new PortalItem()
            id: "e691172598f04ea8881cd2a4adaa45ba"
          }
      });
*/
/*
        // Set the extent on the view
        view.extent = new Extent({
          xmin: -9177882,
          ymin: 4246761,
          xmax: -9176720,
          ymax: 4247967,
          spatialReference: {
            wkid: 102100
        }
        */ 
      //view.padding.right = 220; //do not work
      // Remove the default widgets
      //mapView.ui.components = [];
/*
 //no muestra el punto 
  didInsertElement () {
    //alert('entre al didInsertElement !');
    this._super(...arguments);    
    // load the map modules
    // version 3.20compact si jala y utiliza un basemap vectorial no usa Mapview
    //this.get('esriLoader').loadModules(['esri/map', 'esri/layers/VectorTileLayer']).then(modules => {
    //const [Map, VectorTileLayer] = modules;
      
    this.get('esriLoader').loadModules(['esri/map', 'esri/graphic', 'esri/geometry/Point', 'esri/symbols/SimpleMarkerSymbol', 'esri/layers/GraphicsLayer', 'esri/renderers/SimpleRenderer']).then(modules => {
      const [Map, Graphic, Point, SimpleMarkerSymbol, GraphicsLayer, SimpleRenderer] = modules;
    
      //alert('entre al esriLoader en esri-map !');
            // create a map at the DOM node      
      this._map = new Map(this.elementId, {
        basemap: "satellite", //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray'
        //container: 'app-container',
        //center: [2.3508, 48.8567], // longitude, latitude Paris
        center: [-97.8456, 22.2644], // longitude, latitude Tampico
        zoom: 16
      }),

      this._map.on("load", function(evtObj) {        
        var map = evtObj.target;
        // Create a symbol for drawing the point
        var markerSymbol = new SimpleMarkerSymbol({
          color: [226, 119, 40],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 5
          }
        });
        //alert('markerSymbol: ' +  markerSymbol);
        var point = new Point({
          longitude: -97.90,  
          latitude: 22.30
        });
        //alert('point: ' +  point);
        var facilitiesGraphicsLayer = new GraphicsLayer();
        //alert('facilitiesGraphicsLayer: ' +  facilitiesGraphicsLayer);
        var facilityRenderer = new SimpleRenderer(markerSymbol);
        //alert('facilityRenderer: ' +  facilityRenderer);
        facilitiesGraphicsLayer.setRenderer(facilityRenderer);
        //alert('facilitiesGraphicsLayer: ' +  facilitiesGraphicsLayer);
        facilitiesGraphicsLayer.add(point);        
        map.addLayer(facilitiesGraphicsLayer);              
    })
   })
  }  
});      

*/

/*
todo lo siguiente jala con la version 4.4


  didInsertElement () {
    //alert('entre al didInsertElement !');
    this._super(...arguments);    
    // load the map modules
    // version 3.20compact si jala y utiliza un basemap vectorial no usa Mapview
    //this.get('esriLoader').loadModules(['esri/map', 'esri/layers/VectorTileLayer']).then(modules => {
    //const [Map, VectorTileLayer] = modules;
      
      this.get('esriLoader').loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic', 'esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/Polygon', 'esri/symbols/SimpleLineSymbol', 'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/SimpleFillSymbol']).then(modules => {
      const [Map, MapView, Graphic, Point, Polyline, Polygon, SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol] = modules;      
      //alert('entre al esriLoader en esri-map !');
                  
      //var viewNode = document.getElementById("viewDiv");        

      // Create a point graphic //
      var point = new Point({
        longitude: -49.97,
        latitude: 41.73
      });

      // Create a symbol for drawing the point
      var markerSymbol = new SimpleMarkerSymbol({
        color: [226, 119, 40],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      });

      // Create a graphic and add the geometry and symbol to it
      var pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });

       // Create a polyline graphic       
        // Create a line geometry with the coordinates of the line
      var polyline = new Polyline({
        paths: [
            [-111.30, 52.68],
            [-98, 49.5],
            [-93.94, 29.89]
          ]
      });    
      // Create a simple line symbol for rendering the line in the view
      var lineSymbol = new SimpleLineSymbol({
        color: [226, 119, 40],  // RGB color values as an array
        width: 4
      });
    
      // Create a simple object containing useful information relating to the feature
      var lineAtt = {
        Name: 'Keystone Pipeline',  // The name of the pipeline
        Owner: 'TransCanada',  // The owner of the pipeline
        Length: '3,456 km'  // The length of the pipeline
      };
    
      // Create the graphic
      var polylineGraphic = new Graphic({
        geometry: polyline,   // Add the geometry created in step 4
        symbol: lineSymbol,   // Add the symbol created in step 5
        attributes: lineAtt,   // Add the attributes created in step 6
        popupTemplate: {
          title: "{Name}",
          content: [{
            type: "fields",
            fieldInfos: [{
              fieldName: "Name"
            }, {
              fieldName: "Owner"
            }, {
              fieldName: "Length"
            }]
          }]
      }
    });
 
    //Create a polygon graphic
      // Create a polygon geometry
      var polygon = new Polygon({
        rings: [
          [-64.78, 32.3],
          [-66.07, 18.45],
          [-80.21, 25.78],
          [-64.78, 32.3]
        ]
      });

      // Create a symbol for rendering the graphic
      var fillSymbol = new SimpleFillSymbol({
        color: [227, 139, 79, 0.8],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 1
        }
      });

      // Add the geometry and symbol to a new graphic
      var polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: fillSymbol
      });

      var map = new Map({
        basemap: 'hybrid',  //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray'
        ground: "world-elevation"          
      });     

      var view = new MapView({
        //center: [-80, 35],
        //center: [2.3508, 48.8567], // longitude, latitude Paris
        //center: [-97.8456, 22.2644], // longitude, latitude Tampico
        //container: 'app-container',
        map: map,
        container: 'viewDiv',        
        //zoom: 3,
        //size: [400, 800]
        
      });      

      view.then(function() {
        view.goTo({
          center: [-97, 22],
          //scale: 200000,
          //size: [600, 800], //parece que genera un error que inhibe todo
          zoom: 3
          //heading: 200,
          //tilt: 60
        }, {
            //animate: false
        });
        view.padding.right = 310; // Same value as the #sidebar width in CSS
        
        view.graphics.add(pointGraphic);  //si jalan dentro de la funcion
        view.graphics.add(polylineGraphic);
        view.graphics.add(polygonGraphic);        
      });

        //view.graphics.add(pointGraphic); si jalan fuera de la funcion
        //view.graphics.add(polylineGraphic);
        //view.graphics.add(polygonGraphic);
      
   })
  }  
});      

*/

/*
//todo lo siguiente jala con la version 3.20compact y 3.21

// once we have a DOM node to attach the map to...
  didInsertElement () {
    this._super(...arguments);
    // load the map modules
    this.get('esriLoader').loadModules(['esri/map', 'esri/layers/VectorTileLayer']).then(modules => {
      const [Map, VectorTileLayer] = modules;
      //alert('entre al esriLoader en esri-map !');
      // create a map at the DOM node
      this._map = new Map(this.elementId, {
        //center: [2.3508, 48.8567], // longitude, latitude Paris
        center: [-97.8456, 22.2624], // longitude, latitude Tampico
        zoom: 3,
        size: [600, 800]
      });

      //var vtlayer = new VectorTileLayer('https://basemaps.arcgis.com/b2/arcgis/rest/services/World_Basemap/VectorTileServer');
      var vtlayer = new VectorTileLayer('https://www.arcgis.com/sharing/rest/content/items/bf79e422e9454565ae0cbe9553cf6471/resources/styles/root.json');
      this._map.addLayer(vtlayer);
    });
  },

  // destroy the map before this component is removed from the DOM
  willDestroyElement () {
    if (this._map) {
      this._map.destroy();
      delete this._map;
    }
  }
});
*/
/*
  //todo lo siguiente jala con la version 3.21
  didInsertElement () {
    this._super(...arguments);
    // load the map modules
    this.get('esriLoader').loadModules(['esri/map', 'esri/basemaps']).then(modules => {
      const [Map, esriBasemaps] = modules;
      //alert('entre al esriLoader en esri-map !');
      esriBasemaps.delorme = {
        baseMapLayers: [{url: "https://services.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer"}
        ],
        thumbnailUrl: "https://www.example.com/images/thumbnail_2014-11-25_61051.png",
        title: "Delorme"
      };
      // create a map at the DOM node
      this._map = new Map(this.elementId, {
        basemap: "hybrid",   // "national-geographic" "delorme" "oceans" "osm" "satellite" "streets" "streets-navigation-vector" 
                                  // "streets-night-vector" "streets-relief-vector" "streets-vector" "terrain" "topo" "topo-vector"
                                  // "dark-gray" "dark-gray-vector" "gray" "gray-vector" "hybrid"
        center: [-111.879655861, 40.571338776], // long, lat
        zoom: 13,
        sliderStyle: "small"
      });
    });
  },
});   
*/

/*
The component's lifecycle

On Initial Render
init
didReceiveAttrs
willRender
didInsertElement
didRender

On Re-Render
didUpdateAttrs
didReceiveAttrs
willUpdate
willRender
didUpdate
didRender

On Component Destroy
willDestroyElement
willClearRender
didDestroyElement
*/

/*
ejemplo funcional 3.21
  myPropertyChanged: function() {
      this.willDestroyElement();   
      this.get('esriLoader').loadModules(['esri/map', 'esri/graphic', 'esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/Polygon', 'esri/symbols/SimpleLineSymbol', 'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/SimpleFillSymbol', 'esri/layers/GraphicsLayer', 'esri/SpatialReference', 'esri/Color', 'esri/geometry/Circle', 'esri/units', 'esri/dijit/Scalebar', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/Extent']).then(modules => {
      const [Map, Graphic, Point, Polyline, Polygon, SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol, GraphicsLayer, SpatialReference, Color, Circle, Units, Scalebar, PictureMarkerSymbol, Extent] = modules;            

      var startExtent = new Extent(-95.271, 38.933, -95.228, 38.976, new SpatialReference({ wkid:4326 }) );
      //var startExtent = new Extent(-97.8486, 22.2604, -97.843, 22.2631, new SpatialReference({ wkid:4326 }) ); // mi home extent      

      this._map = new Map(this.elementId, {
        //center: [2.3508, 48.8567], // longitude, latitude Paris                 
        basemap: 'hybrid',  //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray' "gray", "oceans", "osm", "national-geographic"
        //center: [-97.8456, 22.2624], // longitude, latitude Tampico
        //extent: startExtent,
        zoom: 3
      });
      this._map.setExtent(startExtent);

      var scalebar = new Scalebar({
        map: this._map,
        attachTo: 'bottom-left',
        scalebarUnit: 'metric' //'metric' 'dual' 'english'
      });
        
      // Create a point graphic //      
      var point = new Point([-49.97,41.73], new SpatialReference({ wkid:4326 }));
      var line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, 2);
      line.setColor(new Color([255, 0, 0, 1]));
      var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 6);
      markerSymbol.setColor(new Color([230, 0, 169, 0.84]));
      markerSymbol.setOutline(line);

      var markerPicture = new PictureMarkerSymbol();      
      markerPicture.setHeight(20);
      markerPicture.setWidth(20);
      markerPicture.setUrl("http://img3.wikia.nocookie.net/__cb20140427224234/caramelangel714/images/7/72/Location_Icon.png");

      var pointLayer = new GraphicsLayer();
      pointLayer.add(new Graphic(point, markerPicture));      
      
      // Create a polyline graphic               
      var polylineJson = {
        'paths': [[[-111.30, 52.68], [-98, 49.5], [-93.94, 29.89]]], 
        'spatialReference': {'wkid':4326}
      };
      var polyline = new Polyline(polylineJson);
    
      // Create a simple line symbol for rendering the line in the view
      var polylineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID).setWidth(2);
      polylineSymbol.setColor(new Color([255, 0, 0, 1]));

      var polylineLayer = new GraphicsLayer();
      polylineLayer.add(new Graphic(polyline, polylineSymbol));
 
      //Create a polygon graphic           
      var polygonJson  = {"rings":[[[-64.78, 32.3],[-66.07, 18.45],[-80.21, 25.78],
        [-64.78, 32.3]]],"spatialReference":{"wkid":4326 }};
      var polygon = new Polygon(polygonJson);

      var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
        new Color([255,0,0]), 1),new Color([255,255,0,0.25])
      );
      var polygonLayer = new GraphicsLayer();
      polygonLayer.add(new Graphic(polygon, sfs));

      //Create a circle graphic
      var centerPoint = new Point([-100.15,22.71], new SpatialReference({ wkid:4326 }));      
      var circle = new Circle({
        center: centerPoint,
        radius: 100,
        radiusUnit: Units.KILOMETERS //Units.MILES
      });
      var circleLayer = new GraphicsLayer();
      circleLayer.add(new Graphic(circle, sfs));
      
      this._map.addLayer(pointLayer);
      this._map.addLayer(polylineLayer);
      this._map.addLayer(polygonLayer);
      this._map.addLayer(circleLayer);               
   })   
    this.rerender();
  }.observes('updateSomething'),
*/

/*
  // whenever items change, update the map
  didUpdateAttrs () {
    alert("entre a didUpdateAttrs de esri-map.js y aun no se cuando jala ");

    //this.showItemsOnMap();
      this.get('esriLoader').loadModules(['esri/map', 'esri/graphic', 'esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/Polygon', 'esri/symbols/SimpleLineSymbol', 'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/SimpleFillSymbol', 'esri/layers/GraphicsLayer', 'esri/SpatialReference', 'esri/Color', 'esri/geometry/Circle', 'esri/units', 'esri/dijit/Scalebar', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/Extent']).then(modules => {
      const [Map, Graphic, Point, Polyline, Polygon, SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol, GraphicsLayer, SpatialReference, Color, Circle, Units, Scalebar, PictureMarkerSymbol, Extent] = modules;      
      //alert('entre al esriLoader en esri-map !');

      var startExtent = new Extent(-95.271, 38.933, -95.228, 38.976, new SpatialReference({ wkid:4326 }) );
      //var startExtent = new Extent(-97.8486, 22.2604, -97.843, 22.2631, new SpatialReference({ wkid:4326 }) ); // mi home extent      

      this._map = new Map(this.elementId, {
        //center: [2.3508, 48.8567], // longitude, latitude Paris                 
        basemap: 'hybrid',  //basemap: "streets" "satellite" "hybrid" "topo" 'dark-gray' "gray", "oceans", "osm", "national-geographic"
        //center: [-97.8456, 22.2624], // longitude, latitude Tampico
        //extent: startExtent,
        zoom: 3
      });
      this._map.setExtent(startExtent);

      var scalebar = new Scalebar({
        map: this._map,
        attachTo: 'bottom-left',
        scalebarUnit: 'metric' //'metric' 'dual' 'english'
      });
        
      // Create a point graphic //      
      var point = new Point([-49.97,41.73], new SpatialReference({ wkid:4326 }));
      var line = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, 2);
      line.setColor(new Color([255, 0, 0, 1]));
      var markerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 6);
      markerSymbol.setColor(new Color([230, 0, 169, 0.84]));
      markerSymbol.setOutline(line);

      var markerPicture = new PictureMarkerSymbol();      
      markerPicture.setHeight(20);
      markerPicture.setWidth(20);
      markerPicture.setUrl("http://img3.wikia.nocookie.net/__cb20140427224234/caramelangel714/images/7/72/Location_Icon.png");

      var pointLayer = new GraphicsLayer();
      pointLayer.add(new Graphic(point, markerPicture));      
      
      // Create a polyline graphic               
      var polylineJson = {
        'paths': [[[-111.30, 52.68], [-98, 49.5], [-93.94, 29.89]]], 
        'spatialReference': {'wkid':4326}
      };
      var polyline = new Polyline(polylineJson);
    
      // Create a simple line symbol for rendering the line in the view
      var polylineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID).setWidth(2);
      polylineSymbol.setColor(new Color([255, 0, 0, 1]));

      var polylineLayer = new GraphicsLayer();
      polylineLayer.add(new Graphic(polyline, polylineSymbol));
 
      //Create a polygon graphic           
      var polygonJson  = {"rings":[[[-64.78, 32.3],[-66.07, 18.45],[-80.21, 25.78],
        [-64.78, 32.3]]],"spatialReference":{"wkid":4326 }};
      var polygon = new Polygon(polygonJson);

      var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
        new Color([255,0,0]), 1),new Color([255,255,0,0.25])
      );
      var polygonLayer = new GraphicsLayer();
      polygonLayer.add(new Graphic(polygon, sfs));

      //Create a circle graphic
      var centerPoint = new Point([-100.15,22.71], new SpatialReference({ wkid:4326 }));      
      var circle = new Circle({
        center: centerPoint,
        radius: 100,
        radiusUnit: Units.KILOMETERS //Units.MILES
      });
      var circleLayer = new GraphicsLayer();
      circleLayer.add(new Graphic(circle, sfs));
/*
      mapOnLoad = this._map.on("load", () => {
        //alert("entre al mapOnLoad !! ");
         //this._map.disableScrollWheelZoom(); //si jalo
        // let the rest of the app know that the map is available
        this.trigger('load');
        this._map.graphics.on("click", myClickHandler);
      });
*//*
      function myClickHandler(event) {
        alert("User clicked at " +
          event.screenPoint.x + ", " + event.screenPoint.y +
          " on the screen. The map coordinate at this point is " +
          event.mapPoint.x + ", " + event.mapPoint.y        
        );
        alert("User clicked on " + event.graphic);
      };

      //mapOnLoad = this._map.on("load", configNavigation); // no jalo
      //this._map.on("click", myClickHandler); // no jalo
      
      this._map.addLayer(pointLayer);
      this._map.addLayer(polylineLayer);
      this._map.addLayer(polygonLayer);
      this._map.addLayer(circleLayer);

      //this._map.on("load", function (){
        //this._map.addLayer(pointLayer);
        //this._map.addLayer(polylineLayer);
        //this._map.addLayer(polygonLayer);
      //})           
   })
   
    //this.rerender();
  },
*/

/*
countiesFeatureLayer.queryFeatures(query, function (featureSet){
      var polygon = featureSet.features[0].geometry;
      // populate the Geometry cache by calling getExtent()
      var polygonExtent = polygon.getExtent();
      console.log("polygonExtent", polygonExtent);
      console.log("polygon.cache._extent", polygon.cache._extent);

      for (var i = 0; i < featureSet.features.length; i  ) {
        var feature = featureSet.features[i];
        console.log("Polygon geometry cache, %o", feature.geometry.cache);
        feature.geometry.clearCache();
        console.log("Polygon geometry clear cache, %o", feature.geometry.cache);
        // Break out of the loop after the first result
        break;
      }
    });

*/

/* 
// para dibujar
require([
  "esri/toolbars/draw", "esri/graphic", ... 
], function(Draw, Graphic, ... ) {
  function createToolbar(map) {
    var toolbar = new Draw(map);
    toolbar.on("draw-end", addToMap);
  }
  function addToMap(evt) {
    var graphic = new Graphic(evt.geometry, symbol);
    map.graphics.add(graphic);
  }
  ...
});
*/