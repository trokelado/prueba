import Ember from 'ember';

export default Ember.Component.extend({
actions: {
    delete(mobil) {
      if (confirm('Are you sure you want to delete this mobil?')) {
        this.sendAction('destroyMobil', mobil);
      }
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
