import Ember from 'ember';

export default Ember.Component.extend({
updateProjectForm: false,
  actions: {
    updateProjectForm() {
      this.set('updateProjectForm', true);
    },
    updateProject1(project) {
      //alert("entre a updateProject1");
      var params = {
        id: this.get('project.id'),
        name: this.get('project.name'),
        isActive: this.get('project.isActive'),
        minX: this.get('project.minX'),
        minY: this.get('project.minY'),
        maxX: this.get('project.maxX'),
        maxY: this.get('project.maxY'),
        spRef: this.get('project.spRef')
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateProjectForm', false);
      this.sendAction('updateProject2', project, params);
    }
  }
});


