import Ember from 'ember';

export default Ember.Component.extend({
  //movilsales: Ember.inject.controller(),
  addNewBuy: false,

  actions: {

    buyFormShow() {
      this.set('addNewBuy', true);
    },
    
    saveBuy() {      
      let balance = this.get('sale.balance');      
      let volume = this.get('volume');      
      if(volume > balance) {
        alert('Error !! El volumen solicitado es mayor que el saldo disponible !');
      } else {
          let precio = this.get('sale.price');
          let total = precio * volume;
          this.set('total', total);      
          //alert('toy en el saveBuy() de new-buy el total es: ' + total);
          var date = new Date();
          //lo encontre en http://jsfiddle.net/simo/sapuhzmm/
          function toJSONLocal (date) {
            var local = new Date(date);
            local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
            return local.toJSON().slice(0, 10);
          }
            
          var dateIn = toJSONLocal(date);
          var params = {
            name: this.get('name'),
            //fbId: this.get('movilsales.fbid'),
            fbId: this.get('fbid'),
            dateIn: dateIn,
            status: 'Pendiente',
            instruct: this.get('instruct'),
            publishSale: '',
            evalBuy: '',
            evalSale: '',
            volume: this.get('volume'),       
            total: this.get('total'),       
            sale: this.get('sale')
          };
          this.set('addNewBuy', false);
          this.sendAction('saveBuy', params);  
      }      
   }
  }
});        
    

