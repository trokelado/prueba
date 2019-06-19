import Ember from 'ember';

export default Ember.Component.extend({
 //los valores iniciales de uLong y color vienen del controlador    
  ULongitudes: Ember.String.w('Kilometros Metros Miles Feet'),    
  Colors: Ember.String.w('Black Blue Brown Cyan Gray Green Lime Magenta Orange Pink Purple Red Salmon Silver Violet White Yellow'),
  updateLinkForm: false,

  actions: {
    updateLinkForm() {
      this.set('updateLinkForm', true);
    },
    chooseColor(color) {     
      this.set('selectedColor', color);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    chooseULongitude(longitude) {     
      this.set('selectedULongitude', longitude);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    updateLink(link) {
      //alert("entre a updatelink de update-link.js");
      var params = {        
        name: this.get('link.name'),
        isActive: this.get('link.isActive'),
        reference: this.get('link.reference'),
        color: this.get('selectedColor'),
        long: this.get('link.long'),
        uLong: this.get('selectedULongitude'),
        spRef: this.get('link.spRef'),        
        json: this.get('link.json')
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateLinkForm', false);
      this.sendAction('updateLink', link, params);
    }
  }
});

