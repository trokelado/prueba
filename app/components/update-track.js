import Ember from 'ember';

export default Ember.Component.extend({
//los valores iniciales de uLong y color vienen del controlador    
  ULongitudes: Ember.String.w('Kilometros Metros Miles Feet'),
  Types: Ember.String.w('Aéreo Marítimo Terrestre Multimodal'),      
  updateTrackForm: false,

  actions: {
    updateTrackForm() {
      this.set('updateTrackForm', true);
    },
    chooseType(type) {     
      this.set('selectedType', type);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    chooseULongitude(longitude) {     
      this.set('selectedULongitude', longitude);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    updateTrack(track) {
      //alert("entre a updatetrack de update-track.js");
      var params = {        
        name: this.get('track.name'),
        isActive: this.get('track.isActive'),
        reference: this.get('track.reference'),
        type: this.get('selectedType'),
        long: this.get('track.long'),
        uLong: this.get('selectedULongitude')        
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateTrackForm', false);
      this.sendAction('updateTrack', track, params);
    }
  }
});

