import Ember from 'ember';

export default Ember.Component.extend({    
    
    addNewToyProject: false,
    selectedProject: null,
    //toy: this.get('model.toy'),

    actions: {
        formShow() {
            this.set('addNewToyProject', true);
        },
        chooseProject(project) {     
            this.set('selectedProject', project);            
        },        
        saveToyProject() {             
            var params = {
                name: this.get('name'),
                isActive: this.get('isActive'),            
                project: this.get('selectedProject'),
                toy: this.get('model.toy')            
            };
            //alert('el params.toy es: ' + this.get('model.toy.id'));
            //alert('el project es: ' + this.get('selectedProject'));
            this.set('addNewToyProject', false);
            this.sendAction('saveToyProject', params);
        }
    }
});

