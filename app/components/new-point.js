import Ember from 'ember';

export default Ember.Component.extend({     
addNewPoint: false,
  actions: {
    pointFormShow() {
      this.set('addNewPoint', true);
    },
    savePoint() {
     var params = {
       name: this.get('name'),
       isActive: this.get('isActive'),
       reference: this.get('reference'),
       icon: this.get('icon'),
       spRef: this.get('spRef'),
       X: this.get('X'),
       Y: this.get('Y'),       
       mobil: this.get('mobil')
     };
     this.set('addNewPoint', false);
     this.sendAction('savePoint', params);
   }
  }
});
