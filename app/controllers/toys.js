import Ember from 'ember';

export default Ember.Controller.extend({
 
  data: Ember.computed.alias('model'),  // esta recibe el modelo del route                           
  toyProjects: null,
  sortedProjects: Ember.computed.sort('data.projects', '_projectSort'), 
  _projectSort: ['name'],

  filteredToyProjects: Ember.computed('data.toyprojects', function() {                              
    let toy = this.get('data.toy');
    //alert('toy en el filteredToyProjects de toys controller el toy es: ' + toy);                  
    let toyProjects = toy.get('toyprojects');
    //alert('toyProjects es: ' + toyProjects);      
    //let participante = toyProjects.get('firstObject');                                   
    //alert('participante: ' + participante);
    //var name = participante.get('name');
    //alert('el primer registro es: ' + name);                                                      
    return toyProjects;    
  }),      
         
  actions: {

    toyFormShow() {      
        this.set('addNewToy', true);                            
    },              
  }    
});

