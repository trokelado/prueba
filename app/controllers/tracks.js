import Ember from 'ember';

export default Ember.Controller.extend({
    data: Ember.computed.alias('model'),  // esta recibe el modelo del route                           
  
    sortedLinks: Ember.computed.sort('data.links', '_linkSort'), 
    _linkSort: ['name'],      
            
    actions: {
                
    }
})    
