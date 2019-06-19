import Ember from 'ember';

export default Ember.Component.extend({
    ULongitudes: Ember.String.w('Kilometros Metros Miles Feet'),    
    Types: Ember.String.w('Aéreo Marítimo Terrestre Multimodal'),

  addNewShipment: false,
  actions: {
    shipmentFormShow() {
      this.set('addNewShipment', true);
    },
    chooseType(type) {     
      this.set('selectedType', type);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },    
    chooseULongitude(long) {     
      this.set('selectedULongitude', long);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    saveShipment() {
     var params = {
       name: this.get('name'),
       isActive: this.get('isActive'),
       reference: this.get('reference'),
       type: this.get('selectedType'),
       startOn: this.get('startOn'),
       arrival: this.get('arrival'),
       delivery: this.get('delivery'),       
       long: this.get('long'),       
       uLong: this.get('selectedULongitude'),
       project: this.get('project')       
     };
     this.set('addNewShipment', false);
     this.sendAction('saveShipment', params);
   }
  }
});
