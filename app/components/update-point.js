import Ember from 'ember';

export default Ember.Component.extend({
updatePointForm: false,
  actions: {
    updatePointForm() {
      this.set('updatePointForm', true);
    },
    updatePoint(point) {
      //alert("entre a updatePoint de update-point.js");
      var params = {        
        name: this.get('point.name'),
        isActive: this.get('point.isActive'),
        reference: this.get('point.reference'),
        icon: this.get('point.icon'),
        spRef: this.get('point.spRef'),
        X: this.get('point.X'),
        Y: this.get('point.Y')
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updatePointForm', false);
      this.sendAction('updatePoint', point, params);
    }
  }
});

