import Ember from 'ember';

export default Ember.Component.extend({  
  //movilsales: Ember.inject.controller(),
  uCommerce: Ember.String.w('Kilogramos Piezas Pounds Pieces'),
  addNewSale: false,

  actions: {

    saleFormShow() {
      this.set('addNewSale', true);
    },
    chooseUCommerce: function(unit) {
      this.set('selectedUCommerce', unit);        
    },
    saveSale() {
     var params = {       
       name: this.get('name'),
       //fbId: this.get('movilsales').fbid,
       fbId: this.get('fbid'),
       dateIn: this.get('dateIn'),
       dateOut: this.get('dateOut'),
       status: 'Activa',
       volume: this.get('volume'),
       balance: this.get('volume'),
       unit: this.get('selectedUCommerce'),
       price: this.get('price'),
       detail: this.get('detail'),
       mobil: this.get('mobil')
     };
     this.set('addNewSale', false);
     this.sendAction('saveSale', params);
   }
  }
});
