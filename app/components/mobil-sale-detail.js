import Ember from 'ember';

export default Ember.Component.extend({  
//movilsales: Ember.inject.controller('movilsales'),

/* ejemplo de inyeccion de un servicio
  session: Ember.inject.service(),
  sessionAuthenticated() {
    var applicationRouteInstance = this;
    this.get('session.account').then(function(user){
        if (user.get('is_first_login')) {
          applicationRouteInstance.transitionTo('users/password-reset');
        } else {
          applicationRouteInstance.transitionTo('dashboard');
        }
      });
   },
*/
/*  no tiene uso
  filteredSales: Ember.computed(function() {
      //esta inyeccion de control en componente funciona correctamente !!    
        //return this.get('movilsales.filteredSales');
        return this.get('filteredSales');                                                                                                                       
    }),
  
    filteredMobils: Ember.computed(function() {
      //esta inyeccion de control en componente funciona correctamente !!    
        //return this.get('movilsales.filteredMobils');
        return this.get('filteredMobils');
    }),
*/
actions: {    
    updateSale(sale, params) {            
        this.sendAction('updateSale', sale, params);      
    },
    destroySale(sale) {
        //alert("entre al destroySale de mobil-detail.js");      
            this.sendAction('destroySale', sale);      
    },    
    saveBuy(params) {
      //alert("entre al saveBuy de mobil-sale-detail.js");      
        this.sendAction('saveBuy', params);      
    },
    updateBuy(buy, params) {
      //alert("entre al updateBuy de mobil-sale-detail.js");              
        this.sendAction('updateBuy', buy, params);      
    },           
    destroyBuy(buy) {      
        this.sendAction('destroyBuy', buy);      
    },               
  }
});

