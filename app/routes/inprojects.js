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

  controllerName: 'inprojects',  //si direcciona
  model() {
          return Ember.RSVP.hash({      
              projects: this.store.findAll('project'),
              toyprojects: this.store.findAll('toyproject'),
              toys: this.store.findAll('toy')            
          });
      },

    setupController: function(controller,model) {
      //controller.setProperites(model);
      //you can do anything with controller and model instance
      // Call _super for default behavior findRecord
      this._super(controller, model);
      // Implement your custom setup after      
      var uid = this.get('uid');
      controller.set('uid', uid); //esta pasa el uid al controlador es requerido      
      //alert('toy en el setupController uid: ' + uid);                                  
      controller.set('model', model);   //esta pasa el modelo al controlador pero parece inecesario
      // or first item only
      //controller.set('model', model.get('firstObject'));      
    },   

    actions: {
      saveProject3(params) {
        var newProject = this.store.createRecord('project', params);
        newProject.save();
        this.transitionTo('inprojects');
      },
      goToParticipants() {
        //alert("sii entre al saveFeature de projects.js ");            
        this.transitionTo('intoys');
      },
      goToRols() {
        //alert("sii entre al saveFeature de projects.js ");            
        this.transitionTo('inrols');
      },       
    }  
});

