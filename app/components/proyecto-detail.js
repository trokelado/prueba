import Ember from 'ember';

export default Ember.Component.extend({    
    features: null,
    sortedFeatures: Ember.computed.sort('project.features', '_featureSort'),
  _featureSort: ['name']  
});
