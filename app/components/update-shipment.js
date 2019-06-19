import Ember from 'ember';

export default Ember.Component.extend({
actions: {
    updateShipmentForm() {
      this.set('updateShipmentForm', true);      
    },

    updateShipment(shipment) {
      //alert("entre a updateShipment1");
      var params = {
        id: this.get('shipment.id'),
        name: this.get('shipment.name'),
        isActive: this.get('shipment.isActive'),
        //figure: this.get('shipment.figure'),
        //figure: this.get('selectedFigure'),
        //onsale: this.get('shipment.onsale')
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateShipmentForm', false);
      this.sendAction('updateShipment', shipment, params);
    }
  }
});

