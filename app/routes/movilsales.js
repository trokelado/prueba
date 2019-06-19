import Ember from 'ember';
import firebase from 'firebase';

export default Ember.Route.extend({
  //fb: Ember.inject.service(),
        
    beforeModel() {
      let user = firebase.auth().currentUser;
      if (user != null) {
        //usuario autenticado              
        let uid = user.uid;
        this.set('uid', uid);
        return uid;
      }
      else {
        //alert('No estoy autenticado');        
          this.transitionTo('login');
      }
      //let fbid = '1409156029139732'; //solo para probar sin facebook version anterior
      //this.set('fbid', fbid); //solo para probar sin facebook version anterior
    /* todo lo siguiente funciona con facebook      
    //return this.get('fb').FBInit(); //Before using the Facebook SDK you must be sure to have initialized it. The most convenient way is to call the FBInit function of the fb service in your Application route:     
    return this.get('fb').getLoginStatus().then((response) => {                        
            if (response.status === 'connected') {
                var fbid = response.authResponse.userID;
                //fbid = '1409156029139732'; //default rol Vendedor no cambiar
                //fbid = '1409156029139733'; //rol Comprador aqui puedo cambiar al usuario fb
                //fbid = '1409156029139731'; //rol Comprador aqui puedo cambiar al usuario fb
                //fbid = '1409156029139730'; //rol Vendedor aqui puedo cambiar al usuario fb
                this.set('fbid', fbid);
                //var email = response.email;
                //alert('toy en el beforeModel de mobilsales y el email: ' + email);
                return fbid;                                                
            }
            else {
              //alert('No estoy conectado');
                //FB.login();
                this.transitionTo('index');
            }                            
    });
    */
  },
    
/*    
  model: function(id){
    var post = this.get('store').find('post', id); // Find the post from the store
    post.reload(); // Force a reload
    return post;  // Return the fetched post NOW with incomplete/outdated info. When the api answers, the information will be updated.
  }
*/

    controllerName: 'movilsales',  //si direcciona
    model(params) {      
      this.set('lastRegistro', params.movilsale_id);
      //const currentUser = this.get('fbid');
      return Ember.RSVP.hash({        
        mobil: this.store.findRecord('mobil', params.movilsale_id),
        sales: this.store.findAll('sale'),
        buys: this.store.findAll('buy'),
        toys: this.store.findAll('toy')
        /*
        temporales: [
                    {id: '1409156029139732', name: 'Soc. Coop. Ensenada'},
                    {id: '1409156029139733', name: 'Rey Sol Restaurante'},
                    {id: '1409156029139731', name: 'La Cabaña Restaurante'},
                    {id: '1409156029139730', name: 'Soc. Coop. Rosarito'}
                ],
                */
        //toys: this.store.findAll('toy', {include: 'sales'}), 
        //mobil: this.store.findRecord('mobil', params.mobilsale_id, {include: 'sales'}),
      });
      //modelo.reload(); // Force a reload
      //return modelo;                
        /* 
        mobil: this.get('store').query('mobil', {filter: {'id': params.mobilsale_id},
          include: 'sale'
        }),
        */                
  },
/* //no se que hace
  afterModel: function(model) {
    return Ember.RSVP.Promise.all(model.sales.map(function(item) {
        return item.get('toy');
    }));
}
*/
 /* 
  // muestra de promesas no probada la saque de https://stackoverflow.com/questions/40032747/ember-2-filter-relationship-models-hasmany-belongsto-and-calculate-computed
    model(params) {
        return this.store.findRecord('feature', params.feature_id).then((feature)=> {
            return feature.get('mobils').then((mobils)=> {
                let salesPromises = mobils.map(function (mobil) {
                    return mobil.get('sales');
                });
                return Ember.RSVP.allSettled(salesPromises).then((array)=> {
                    let toyPromises = array.map(function (item) {
                        return (item.value).get('toy');
                    });
                    return Ember.RSVP.allSettled(toyPromises);
                });
            });
        });
    },
*/

/*
  afterModel: function(model, transition){
    var self = this;
    var professorList = [];
    
    var promise = new Ember.RSVP.Promise(function(resolve, reject){
        var sales = model.mobil.get('sales');

        sales.forEach(function(sale){
          self.store.find('sale', sale.get('id')).then(function(sale){
            var profs = sale.get('professors');
            
            profs.forEach(function(prof) {
              if (professorList.indexOf(prof) === -1) {
                professorList.pushObject(prof);
              }
            });            
          });
        });
        var data = {
          professorList: professorList          
        };
        resolve(data);
    });

    promise.then(function(data) {
      //console.log(data);
      model.set('professorNameList', data.professorList);      
    });
  },
*/
   
  setupController: function(controller,model) {
      //controller.setProperites(model);
      //you can do anything with controller and model instance
      // Call _super for default behavior findRecord
      this._super(controller, model);
      // Implement your custom setup after      
      var uid = this.get('uid');
      controller.set('uid', uid); //esta pasa el uid al controlador es requerido      
      //alert('toy en el setupController uid: ' + uid);                                  
      controller.set('model', model);   //esta pasa el modelo al controlador pero parece inecesario
      // or first item only
      //controller.set('model', model.get('firstObject'));      
    },                      
    /*
    setupController: function (controller,model) {
      
      var salesController = this.controllerFor('mobilsales');
      this.store.find('toy').then(function(toys) {
        var promises =  toys.map(function(toy) {
          return Ember.RSVP.hash({            
            sales: toy.get('sales').then(function(sales) {
              return sales;              
            }),
          });             
        });
        Ember.RSVP.all(promises).then(function(filteredSales) {
          salesController.set('filteredSales', filteredSales);
        });
      });
      this._super(controller, model);
      controller.set('fbid', fbid); //esta pasa el fbid al controlador            
    },
*/
/*    
//ejemplo de lectura de childrens
  setupController: function () {      
      var salesController = this.controllerFor('mobil-sale-detail');
      this.store.find('toy').then(function(toys) {
        var promises =  toys.map(function(toy) {
          return Ember.RSVP.hash({
            toy: toy,
            sales: toy.get('sales').then(function(sales) {
              return sales.filter(function(sale) {
                return sale.get(toy);
              });
            }),
          });             
        });
        Ember.RSVP.all(promises).then(function(filteredSales) {
          salesController.set('filteredSales', filteredSales);
        });
      });
      //this._super(controller, model);
      controller.set('fbid', fbid); //esta pasa el fbid al controlador            
    },
 */   
          
    actions: {      

     saveSale(params) {
      let toy = this.controller.get('participante');
      //alert("entre al saveSale de mobilsale.js el toy.id: " + toy);      
      var newSale = this.store.createRecord('sale', params);
      var mobil = params.mobil;      
      mobil.get('sales').addObject(newSale);
      toy.get('sales').addObject(newSale);            
      newSale.save().then(function() {
        return mobil.save() && toy.save();
      });
      //let lastRegistro = this.get('lastRegistro');
      this.transitionTo('insales');
      //this.transitionTo('mobilsales', params.mobilsale_id);
    },
    /*
        invoice.save().then(function(invoice){
            self.set('content.invoiceId', parseInt(invoice.id, 10));
            invoice.get('lineItems').then(function(lineItems){
                self.get('content').save().then(self.didSave.bind(self), self.paymentDidNotSave.bind(self));
            });
        }, function(error) {      
            lineItem.deleteRecord();
            invoice.deleteRecord();
        });
    */
    /*
App.EditRoute = Em.Route.extend
   setupController: (controller, model) ->
       this.set 'transaction', this.get('store').transaction()
       this.get('transaction').add model
   deactivate: ->
       # if the transaction has already been committed or rolled back, this
       # will have no effect
       this.get('transaction').rollback()
   events: 
       save: ->
           # I prefer to keep the user on the edit view until the
           # commit is complete, so that if an error occurs I can display
           # it in the edit form
           this.get('currentModel').on 'didUpdate', this, -> this.send('exit')
           this.get('transaction').commit()
      cancel: ->
           # because rolling back is synchronous, trigger `exit` immediately
           this.get('transaction').rollback()
           this.send('exit')
      exit: ->
           this.transitionTo 'list'

    */    
    updateSale(sale, params) {                  
      //alert("entre al updateSale de mobilsales.js");                  
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          sale.set(key,params[key]);
        }
      });
      sale.save();
      let lastRegistro = this.get('lastRegistro');
      this.transitionTo('movilsales', lastRegistro);            
    },
    
    destroySale(sale) {
    //alert("entre al destroySale de mobilsales.js");
      let lastRegistro = this.get('lastRegistro');
      var buy_deletions = sale.get('buys').map(function(buy) {
        return buy.destroyRecord();
      });
      Ember.RSVP.all(buy_deletions).then(function() {
        return sale.destroyRecord();
      });
      this.transitionTo('movilsales', lastRegistro);
    },

    saveBuy(params) {
      //alert("entre al saveBuy de projects.js");
      let toy = this.controller.get('participante');
      var newBuy = this.store.createRecord('buy', params);
      var sale = params.sale;      
      sale.get('buys').addObject(newBuy);
      toy.get('buys').addObject(newBuy);
      newBuy.save().then(function() {
        return sale.save() && toy.save();
      });
      let lastRegistro = this.get('lastRegistro');
      this.transitionTo('movilsales', lastRegistro);      
    },

    updateBuy(buy, params) {      
      var opera = params.direction;
      var saleId = params.saleId;
      params.direction = null;
      //alert("entre al updateBuy de mobilsales y recibi la saleId: " + saleId);                         
      //alert("entre al updateBuy de mobilsales la operacion es: " + opera);
                                   
      let lastRegistro = this.get('lastRegistro');
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          buy.set(key,params[key]);
          //alert("el key is " + key + params[key]);
        }
      });
      if(opera !== 'cero') {
        var sale = this.get('store').peekRecord('sale', saleId);
        var balance = sale.get('balance');                
        var volume = buy.get('volume');
        if(opera === 'cargo') {
          volume = volume * -1;
        } else {
          sale.status = 'Activa';
        }                
        balance = balance + volume;
        sale.balance = balance;
        if(balance === 0) {
          sale.status = 'Cerrada';  
        }
        //alert("entre al updateBuy de mobilsales el balance: " + balance);                
        /*
        this.get('firebaseUtil').findRecord('referenceId', 'users/foo').then((record) => {
          // Do something with `record` 
        }).catch(error => {
          // Do something with `error` 
        });
        */          
      }
      //buscar hacer tranzaccion de la siguiente linea
      buy.save().then(function() {return sale.save();});            
      this.transitionTo('movilsales', lastRegistro);            
    },
    
    destroyBuy(buy) {
      //alert("entre al destroyBuy de mobilsales.js");
      let lastRegistro = this.get('lastRegistro');
      buy.destroyRecord();
      this.transitionTo('movilsales', lastRegistro);
    }     
  }
});

/*
// small transaction
// This won't automatically add the record to the views
var record = App.Person.create();

var transaction = App.store.transaction();
transaction.add(record);
record.setProperties({name: 'Whatever', email: 'john@doe.com'});

// It will insert this record to the store at this point, if server-side validations
// don't fail.
transaction.commit();

// The record will be automatically discarded if the transaction doesn't commit
// and thus we can forget about it.
*/
