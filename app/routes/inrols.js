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

  controllerName: 'intoys',  //si direcciona
model() {
        return Ember.RSVP.hash({                  
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
      updateToy(toy, params) {                  
        //alert("entre al updateSale de mobilsales.js");                  
        Object.keys(params).forEach(function(key) {
            if(params[key]!==undefined) {
            toy.set(key,params[key]);
            }
        });
        toy.save();        
        this.transitionTo('inrols');            
        },  
    }   
});


