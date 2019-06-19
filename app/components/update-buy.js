import Ember from 'ember';

export default Ember.Component.extend({
  //movilsales: Ember.inject.controller(),
  buyerStatues: Ember.String.w('Pendiente Cancelada'),
  salerStatues: Ember.String.w('Pendiente Aprobada Rechazada'),
  updateBuyForm: false,  

  rolIsVendedor: Ember.computed(function() {       
    //return this.get('movilsales.rol') === 'Vendedor'; 
    return this.get('rol') === 'Vendedor';               
  }).property('rol'),

  rolIsComprador: Ember.computed(function() {       
    //return this.get('movilsales.rol') === 'Comprador';        
    return this.get('rol') === 'Comprador';        
  }).property('rol'),

  buyerIsFreeze: Ember.computed(function() {       
    var estatus = this.get('buy.status');
    if(estatus === 'Aprobada' || estatus === 'Rechazada') {
      return true;
    }
    return false;       
  }).property('status'),

  salerIsFreeze: Ember.computed(function() {       
    var estatus = this.get('buy.status');
    if(estatus === 'Cancelada' || estatus === 'Rechazada') {
      return true;
    }
    return false;       
  }).property('status'),  

  actions: {
    
    updateBuyForm() {      
      this.set('lastStatus', this.get('buy.status'));
      this.set('updateBuyForm', true);      
    },
    chooseStatus: function(status) {
      this.set('selectedStatus', status);
      //alert('ahora el selectedStatus es:' + selected);
      //console.log(this.get('selectedStatus'))
    },
    //chooseStatus(status) {     
      //this.set('selectedStatus', status);
      //alert('ahora al chooseStatus de update-sale el estatus es:' + status);            
    //},
    updateBuy(buy) {
      //var isComprador = this.get('movilsales.rol') === 'Comprador';
      var isComprador = this.get('rol') === 'Comprador';
      if(isComprador){
        //alert('ahora soy comprador !');
        let volumen = this.get('buy.volume');        
        let saldo = this.get('buy.sale.balance');
        if(volumen > saldo) {
          alert('Error !! El volumen solicitado es mayor que el disponible !');
        } else {
          let precio = this.get('buy.sale.price');
          let total = precio * volumen;
          this.set('total', total);      
          //alert('toy en el updateBuy(buy) de update-buy el total es: ' + total);
          let params = {
            name: this.get('buy.name'),
            dateIn: this.get('buy.dateIn'),
            status: this.get('selectedStatus'),
            instruct: this.get('buy.instruct'),
            publishSale: this.get('buy.publishSale'),
            evalSale: this.get('buy.evalSale'),
            volume: this.get('buy.volume'),
            total: this.get('total'),
            direction: 'cero',
            saleId: ''
          };
          this.sendAction('updateBuy', buy, params);
          //alert(params.status + " ahora voy al update superior");
        }//volumen > saldo
        
      } //isComprador
      else { //isVendedor
        //alert('ahora soy vendedor !');
        var lastStatus = this.get('lastStatus');
        var newStatus = this.get('selectedStatus');      
        if(newStatus === undefined) {
          newStatus = lastStatus;
          //alert("confirmado tengo un estatus indefinido el lastStatus: " + lastStatus);
        }        
        if(lastStatus === newStatus) {
          //alert("los estatus son iguales: " + newStatus + " = " + lastStatus);
          let params = {                                        
            publishBuy: this.get('buy.publishBuy'),
            evalBuy: this.get('buy.evalBuy'),
            direction: 'cero',
            saleId: ''          
          };
          this.sendAction('updateBuy', buy, params);
        } else { // son lastStatus !== newStatus
          if(lastStatus === 'Pendiente') {
            if(newStatus === 'Rechazada') {
              let params = {          
                status: this.get('selectedStatus'),
                direction: 'cero',
                saleId: ''         
              };
              this.sendAction('updateBuy', buy, params);
            } else { // no Rechazada
              //de Pendiente a Aprobada se realiza compra ó cargo
              let volumen = this.get('buy.volume');        
              let saldo = this.get('buy.sale.balance');
              if(volumen > saldo) {
                alert('Error !! El volumen solicitado es mayor que el saldo disponible !');                
              } else { // no volumen > saldo
                  let estatusSale = this.get('buy.sale.status');
                  if(estatusSale === 'Activa') {
                    let saleId = this.get('buy.sale.id');
                    //alert('voy a enviar el saleId por el elevador: ' + saleId);              
                    let params = {          
                      status: this.get('selectedStatus'),
                      direction: 'cargo',
                      saleId: saleId         
                    };
                    this.sendAction('updateBuy', buy, params);
                  } else {
                      alert('Error !! la venta seleccionada se encuentra ' + estatusSale);
                      //let lastRegistro = this.get('movilsales.lastRegistro');
                      let lastRegistro = this.get('lastRegistro');
                      this.transitionTo('movilsales', lastRegistro);
                  }                  
              } // no volumen > saldo             
            }  // no Rechazada          
          } else { // no Pendiente
            if(lastStatus === 'Aprobada') {            
              //de Aprobada a Cancelada ó Pendiente se realiza descompra ó abono
              let saleId = this.get('buy.sale.id');
              //alert('voy a tratar de enviar el sale: ' + saleId);
              let params = {          
                status: this.get('selectedStatus'),
                direction: 'abono',
                saleId: saleId         
              };
              this.sendAction('updateBuy', buy, params);
            } // Aprobada
          }  // no Pendiente
        }  // son lastStatus !== newStatus
      }  // isVendedor                
      this.set('updateBuyForm', false);      
    },    
  }
});
