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

  controllerName: 'tracks',  //si direcciona
  model(params) {
          return Ember.RSVP.hash({
              track: this.store.findRecord('track', params.track_id),
              links: this.store.findAll('link'),
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
        updateTrack(track, params) {                  
            //alert("entre al updateSale de mobilsales.js");                  
            Object.keys(params).forEach(function(key) {
                if(params[key]!==undefined) {
                track.set(key,params[key]);
                }
            });
            track.save();      
            this.transitionTo('track');            
        },
        destroyTrack(track) {            
            track.destroyRecord();            
            this.transitionTo('track');
        },
        saveLink(params) {
            let track = this.controller.get('data.track');
            var newLink = this.store.createRecord('link', params);
            track.get('links').addObject(newLink);
            newLink.save().then(function() {
                return track.save();
            });
            
            this.transitionTo('track', track);             
        },
        updateLink(link, params) {                  
            //alert("entre al updateSale de mobilsales.js");
            let track = this.controller.get('data.track');                  
            Object.keys(params).forEach(function(key) {
                if(params[key]!==undefined) {
                link.set(key,params[key]);
                }
            });
            link.save();      
            this.transitionTo('track', track);            
        },
        destroyLink(link) {
            let track = this.controller.get('data.track');            
            link.destroyRecord();            
            this.transitionTo('track', track);
        },       
        saveTrackLink(params) {
            /* //version uno no jala
            let track = this.controller.get('data.track');
            alert("el track es: " + track);
            let link = params.link;
            alert("el Link es: " + link);
            var par = {
                track: track,
                link: link                
            };
            savePost = function(par) {      
                alert("entre al savePost");
                var promises = [];                                
                var linksOfTrack = par.track.get('links');
                var tracksOfLink = par.link.get('tracks');                
                linksOfTrack.addObjects(link);
                tracksOfLink.addObject(track);
                
                promises.addObjects(track.save(), link.save());
                return Ember.RSVP.Promise.all(promises);   
            }, 
 
            this.transitionTo('track');
            */
//version dos no jala
            //alert("entre al saveTrackLink de la ruta tracks.js");
            /*            
            var track = this.controller.get('data.track');
            alert("el track es: " + track);
            var link = params.link;
            alert("el Link es: " + link);
            savePost = function(track, link) {
            //track.get('links').addObject(link);
            //link.get('tracks').addObject(track);
            var promises = [];            
            track.get('links');
            link.get('tracks');
            promises.push(track, link);
            return Ember.RSVP.Promise.all(promises);
        }.then(function(arrayOfAttachedArrays) {
            alert("salve la primera parte !");
                var promises = [];
                var linksOfTrack = arrayOfAttachedArrays[0];
                var tracksOfLink = arrayOfAttachedArrays[1];
                linksOfTrack.addObject(link);
                tracksOfLink.addObject(track);
                promises.addObjects(link.save(),track.save());
                return Ember.RSVP.Promise.all(promises);
            });
            alert("salve la segunda parte !");
            */
            //track.addObject(link);
            //link.addObject(track);
            //promises.addObject(track.save(), link.save());
            //return Ember.RSVP.Promise.all(promises);                        
            //this.transitionTo('track');         

 /*   //version tres no jala
            let currentTrack = this.controller.get('data.track');
            console.log("el track es: " + currentTrack);
            let currentLink = params.link;
            console.log("el Link es: " + currentLink);
            var links = currentTrack.get('links').then(function (loslinks) {
                console.log("los Links son: " + loslinks);
                loslinks.addObject(currentLink);
                console.log("los LinksB son: " + loslinks);
                loslinks.save().then(savedLink => {
                    console.log("salve la primera parte !");
                    var tracks = currentLink.get('tracks').addObject(currentTrack);
                    tracks.save().then(savedTrack => {
                        alert("salve la segunda parte !");    
                    });            
                });  
            })            
*/
        },
    }  
});
