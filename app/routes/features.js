import Ember from 'ember';
   
export default Ember.Route.extend({
  
  controllerName: 'features',
  model(params) {
    return Ember.RSVP.hash({
          feature: this.store.findRecord('feature', params.feature_id),    
          figures: [
                      {id: 'Punto', name: 'Punto'},
                      {id: 'Línea', name: 'Línea'},
                      {id: 'Polígono', name: 'Polígono'},
                      {id: 'Elipse', name: 'Elipse'},
                      {id: 'Rectángulo', name: 'Rectángulo'}
                  ],
    });
},
  /* cuando el modelo viene de aqui mismo el return es en plural
  model() {
    return features;
  }  
  */
  setupController: function(controller,model) {      
      // Call _super for default behavior 
      this._super(controller, model);
      // Implement your custom setup after                                              
      controller.set('model', model);   //esta pasa el modelo al controlador pero parece inecesario
      // or first item only
      //controller.set('model', model.get('firstObject'));      
  }, 

  actions: {
    updateFeature(feature, params) {
      //alert("entre al update superior");      
      //update feature
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          feature.set(key,params[key]);
        }
      });
      feature.save();
      this.transitionTo('inprojects');                  
    },          
    destroyFeature(feature) {
      //alert("entre al destroyFeature de features.js");      
      var mobil_deletions = feature.get('mobils').map(function(mobil) {
        return mobil.destroyRecord();
      });
      Ember.RSVP.all(mobil_deletions).then(function() {
        return feature.destroyRecord();
      });
      this.transitionTo('inprojects');
    },        
    saveMobil(params) {
      var newMobil = this.store.createRecord('mobil', params);
      var feature = params.feature;
      feature.get('mobils').addObject(newMobil);
      newMobil.save().then(function() {
        return feature.save();
      });      
      this.transitionTo('features', feature.feature.id);
    },
    updateMobil(mobil, params) {
      //alert("entre al update superior");      
      //update feature
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          mobil.set(key,params[key]);
        }
      });
      mobil.save();      
      this.transitionTo('mobils', params.mobil.feature.feature_id);            
    },
    destroyMobil(mobil) {
      mobil.destroyRecord();
      //this.transitionTo('features', mobil.feature.id);
      this.transitionTo('features', feature.feature.id);
    }, 
  }  
});

