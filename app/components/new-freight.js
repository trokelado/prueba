import Ember from 'ember';

export default Ember.Component.extend({

  addNewFreight: false,
  actions: {
    freightFormShow() {
      this.set('addNewFreight', true);
    },
    chooseTrack(track) {     
      this.set('selectedTrack', track);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },    
    saveFreight() {
     var params = {       
       track: this.get('selectedTrack'),
       shipment: this.get('shipment')
     };
     this.set('addNewFreight', false);
     this.sendAction('saveFreight', params);
   }
  }
});

