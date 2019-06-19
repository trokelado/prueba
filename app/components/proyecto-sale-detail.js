import Ember from 'ember';

export default Ember.Component.extend({
    features: null,
    
    filteredFeatures: Ember.computed('project.features.@each.onsale', function() {            
      return this.get('project.features').filterBy('onsale');
    }),

    sortedFeatures: Ember.computed.sort('filteredFeatures', '_itemSort'),
  _itemSort: ['name'],
  
});
