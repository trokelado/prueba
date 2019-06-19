import Ember from 'ember';

export default Ember.Route.extend({
model(params) {
    return this.store.findRecord('project', params.project_id);
  },      
  actions: {
    updateProject3(project, params) {
      //alert("entre al update superior");      
      //update project
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          project.set(key,params[key]);
        }
      });
      project.save();
      this.transitionTo('inprojects');            
    },               
    destroyProject(project) {      
      var feature_deletions = project.get('features').map(function(feature) {
        return feature.destroyRecord();
      });
      Ember.RSVP.all(feature_deletions).then(function() {
        return project.destroyRecord();
      });
      this.transitionTo('inprojects');
    },           
    saveFeature(params) {
      //alert("sii entre al saveFeature de projects.js ");      
      var newFeature = this.store.createRecord('feature', params);
      var project = params.project;      
      project.get('features').addObject(newFeature);
      newFeature.save().then(function() {
        return project.save();
      });
      this.transitionTo('projects', project);
    },
    gotoShipments(project) {
      //alert("sii entre al gotoShipments de projects.js ");
      this.set('project', project)            
      this.transitionTo('shipment');
    },              
  }  
});
