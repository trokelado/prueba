import Ember from 'ember';

export default Ember.Component.extend({

actions: {
    destroyToyProject(project) {
      if (confirm('Are you sure you want to delete this project?')) {
        this.sendAction('destroyToyProject', project);
      }
    },
    updateToyProject(project, params) {            
        this.sendAction('updateToyProject', project, params);      
    },     
  }
});

