import Ember from 'ember';

export default Ember.Component.extend({    
    projects: null,    
     
    sortedToyProjects: Ember.computed.sort('filteredToyProjects', '_projectSort'),
    _projectSort: ['name'],

    actions: {
        destroyToyProject(project) {      
            this.sendAction('destroyToyProject', project);      
        },
        updateToyProject(project, params) {            
            this.sendAction('updateToyProject', project, params);      
        },     
    }
});
