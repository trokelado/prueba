import Ember from 'ember';

export default Ember.Route.extend({

    controllerName: 'toys',  //si direcciona
    model(params) {
        //this.set('lastRegistro', params.toy_id);        
        return Ember.RSVP.hash({
            toy: this.store.findRecord('toy', params.toy_id),      
            projects: this.store.findAll('project'),
            toyprojects: this.store.findAll('toyproject')                        
        });
    },

    setupController: function(controller,model) {
      //controller.setProperites(model);
      //you can do anything with controller and model instance
      // Call _super for default behavior findRecord
      this._super(controller, model);
      // Implement your custom setup after                                                          
      controller.set('model', model);   //esta pasa el modelo al controlador pero parece inecesario
      // or first item only
      //controller.set('model', model.get('firstObject'));      
    },

    actions: {      
        saveToyProject(params) {
            //alert('entre al saveToyProject en la ruta toys !');                  
            var newToyProject = this.store.createRecord('toyproject', params);                        
            var toy = params.toy;
            //alert('el toy es: ' + toy);                              
            //proyecto.get('toyprojects').addObject(newToyProject);      
            toy.get('toyprojects').addObject(newToyProject);                        
            newToyProject.save().then(function() {
                return toy.save(); //proyecto.save() &&
            });            
            this.transitionTo('toys', toy.id);            
        },

        updateToyProject(project, params) {                  
            alert("entre al updateToyProject de toys.js");                  
            Object.keys(params).forEach(function(key) {
                if(params[key]!==undefined) {
                project.set(key,params[key]);
                }
            });
            project.save();
            let lastRegistro = this.get('lastRegistro');
            this.transitionTo('toys', toy.id);            
        },

        destroyToyProject(project) {
            //alert("entre al destroyToyProject en toys !");
            let lastRegistro = this.get('lastRegistro');            
            project.destroyRecord();
            this.transitionTo('toys', toy.id);
        }        
    }      
});
