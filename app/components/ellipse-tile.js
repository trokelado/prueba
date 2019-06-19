import Ember from 'ember';

export default Ember.Component.extend({
actions: {
    delete(ellipse) {
      if (confirm('¿ Esta seguro de querer borrar esta elipse ?')) {
        this.sendAction('destroyEllipse', ellipse);
      }
    },       
    updateEllipse(ellipse, params) {
      //alert("entre al update de ellipse-tile.js");      
        this.sendAction('updateEllipse', ellipse, params);      
    }    
  }
});

