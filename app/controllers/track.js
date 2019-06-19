import Ember from 'ember';

export default Ember.Controller.extend({

  data: Ember.computed.alias('model'),  // esta recibe el modelo del route                           
  
  sortedTracks: Ember.computed.sort('data.tracks', '_trackSort'), 
  _trackSort: ['name'],      
         
  actions: {
              
  }    
});
