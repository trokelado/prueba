import Ember from 'ember';

export default Ember.Component.extend({
  updateFreightForm: false,

  actions: {
    updateFreightForm() {
      this.set('updateFreightForm', true);
    },
    updateFreight(freight) {
      //alert("entre a updatefreight de update-freight.js");
      var params = {        
        name: this.get('freight.name'),
        isActive: this.get('freight.isActive')        
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateFreightForm', false);
      this.sendAction('updateFreight', freight, params);
    }
  }
});


