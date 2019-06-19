import Ember from 'ember';
//import layout from '../templates/components/esri-map';

export default Ember.Component.extend({    
  store: Ember.inject.service('store'),
  //src: { src: 'http://vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
  //modea: Ember.String.w('Consultar Navegar Agregar'),
  //modeb: Ember.String.w('Consultar Navegar'),  

  sortedBasemaps: Ember.computed.sort('model.basemaps', '_basemapSort'),
  _basemapSort: ['name'],
  //_basemapSort: ['name:desc']
  //sortedProjects: Ember.computed.sort('model.projects', '_projectSort'),
  //_projectSort: ['name'],
  //_projectSort: ['name:desc']  
  sortedModes: Ember.computed.sort('mode', '_modeSort'),
  _modeSort: ['name'],
  //_modeSort: ['name:desc']
  sortedFigures: Ember.computed.sort('model.figures', '_figureSort'),
  _figureSort: ['name'],
  //_figureSort: ['name:desc']          
  sortedFeatures: Ember.computed.sort('selectedFeatures', '_featureSort'),
  _featureSort: ['name'],
  //_featureSort: ['name:desc']    
  sortedMobils: Ember.computed.sort('filteredMobils', '_mobilSort'),
  _mobilSort: ['name'],
  //_mobilSort: ['name:desc']
  sortedDocs: Ember.computed.sort('selectedDocs', '_docSort'),
  _docSort: ['docNname'],
  //_mobilSort: ['name:desc']

  isAddModeVisible: function() {
    let rol = this.get('rol');
    //alert('el rol es: ' + rol);
    if(rol === 'Administrador' || rol === 'Operador') {
      let mode = this.get('model.modes');
      this.set('mode', mode);
      return true;
    }
      let mode = this.get('model.modesb');
      this.set('mode', mode);
     return false;   
    }.property('rol'),  

  matchTriggerWidth: true,
  updateMap: false,
  startDraw: false,
  pauseDraw: false,
  saveDraw: false,
  quitDraw: false,  
  clearLayer: false,
  isShowVisible: false,
  isDrawVisible: false,
  isSelectVisible: false,
  isDocVisible: false,
  selectedProject: null,
  selectedToyProject: null,
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
  firstJson: null,
  acumJson: null,
  deleteJsonFlag: false,  
   
  actions: {
    chooseBasemap(basemap) {
     //alert("entre al chooseBasemap de header-map.js component !");
      this.set('selectedBasemap', basemap);                       
    },

    chooseProject(toyproject) {
     //alert("entre al chooseProject de header-map.js component !" + project);     
     let proyecto = toyproject.get('project');
     //alert("proyecto es: " + proyecto);      
      this.set('selectedToyProject', toyproject);
      let project = this.get('store').peekRecord('project', proyecto);
      this.set('selectedProject', project); 
      var filteredFeatures = project.get('features');
      this.set('filteredFeatures', filteredFeatures);
      this.set('filteredMobils', null);
      this.set('selectedMode', null);
      this.set('selectedFigure', null);
      this.set('selectedFeature', null);
      this.set('selectedMobil', null);
      this.set('isDocVisible', false);      
      this.set('isDrawVisible', false);
      this.set('isShowVisible', false);
      this.set('isSelectVisible', false);
      this.set('startDraw', false);      
    },

    chooseMode(mode) {           
      this.set('selectedMode', mode);
      this.set('selectedFigure', null);
      this.set('selectedFeature', null);
      this.set('selectedMobil', null);
      this.set('isDocVisible', false);
      this.set('startDraw', false);            
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
      //alert("entre al chooseFigure de header-map.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);
      //var selectedFeatures = this.get('store').peekAll('feature').filterBy('figure', figure.id); //esta opcion mezcla los features de un proyecto
      var selectedFeatures = this.get('filteredFeatures').filterBy('figure', figure.id);             
      this.set('selectedFeatures', selectedFeatures);
      this.set('selectedFeature', null);
      this.set('selectedMobil', null);
      this.set('isDocVisible', false);                             
    },

    chooseFeature(feature) {
     //alert("entre al chooseFeature de infeatures.js"+feature);
      this.set('selectedFeature', feature);
      //alert("entre al chooseFeature de infeatures.js y seleccione: " + feature);
      var filteredMobils = feature.get('mobils');
      this.set('filteredMobils', filteredMobils);
      //let placeholder = 'Escoja un componente';
      this.set('selectedMobil', null);
      this.set('isDocVisible', false);      
      //let participante = filteredMobils.get('firstObject');      
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
        this.set('isPower', false);
        console.log('ahora Toy en el closeModalDialog de header-map component !');
    },

    showModalDialog(message) {
      //alert("entre al showModalDialog de header-map.js");
      //console.log('ahora Toy en el showModalDialog de header-map component !');
      console.log("entre al showModalDialog de header-map.js el mensaje es: " + message);      
      let m = message.search("isImage");
      if (m > -1) {
        this.set('modalMessage', message.substring(0, m));
        console.log("modalMessage es: " + message.substring(0, m));
        this.set('isImage', true);
        this.set('myPath', message.substring(m + 7));
        console.log("myPath es: " + message.substring(m + 7));        
        //alert("el path es: " + message.substring(m + 7));
        this.set('isShowModal', true);
        return;        
      }
      m = message.search("isPdf");
      if (m > -1) {
        this.set('modalMessage', message.substring(0, m));
        console.log("modalMessage es: " + message.substring(0, m));
        this.set('isPdf', true);
        this.set('myPath', message.substring(m + 5));
        console.log("myPath es: " + message.substring(m + 5));        
        //alert("el path es: " + message.substring(m + 5));
        this.set('isShowModal', true);
        return;        
      }
      m = message.search("isVideo");
      if (m > -1) {
        this.set('modalMessage', message.substring(0, m));
        console.log("modalMessage es: " + message.substring(0, m));
        this.set('isVideo', true);
        this.set('myPath', message.substring(m + 7));
        console.log("myPath es: " + message.substring(m + 7));                
        this.set('isShowModal', true);
        return;        
      } 
      m = message.search("isPower");
      if (m > -1) {
        this.set('modalMessage', message.substring(0, m));
        console.log("modalMessage es: " + message.substring(0, m));
        this.set('isPower', true);
        this.set('myPath', message.substring(m + 7));
        console.log("myPath es: " + message.substring(m + 7));                
        this.set('isShowModal', true);
        return;        
      }                                             
    },

    startDraw() {            
      let draw = this.get('startDraw');
      if(draw) {
        this.set('startDraw', false);
      } else {
        this.set('startDraw', true);
      }                 
    },

    pauseDraw() {
      let draw = this.get('startDraw');
      if(draw) {
        this.set('startDraw', false);
      } 
      let pause = this.get('pauseDraw');
      if(pause) {
        this.set('pauseDraw', false);
      } else {
        this.set('pauseDraw', true);
      }      
    },

    saveDraw() {
      this.set('deletePreviousJson', true);             
      let save = this.get('saveDraw');
      if(save) {
        this.set('saveDraw', false);
      } else {
        this.set('saveDraw', true);
      }           
    },

    quitDraw() {
      this.set('deletePreviousJson', true);                               
    },

    savePoint(params) {
      //alert("entre al savePoint de header-map.js");      
      this.sendAction('savePoint', params);      
    },
    savePolygon(params) {
      //alert("entre al savePoint de header-map.js");      
      this.sendAction('savePolygon', params);      
    },
    saveLine(params) {
      //alert("entre al savePoint de header-map.js");      
      this.sendAction('saveLine', params);      
    },
    saveEllipse(params) {
      //alert("entre al savePoint de header-map.js");      
      this.sendAction('saveEllipse', params);      
    }, 
  }  
});