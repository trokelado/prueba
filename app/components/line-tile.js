import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    delete(line) {
      if (confirm('¿ Esta seguro de querer borrar esta línea ?')) {
        this.sendAction('destroyLine', line);
      }
    },       
    updateLine(line, params) {
      //alert("entre al update de line-tile.js");      
        this.sendAction('updateLine', line, params);      
    }    
  }
});
