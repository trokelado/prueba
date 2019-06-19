import Ember from 'ember';

export default Ember.Component.extend({
actions: {
    delete(polygon) {
      if (confirm('¿ Esta seguro de querer borrar este polígono ?')) {
        this.sendAction('destroyPolygon', polygon);
      }
    },       
    updatePolygon(polygon, params) {
      //alert("entre al update de polygon-tile.js");      
        this.sendAction('updatePolygon', polygon, params);      
    }    
  }
});
