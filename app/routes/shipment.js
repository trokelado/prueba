import Ember from 'ember';

import firebase from 'firebase';

export default Ember.Route.extend({  

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

  controllerName: 'shipment',  //si direcciona
  model(params) {
          return Ember.RSVP.hash({
              project: this.store.findRecord('project', params.project),      
              shipments: this.store.findAll('shipment'),
              projects: this.store.findAll('project'),              
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
        saveShipment(params) {      
            //alert("entre al saveTrack de la ruta track.js");
            let project = this.controller.get('project');            
            alert("entre al saveShipment el project es: " + project);      
            var newShipment = this.store.createRecord('shipment', params);
            project.get('shipments').addObject(newShipment);                              
            newShipment.save().then(function() {
                return project.save();
            });                
            this.transitionTo('shipment');        
        },    
    }  
});
