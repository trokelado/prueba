import Ember from 'ember';

export default Ember.Component.extend({
  //los valores iniciales de uArea y uPerimeter y color vienen del controlador
  UAreas: Ember.String.w('Kilometros_cuadrados Hectáreas Metros_cuadrados Square_miles Acres Square_feet'),  
  ULongitudes: Ember.String.w('Kilometros Metros Miles Feet'),  
  Colors: Ember.String.w('Black Blue Brown Cyan Gray Green Lime Magenta Orange Pink Purple Red Salmon Silver Violet White Yellow'),
  updateEllipseForm: false,

  actions: {

    updateEllipseForm() {
      this.set('updateEllipseForm', true);
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
    updateEllipse(ellipse) {
      //alert("entre a updateEllipse de update-ellipse.js");
      var params = {
        //id: this.get('ellipse.id'),
        name: this.get('ellipse.name'),
        isActive: this.get('ellipse.isActive'),
        reference: this.get('ellipse.reference'),
        color: this.get('selectedColor'),
        area: this.get('ellipse.area'),
        perimeter: this.get('ellipse.perimeter'),
        uArea: this.get('selectedUArea'),
        uPerimeter: this.get('selectedULongitude'),
        radio: this.get('ellipse.radio'),
        spRef: this.get('ellipse.spRef'),        
        json: this.get('ellipse.json')
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateEllipseForm', false);
      this.sendAction('updateEllipse', ellipse, params);
    }
  }
});

