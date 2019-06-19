import Ember from 'ember';

export default Ember.Controller.extend({

    data: Ember.computed.alias('model'),  // esta recibe el modelo del route
    showMoney: false,
    participante: null,    

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
        if (rol === 'Administrador') {
          this.set('showMoney', true);                                                                            
        } 
        //alert('entre al filteredToys el participante: ' + participante);                               
        return selectedToys;    
    }),    
});
