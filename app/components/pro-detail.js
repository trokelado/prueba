import Ember from 'ember';

export default Ember.Component.extend({
    features: null,
    sortedShipments: Ember.computed.sort('project.shipments', '_shipmentSort'),
  _shipmentSort: ['name'],
actions: {
    
    destroyPoint(point) {
      this.sendAction('destroyPoint', point);
    },
    updatePoint(point, params) {
      //alert("entre al updatePoint de project-detail.js");      
        this.sendAction('updatePoint', point, params);      
    },     
  }
});


