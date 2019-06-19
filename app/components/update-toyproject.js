import Ember from 'ember';

export default Ember.Component.extend({
   updateForm: false,

  actions: {
    updateForm() {
      this.set('updateForm', true);
    },    
    updateToyProject(toyproject) {
      //alert("entre a updateLine de update-line.js");
      var params = {
        //id: this.get('line.id'),
        name: this.get('toyproject.name'),
        isActive: this.get('toyproject.isActive')        
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateForm', false);
      this.sendAction('updateToyProject', toyproject, params);
    }
  }
});


