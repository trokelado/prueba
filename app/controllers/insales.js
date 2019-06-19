import Ember from 'ember';

export default Ember.Controller.extend({
    data: Ember.computed.alias('model'),  // esta recibe el modelo del route
    showMoney: false,
    participante: null,
    sortedToyProjects: Ember.computed.sort('filteredToyProjects', '_projectSort'),
    //sortedProjects: Ember.computed.sort('data.projects', '_projectSort'),
    _projectSort: ['name'],

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
        if (rol === 'Vendedor' || rol === 'Comprador') {
          this.set('showMoney', true);                                                                            
        } 
        //alert('entre al filteredToys el participante: ' + participante);                               
        return selectedToys;    
    }),
    filteredToyProjects: Ember.computed('data.toyprojects', function() {                              
        let toy = this.get('participante');
        //alert('toy en el filteredToyProjects de toys controller el toy es: ' + toy);                  
        let toyProjects = toy.get('toyprojects');
        //alert('toyProjects es: ' + toyProjects);      
        //let participante = toyProjects.get('firstObject');                                   
        //alert('participante: ' + participante);
        //var name = participante.get('name');
        //alert('el primer registro es: ' + name);                                                      
        return toyProjects;    
    }),  
});

