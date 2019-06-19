import Ember from 'ember';
//import computedFilterByQuery from 'ember-cli-filter-by-query'; no la toy usando

export default Ember.Controller.extend({  
    //queryParams:{toy:{refreshModel : true}},
  
  //commentSortProperties: ['isActive:desc', 'name:asc'],
  //toys: Em.computed.sort('model.toys', 'commentSortProperties'),
    //reload: function() {
        //this.controller.get('content');
    //},
  data: Ember.computed.alias('model'),  // esta recibe el modelo del route                       
    showPartialSales: false,
    showCommerce: false,
    participante: null,
    sales: null,
/*
    sortedFbid: Ember.computed.sort('data.temporales', '_fbidSort'),
    _fbidSort: ['name'],
    selectedFbid: null,
    isToySelected: false,
     */              
/*
    toys: Ember.computed(function() {
      return this.store.peekAll('toy');
    }),    
*/
    filteredToys: Ember.computed('data.toys', function() {                              
        let uid = this.get('uid');
        //alert('toy en el filteredToys de movilsales controller el uid es: ' + uid);  
        var selectedToys = this.get('data.toys').filterBy('uid', uid);        
        let participante = selectedToys.get('firstObject'); //usuario vendedor
        //let participante = selectedToys.get('lastObject');     //usuario comprador          
        this.set('participante', participante);
        //var sales = participante.get('sales');
        //alert('entre al sales del participante: ' + sales);
        var rol = participante.get('rol');
        var id = participante.get('id');
        this.set('rol', rol);
        //alert('entre al filteredToys de mobilsales el rol participante: ' + rol);
        this.set('id', id);
        if (rol === 'Vendedor' | rol === 'Comprador') {
          this.set('showCommerce', true);
          //this.set('showPartialSales', true);                                                                  
        } 
        //alert('entre al filteredToys el participante: ' + participante);                               
        return selectedToys;    
    }),      

// si jalan pero son para comprobación
/*
    filteredMobilSales: Ember.computed('data.mobil', function() {                                                  
        var selectedMobil = this.get('data.mobil');                                
        return selectedMobil.get('sales');                                                                                                      
    }),

    filteredToySales: Ember.computed('data.toys', function() {                              
         let fbid = this.get('fbid');
         //alert('toy en el filteredToy uid: ' + fbid);  
        var selectedToys = this.get('data.toys').filterBy('uid', fbid);        
        let participante = selectedToys.get('firstObject');                        
        return participante.get('sales');                                                                                                      
    }),
*/
    //filteredSales: Ember.computed('toy', 'data', function() {
     filteredSales: Ember.computed('data.toys', function() {
        let uid = this.get('uid'); 
        //alert('toy en el filteredSales de movilsales controller el uid: ' + uid);          
        var selectedToys = this.get('data.toys').filterBy('uid', uid);        
        let toy = selectedToys.get('firstObject');        
         //alert('toy en el filteredSales de movilsales controller el toy.id: ' + toy.id);
         var selectedMobil = this.get('data.mobil');
         //alert('toy en el filteredSales mobil: ' + selectedMobil.id);                  
        var toySales = toy.get('sales');                                
        var mobilSales = selectedMobil.get('sales');
        var participante = this.get('participante');
        var rol = participante.get('rol');
        //alert('entre al filteredSales de mobilsales el rol participante: ' + rol);
        if (rol === 'Vendedor') {
            this.set('showPartialSales', true);
            return mobilSales.filter(function(item) {
                if(toySales.includes(item)) {
                    return true;
                }
                return false;
            })                                                                    
        } else if (rol === 'Comprador') {
           return mobilSales; 
        }
        return false             
    }), 
/*
    fbidChanged: function() {
        //map.graphics.clear();
        let fbid = this.get('fbid');
        this.set('isToySelected', true);
        //alert('toy en el fbidChanged de mobilsales fbid: ' + fbid);
        //this.rerender();
    }.observes('selectedFbid'),   
   */
    //filteredSales: computedFilterByQuery('data.sales', 'fbid', fbid),

/*
        var foo = this.get('data.sales').then(function (sales) {
            return sales.filterBy('toy', 'selectedToy.id');
        }).then(function(selectedSales){
            // available here
            let firstSale = selectedSales.get('firstObject');
            alert('toy en el filteredSales de mobilsales firstSale: ' + firstSale);
            return selectedSales;
            //console.log(filteredRoles.get('length'));
        });
*/                                                                                                            
    /*
    this.get('model').forEach(function(item){
     item.get('sites').forEach(function(site){
       arr.pushObject(someObject); //some object that is represents each specific combination
     });
   });
*/
     
  actions: {
/*
      chooseFbid(temporal) {
     //alert("entre al chooseFeature de infeatures.js"+feature);
      this.set('fbid', temporal.id);
      this.set('selectedFbid', temporal.name);
      //console.log('el fbid seleccionado es: ' + temporal.name)                  
    },
    */
    toyFormShow() {      
        this.set('addNewToy', true);                            
    },
    saveToy() {
      //alert('entre al saveToy !');            
    }           
  },    
});
