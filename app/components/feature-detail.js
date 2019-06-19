import Ember from 'ember';

export default Ember.Component.extend({
  mobils: null,
    sortedMobils: Ember.computed.sort('feature.mobils', '_mobilSort'),
  _mobilSort: ['name'],
actions: {
    delete(feature) {
      if (confirm('Esta seguro de querer borrar el grupo ?')) {
        this.sendAction('destroyFeature', feature);
      }
    },
    destroyMobil(mobil) {
      this.sendAction('destroyMobil', mobil);
    },
    updateMobil(mobil, params) {
      //alert("entre al updateMobil de mobil-tile.js");      
        this.sendAction('updateMobil', mobil, params);      
    },
    savePoint(params) {
      //alert("entre al updateMobil de mobil-tile.js");      
        this.sendAction('savePoint', params);      
    }  
  }
});
