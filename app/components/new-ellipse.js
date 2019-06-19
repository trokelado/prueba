import Ember from 'ember';

export default Ember.Component.extend({
  UAreas: Ember.String.w('Kilometros_cuadrados Hectáreas Metros_cuadrados Square_miles Acres Square_feet'),  
  ULongitudes: Ember.String.w('Kilometros Metros Miles Feet'),
  Colors: Ember.String.w('Black Blue Brown Cyan Gray Green Lime Magenta Orange Pink Purple Red Salmon Silver Violet White Yellow'),

  addNewEllipse: false,

  actions: {

    ellipseFormShow() {
      this.set('addNewEllipse', true);
    },
    chooseColor(color) {     
      this.set('selectedColor', color);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    chooseUArea(area) {     
      this.set('selectedUArea', area);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    chooseULongitude(perimeter) {     
      this.set('selectedULongitude', perimeter);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },
    saveEllipse() {
     var params = {
       name: this.get('name'),
       isActive: this.get('isActive'),
       reference: this.get('reference'),
       color: this.get('selectedColor'),
       area: this.get('area'),
       perimeter: this.get('perimeter'),
       uArea: this.get('selectedUArea'),
       uPerimeter: this.get('selectedULongitude'),
       radio: this.get('radio'),
       spRef: this.get('spRef'),
       json: this.get('json'),       
       mobil: this.get('mobil')
     };
     this.set('addNewEllipse', false);
     this.sendAction('saveEllipse', params);
   }
  }
});

