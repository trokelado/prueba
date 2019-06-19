import Ember from 'ember';

export default Ember.Component.extend({
  //movilsales: Ember.inject.controller('movilsales'),

  rolIsVendedor: Ember.computed(function() {       
    //return this.get('movilsales.rol') === 'Vendedor'; //este si jalo en la version anterior
    return this.get('rol') === 'Vendedor';               
  }).property('rol'),

  BuyerIsOwner: Ember.computed(function() {
    //let toy = this.get('buy.fbId');
    //alert("entre al BuyerIsOwner de Buy-tale.js el buy.fbId: " + toy);
    //let otrotoy = this.get('mobilsales.fbid');
    //alert("entre al BuyerIsOwner de Buy-tale.js el mobilsales.fbid: " + otrotoy);    
    //return this.get('movilsales.fbid') === this.get('buy.fbId'); //este si jalo en la version anterior
    return this.get('fbid') === this.get('buy.fbId');            
  }).property('fbId'),

actions: {
    delete(buy) {
      if (confirm('¿ Esta seguro de querer borrar esta compra ?')) {
        this.sendAction('destroyBuy', buy);
      }
    },     
    updateBuy(buy, params) {
      //alert("entre al updateBuy de buy-tale.js");      
        this.sendAction('updateBuy', buy, params);      
    }    
  }
});
