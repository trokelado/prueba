import Ember from 'ember';
import firebase from 'firebase';

export default Ember.Route.extend({
esriLoader: Ember.inject.service('esri-loader'),

  // this will be called only the first time the route is loaded
  init () {
    this._super(...arguments);
    // lazy load the JSAPI
    const esriLoader = this.get('esriLoader');
            // NOTE: to use a version other than the latest  4.x release
            // pass the url in the options argument to load()
            //alert('entre al lazy load the JSAPI en init maps.js !');
            //esriLoader.load({ url: 'https://js.arcgis.com/3.20compact' }).catch(err => {
            //esriLoader.load({ url: 'https://js.arcgis.com/3.21compact/' }).catch(err => {      
            //esriLoader.load({ url: 'https://js.arcgis.com/4.4/' }).catch(err => { puro batallar
            //cuando no se ponen parametros va a la version mas nueva      
      esriLoader.load({ url: 'https://js.arcgis.com/3.21/' }).catch(err => {
      //esriLoader.load().catch(err => { 
            // do something with the error
      alert('entre al error de lazy load the JSAPI en init maps.js !');
    });
  },
  beforeModel() {
      let user = firebase.auth().currentUser;
      if (user != null) {
        //usuario autenticado              
        let uid = user.uid;
        this.set('uid', uid);
        return uid;
      }
      else {
        //alert('No estoy autenticado');        
          this.transitionTo('login');
      } 
  },
  controllerName: 'map',  //si direcciona
     model() {            
      return Ember.RSVP.hash({
        features: this.store.findAll('feature'),
        mobils: this.store.findAll('mobil'),
        projects: this.store.findAll('project'),
        toyprojects: this.store.findAll('toyproject'),
        points: this.store.findAll('point'),
        lines: this.store.findAll('line'),
        polygons: this.store.findAll('polygon'),
        ellipses: this.store.findAll('ellipse'),
        docs: this.store.findAll('doc'),
        toys: this.store.findAll('toy'), 
        figures: [
                    {id: 'Punto', name: 'Punto'},
                    {id: 'Línea', name: 'Línea'},
                    {id: 'Polígono', name: 'Polígono'},
                    {id: 'Elipse', name: 'Elipse'},
                    {id: 'Rectángulo', name: 'Rectángulo'}
                ], 
        basemaps: [
                    {id: 'streets', name: 'Urbano'},
                    {id: 'satellite', name: 'Satelital'},
                    {id: 'hybrid', name: 'Hibrido'},
                    {id: 'topo', name: 'Topografico'},
                    {id: 'dark-gray', name: 'Gris obscuro'},
                    {id: 'gray', name: 'Gris claro'},
                    {id: 'oceans', name: 'Oceánico'},
                    {id: 'osm', name: 'Osm'},
                    {id: 'national-geographic', name: 'Nat.Geogra'}
                  ],
        modes: [
                    {id: 'Consultar', name: 'Consultar'},
                    {id: 'Navegar', name: 'Navegar'},
                    {id: 'Agregar', name: 'Agregar'}
                ],
        modesb: [
                    {id: 'Consultar', name: 'Consultar'},
                    {id: 'Navegar', name: 'Navegar'}
                ],
      });
    },

    setupController: function(controller,model) {
/*
        controller.set('features', model.features);
        controller.set('mobils', model.mobils);
        controller.set('projects', model.projects);
        controller.set('toyprojects', model.toyprojects);
        controller.set('points', model.points);
        controller.set('lines', model.lines);
        controller.set('polygons', model.polygons);
        controller.set('ellipses', model.ellipses);
        controller.set('docs', model.docs);
        controller.set('figures', model.figures); 
        controller.set('basemaps', model.basemaps);
        controller.set('modes', model.modes);
        */     
        // Call _super for default behavior 
        this._super(controller, model);
        // Implement your custom setup after
        var uid = this.get('uid');
        //alert('toy en el setupController del map route !')
        controller.set('uid', uid); //esta pasa el uid al controlador es requerido                                               
        controller.set('model', model);   //esta pasa el modelo al controlador pero parece inecesario
        // or first item only
        //controller.set('model', model.get('firstObject'));      
    },
    
    actions: {
      savePoint(params) {
        //alert("entre al savePoint de maps.js !");
        var newPoint = this.store.createRecord('point', params);
        var mobil = params.mobil;
        mobil.get('points').addObject(newPoint);            
        newPoint.save().then(function() {
          return mobil.save();
        });
        //this.transitionTo('mobils', mobil);
      },
      saveLine(params) {
        //alert("entre al saveLine de maps.js !");
        var newLine = this.store.createRecord('line', params);
        var mobil = params.mobil;
        mobil.get('lines').addObject(newLine);            
        newLine.save().then(function() {
          return mobil.save();
        });
        //this.transitionTo('mobils', mobil);
      },
      savePolygon(params) {
        //alert("entre al savePolygon de maps.js !");
        var newPolygon = this.store.createRecord('polygon', params);
        var mobil = params.mobil;
        mobil.get('polygons').addObject(newPolygon);            
        newPolygon.save().then(function() {
          return mobil.save();
        });
        //this.transitionTo('mobils', mobil);
      },
      saveEllipse(params) {
        //alert("entre al savePolygon de maps.js !");
        var newEllipse = this.store.createRecord('ellipse', params);
        var mobil = params.mobil;
        mobil.get('ellipses').addObject(newEllipse);            
        newEllipse.save().then(function() {
          return mobil.save();
        });
        //this.transitionTo('mobils', mobil);
      },
        showModal: function(name) {
            console.log("entre al showModal(" + name); // + ", " + model + ")")
            //this.controllerFor(name).set('model', model);
            this.render(name, {
                into: 'maps',
                outlet: 'modal'
                //model: model
            })
        },

        removeModal: function() {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'maps'
            });
        },
/*
      openModal: function(modalName, model) {
        console.log("usersroute.actions.openmodal(" + modalName + ", " + model + ")")
        this.controllerFor(modalName).set("model", model);
        return this.render(modalName, {
          into: "maps",
          outlet: "modal"
        });
      },
          
      closeModal: function() {
        return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'maps'
      });
    },
  */
//otra version
/*
    showModal(name, model) {
      console.log("entre al showModal(" + name + ", " + model + ")")
      this.controllerFor(name).set('model', model);
      this.render(name, {
        into: 'maps',
        outlet: 'modal',
        model: model
      })
    },
/*
    openModal: function(target) {
      alert("entre al openModal del route maps.js con el target: " + target);
      var modal = this.get('comp-' + target);
      modal.send('toggleModal');
    },
*/
/*
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'maps'
      });
    },
    */
      /*
      openModal: function(modalName, model) {
        console.log("usersroute.actions.openmodal(" + modalName + ", " + model + ")")
        this.controllerFor(modalName).set("model", model);
        return this.render(modalName, {
          into: "application",
          outlet: "modal"
        });
      },
      closeModal: function() {
        return this.disconnectOutlet({
          outlet: "modal",
          parentView: "application"
        });
      }
      */         
    }        
});
