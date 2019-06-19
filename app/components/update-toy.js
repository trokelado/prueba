import Ember from 'ember';

export default Ember.Component.extend({
  updateForm: false,  
  roles: Ember.String.w('Administrador Comprador Operador Vendedor Visitante'),  

  actions: {

    updateForm() {
      this.set('updateForm', true);      
    },          
    chooseRol: function(rol) {
      this.set('selectedRol', rol);        
    },   
    updateToy(toy) {
      //alert("entre a updateToy de update-toy.js");            
        let params = {        
          name: this.get('toy.name'),          
          rol: this.get('selectedRol'),          
          detail: this.get('toy.isActive')        
        };    
                   
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateForm', false);
      this.sendAction('updateToy', toy, params);
    }
  }
});

