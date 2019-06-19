import Ember from 'ember';

export default Ember.Controller.extend({
    data: Ember.computed.alias('model'),  // esta recibe el modelo del route                           
  
    sortedShipments: Ember.computed.sort('data.shipments', '_shipmentSort'), 
    _shipmentSort: ['name'],      
            
    actions: {
                
    }    
});
