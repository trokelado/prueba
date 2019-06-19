import Ember from 'ember';

export default Ember.Route.extend({
model(params) {
    return this.store.findRecord('project', params.pro_id);
  },      
  actions: {
      saveShipment(params) {
      //alert("sii entre al saveFeature de projects.js ");           
      var newShipment = this.store.createRecord('shipment', params);
      var project = params.project;      
      project.get('shipments').addObject(newShipment);
      newShipment.save().then(function() {
        return project.save();
      });
      this.transitionTo('pro', project);
    },                                                  
  }  
});
