import Ember from 'ember';

export default Ember.Component.extend({
actions: {
    delete(point) {
      if (confirm('¿ Esta seguro de querer borrar este punto ?')) {
        this.sendAction('destroyPoint', point);
      }
    },       
    updatePoint(point, params) {
      //alert("entre al update de point-tile.js");      
        this.sendAction('updatePoint', point, params);      
    },          
    saveDoc(params) {
      //alert("entre al saveDoc de point-tile.js");      
        this.sendAction('saveDoc', params);      
    },
    updateDoc(doc, params) {
      //alert("entre al update de point-tile.js");      
        this.sendAction('updateDoc', doc, params);      
    }, 
    destroyDoc(doc) {      
        this.sendAction('destroyDoc', doc);      
    },     
  }
});
