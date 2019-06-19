import Ember from 'ember';

export default Ember.Component.extend({
actions: {
    delete(rectangle) {
      if (confirm('¿ Esta seguro de querer borrar este rectángulo ?')) {
        this.sendAction('destroyCube', rectangle);
      }
    },       
    updateCube(rectangle, params) {
      //alert("entre al update de rectangle-tile.js");      
        this.sendAction('updateCube', rectangle, params);      
    }    
  }
});
