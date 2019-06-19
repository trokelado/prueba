import Ember from 'ember';

import firebase from 'firebase';

export default Ember.Route.extend({
  esriLoader: Ember.inject.service('esri-loader'),

  // this will be called only the first time the route is loaded
  init () {
    this._super(...arguments);
    // lazy load the JSAPI
    const esriLoader = this.get('esriLoader');
            
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

  controllerName: 'shipments',  //si direcciona
  model(params) {
          return Ember.RSVP.hash({
              shipment: this.store.findRecord('shipment', params.shipment_id),
              shipments: this.store.findAll('shipment'),
              //freights: this.store.findAll('freight'),
              tracks: this.store.findAll('track'),                                  
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
        updateShipment(shipment, params) {                  
            //alert("entre al updateSale de mobilsales.js");                  
            Object.keys(params).forEach(function(key) {
                if(params[key]!==undefined) {
                shipment.set(key,params[key]);
                }
            });
            shipment.save();      
            this.transitionTo('shipment');            
        },
        destroyShipment(shipment) {            
            shipment.destroyRecord();            
            this.transitionTo('shipment');
        },
        saveFreight(params) {
            //let shipment = this.controller.get('data.shipment');
            var shipment = params.shipment;            
            console.log('el shipment selecionado es: ' + shipment);
            var track = params.track;            
            console.log('el track selecionado es: ' + track);            
            shipment.get('tracks').addObject(track);
            console.log('aqui voy: ');
            track.get('shipments').addObject(shipment);
            console.log('aqui voy: ');
            shipment.save().then(function() {
                return track.save();
            });
            
            this.transitionTo('shipment', shipment);             
        },
        /*
            saveFreight(params) {
            //let shipment = this.controller.get('data.shipment');
            var shipment = params.shipment;
            alert('el shipment selecionado es: ' + shipment);
            var track = params.track;
            alert('el track selecionado es: ' + track);
            var newFreight = this.store.createRecord('freight', params);                                          
            shipment.get('freights').addObject(newFreight);
            track.get('freights').addObject(newFreight);
            newFreight.save().then(function() {
                return shipment.save() && track.save();
            });
            
            this.transitionTo('shipment', shipment);             
        },
        */
        updateFreight(freight, params) {                  
            //alert("entre al updateSale de mobilsales.js");
            let shipment = this.controller.get('data.shipment');                  
            Object.keys(params).forEach(function(key) {
                if(params[key]!==undefined) {
                freight.set(key,params[key]);
                }
            });
            freight.save();      
            this.transitionTo('shipment', shipment);            
        },
        destroyFreight(freight) {
            let shipment = this.controller.get('data.shipment');            
            freight.destroyRecord();            
            this.transitionTo('shipment', shipment);
        },       
        saveShipmentFreight(params) {
            /* //version uno no jala
            let shipment = this.controller.get('data.shipment');
            alert("el shipment es: " + shipment);
            let link = params.link;
            alert("el Freight es: " + link);
            var par = {
                shipment: shipment,
                link: link                
            };
            savePost = function(par) {      
                alert("entre al savePost");
                var promises = [];                                
                var linksOfShipment = par.shipment.get('links');
                var shipmentsOfFreight = par.link.get('shipments');                
                linksOfShipment.addObjects(link);
                shipmentsOfFreight.addObject(shipment);
                
                promises.addObjects(shipment.save(), link.save());
                return Ember.RSVP.Promise.all(promises);   
            }, 
 
            this.transitionTo('shipment');
            */
//version dos no jala
            //alert("entre al saveShipmentFreight de la ruta shipments.js");
            /*            
            var shipment = this.controller.get('data.shipment');
            alert("el shipment es: " + shipment);
            var link = params.link;
            alert("el Freight es: " + link);
            savePost = function(shipment, link) {
            //shipment.get('links').addObject(link);
            //link.get('shipments').addObject(shipment);
            var promises = [];            
            shipment.get('links');
            link.get('shipments');
            promises.push(shipment, link);
            return Ember.RSVP.Promise.all(promises);
        }.then(function(arrayOfAttachedArrays) {
            alert("salve la primera parte !");
                var promises = [];
                var linksOfShipment = arrayOfAttachedArrays[0];
                var shipmentsOfFreight = arrayOfAttachedArrays[1];
                linksOfShipment.addObject(link);
                shipmentsOfFreight.addObject(shipment);
                promises.addObjects(link.save(),shipment.save());
                return Ember.RSVP.Promise.all(promises);
            });
            alert("salve la segunda parte !");
            */
            //shipment.addObject(link);
            //link.addObject(shipment);
            //promises.addObject(shipment.save(), link.save());
            //return Ember.RSVP.Promise.all(promises);                        
            //this.transitionTo('shipment');         

 /*   //version tres no jala
            let currentShipment = this.controller.get('data.shipment');
            console.log("el shipment es: " + currentShipment);
            let currentFreight = params.link;
            console.log("el Freight es: " + currentFreight);
            var links = currentShipment.get('links').then(function (loslinks) {
                console.log("los Freights son: " + loslinks);
                loslinks.addObject(currentFreight);
                console.log("los FreightsB son: " + loslinks);
                loslinks.save().then(savedFreight => {
                    console.log("salve la primera parte !");
                    var shipments = currentFreight.get('shipments').addObject(currentShipment);
                    shipments.save().then(savedShipment => {
                        alert("salve la segunda parte !");    
                    });            
                });  
            })            
*/
        },
    }  
});
