import Ember from 'ember';

export default Ember.Component.extend({
  //movilsales: Ember.inject.controller('movilsales'),

  rolIsVendedor: Ember.computed(function() {       
    //return this.get('movilsales.rol') === 'Vendedor'; 
    return this.get('rol') === 'Vendedor';       
  }).property('rol'),  

actions: {
    delete(sale) {
      if (confirm('¿ Esta seguro de querer borrar esta venta ?')) {
        this.sendAction('destroySale', sale);
      }
    },       
    updateSale(sale, params) {
      //alert("entre al update de sale-tile.js");      
        this.sendAction('updateSale', sale, params);      
    },
    saveBuy(params) {
      //alert("entre al saveBuy de sale-tile.js");      
        this.sendAction('saveBuy', params);      
    },              
    updateBuy(buy, params) {            
        this.sendAction('updateBuy', buy, params);      
    }, 
    destroyBuy(buy) {      
        this.sendAction('destroyBuy', buy);      
    },     
  }
});

