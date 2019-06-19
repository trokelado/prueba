import Ember from 'ember';

export default Ember.Component.extend({
  //los valores iniciales de uLong y color vienen del controlador    
  ULongitudes: Ember.String.w('Kilometros Metros Miles Feet'),    
  Colors: Ember.String.w('Black Blue Brown Cyan Gray Green Lime Magenta Orange Pink Purple Red Salmon Silver Violet White Yellow'),
  updateLineForm: false,

  actions: {
    updateLineForm() {
      this.set('updateLineForm', true);
    },
    chooseColor(color) {     
      this.set('selectedColor', color);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    chooseULongitude(longitude) {     
      this.set('selectedULongitude', longitude);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    updateLine(line) {
      //alert("entre a updateLine de update-line.js");
      var params = {
        //id: this.get('line.id'),
        name: this.get('line.name'),
        isActive: this.get('line.isActive'),
        reference: this.get('line.reference'),
        color: this.get('selectedColor'),
        long: this.get('line.long'),
        uLong: this.get('selectedULongitude'),
        spRef: this.get('line.spRef'),        
        json: this.get('line.json')
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateLineForm', false);
      this.sendAction('updateLine', line, params);
    }
  }
});

