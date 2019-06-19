import Ember from 'ember';

export default Ember.Component.extend({
  features: null,
    sortedFeatures: Ember.computed.sort('project.features', '_featureSort'),
  _featureSort: ['name'],
actions: {
    delete(project) {
      if (confirm('Are you sure you want to delete this project?')) {
        this.sendAction('destroyProject', project);
      }
    },
    destroyPoint(point) {
      this.sendAction('destroyPoint', point);
    },
    updatePoint(point, params) {
      //alert("entre al updatePoint de project-detail.js");      
        this.sendAction('updatePoint', point, params);      
    },
    updateDoc(doc, params) {
      //alert("entre al update de point-tile.js");      
        this.sendAction('updateDoc', doc, params);      
    },       
    saveDoc(params) {
      //alert("entre al saveDoc de project-detail.js");      
        this.sendAction('saveDoc', params);      
    },
    destroyDoc(doc) {      
        this.sendAction('destroyDoc', doc);      
    },  
  }
});

