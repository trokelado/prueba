import Ember from 'ember';

export default Ember.Controller.extend({
    data: Ember.computed.alias('model'),  // esta recibe el modelo del route    
    participante: null,
    showMoney: false,
    sortedToyProjects: Ember.computed.sort('filteredToyProjects', '_projectSort'),    
    _projectSort: ['name'],    

    filteredToyProjects: Ember.computed('data.toys', function() {
        let uid = this.get('uid');
        //alert('toy en el filteredToyProjects de map controller el uid es: ' + uid);  
        var selectedToys = this.get('data.toys').filterBy('uid', uid);        
        let toy = selectedToys.get('firstObject');
        //var name = toy.get('name');
        //alert('el primer registro es: ' + name);        
        let rol = toy.get('rol');        
        this.set('rol', rol);                                   
        let toyProjects = toy.get('toyprojects');             
        //let participante = toyProjects.get('firstObject');                                           
        //var name = participante.get('name');
        //alert('el primer registro es: ' + name);
        this.set('showMoney', true);                                                      
        return toyProjects;    
    }),
});
