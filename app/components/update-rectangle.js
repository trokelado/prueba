import Ember from 'ember';

export default Ember.Component.extend({
  //los valores iniciales de uArea y uPerimeter y color vienen del controlador
  UAreas: Ember.String.w('Kilometros_cuadrados Hectáreas Metros_cuadrados Square_miles Acres Square_feet'),  
  ULongitudes: Ember.String.w('Kilometros Metros Miles Yards'),
  Colors: Ember.String.w('Black Blue Brown Cyan Gray Green Lime Magenta Orange Pink Purple Red Salmon Silver Violet White Yellow'),

  updateCubeForm: false,

  actions: {

    updateCubeForm() {
      this.set('updateCubeForm', true);
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
    updateCube(rectangle) {
      //alert("entre a updateCube de update-rectangle.js");
      var params = {
        //id: this.get('rectangle.id'),
        name: this.get('rectangle.name'),
        isActive: this.get('rectangle.isActive'),
        reference: this.get('rectangle.reference'),
        color: this.get('selectedColor'),
        area: this.get('rectangle.area'),
        perimeter: this.get('rectangle.perimeter'),
        uArea: this.get('selectedUArea'),
        uPerimeter: this.get('selectedULongitude'),
        json: this.get('rectangle.json')
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateCubeForm', false);
      this.sendAction('updateCube', rectangle, params);
    }
  }
});

