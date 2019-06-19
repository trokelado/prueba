import Ember from 'ember';

export default Ember.Component.extend({
  ULongitudes: Ember.String.w('Kilometros Metros Miles Feet'),    
  Colors: Ember.String.w('Black Blue Brown Cyan Gray Green Lime Magenta Orange Pink Purple Red Salmon Silver Violet White Yellow'),

  addNewLine: false,
  actions: {
    lineFormShow() {
      this.set('addNewLine', true);
    },
    chooseColor(color) {     
      this.set('selectedColor', color);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },    
    chooseULongitude(perimeter) {     
      this.set('selectedULongitude', perimeter);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    saveLine() {
     var params = {
       name: this.get('name'),
       isActive: this.get('isActive'),
       reference: this.get('reference'),
       color: this.get('selectedColor'),
       long: this.get('long'),       
       uLong: this.get('selectedULongitude'),
       spRef: this.get('spRef'),       
       json: this.get('json'),       
       mobil: this.get('mobil')
     };
     this.set('addNewLine', false);
     this.sendAction('saveLine', params);
   }
  }
});

