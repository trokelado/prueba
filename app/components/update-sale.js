import Ember from 'ember';

export default Ember.Component.extend({  
  updateSaleForm: false,
  //status: null, 
  statues: Ember.String.w('Activa Cancelada Cerrada'),
  uCommerce: Ember.String.w('Kilogramos Piezas Pounds Pieces'),
  lastVolume: 0,
  lastBalance: 0,

  saleIsFreeze: Ember.computed(function() {
    //alert('entre a saleIsFreeze el estatus inicial :' + status);       
      var status = this.get('sale.status');
      //alert('entre a saleIsFreeze el this.get(sale.status) :' + estatus);
      if(status === 'Cerrada') {
        return true;
      }
      return false;       
  }).property('status'),

  balanceIsFull: Ember.computed(function() {       
    var balance = this.get('sale.balance');
    var volume = this.get('sale.volume');
    if(volume === balance) {
      return true;
    }
    return false;       
  }).property('balance'),

  actions: {

    updateSaleForm() {
      this.set('updateSaleForm', true);
      this.set('lastVolume', this.get('sale.volume'));
      this.set('lastBalance', this.get('sale.balance'));
    },    
    chooseStatus: function(status) {
      this.set('selectedStatus', status);
      //alert('ahora el selectedStatus es:' + selected);
      //console.log(this.get('selectedStatus'))
    },  
    chooseUCommerce: function(unit) {
      this.set('selectedUCommerce', unit);        
    },   
    updateSale(sale) {
      //alert("entre a updateSale de update-sale.js");
      let lastVolume = this.get('lastVolume');
      let lastBalance = this.get('lastBalance');
      let params = null;
      if(lastVolume === lastBalance) {
        params = {        
          name: this.get('sale.name'),
          dateIn: this.get('sale.dateIn'),
          dateOut: this.get('sale.dateOut'),
          status: this.get('selectedStatus'),
          volume: this.get('sale.volume'),        
          balance: this.get('sale.volume'),
          unit: this.get('selectedUCommerce'),
          price: this.get('sale.price'),
          detail: this.get('sale.detail')        
        };    
      } else {
        params = {                  
          status: this.get('selectedStatus')                  
        };
      }            
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateSaleForm', false);
      this.sendAction('updateSale', sale, params);
    }
  }
});
