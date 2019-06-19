import Ember from 'ember';

export default Ember.Component.extend({
    mobils: null,
    sortedMobils: Ember.computed.sort('feature.mobils', '_mobilSort'),
  _mobilSort: ['name']
});
