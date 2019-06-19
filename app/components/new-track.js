import Ember from 'ember';

export default Ember.Component.extend({
    ULongitudes: Ember.String.w('Kilometros Metros Miles Feet'),    
    Types: Ember.String.w('Aéreo Marítimo Terrestre Multimodal'),

  addNewTrack: false,
  actions: {
    trackFormShow() {
      this.set('addNewTrack', true);
    },
    chooseType(type) {     
      this.set('selectedType', type);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },    
    chooseULongitude(long) {     
      this.set('selectedULongitude', long);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    saveTrack() {
     var params = {
       name: this.get('name'),
       isActive: this.get('isActive'),
       reference: this.get('reference'),
       type: this.get('selectedType'),
       long: this.get('long'),       
       uLong: this.get('selectedULongitude')       
     };
     this.set('addNewTrack', false);
     this.sendAction('saveTrack', params);
   }
  }
});


