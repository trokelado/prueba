import Ember from 'ember';

export default Ember.Component.extend({
  //los valores iniciales de uArea y uPerimeter y color vienen del controlador
  UAreas: Ember.String.w('Kilometros_cuadrados Hectáreas Metros_cuadrados Square_miles Acres Square_feet'),  
  ULongitudes: Ember.String.w('Kilometros Metros Miles Feet'),  
  Colors: Ember.String.w('Black Blue Brown Cyan Gray Green Lime Magenta Orange Pink Purple Red Salmon Silver Violet White Yellow'),

  updatePolygonForm: false,

  actions: {

    updatePolygonForm() {
      this.set('updatePolygonForm', true);
    },
    chooseColor(color) {     
      this.set('selectedColor', color);      
    },
    chooseUArea(area) {     
      this.set('selectedUArea', area);      
    },
    chooseULongitude(perimeter) {     
      this.set('selectedULongitude', perimeter);      
    },
    updatePolygon(polygon) {
      //alert("entre a updatePolygon de update-polygon.js");
      var params = {
        //id: this.get('polygon.id'),
        name: this.get('polygon.name'),
        isActive: this.get('polygon.isActive'),
        reference: this.get('polygon.reference'),
        color: this.get('selectedColor'),
        area: this.get('polygon.area'),
        perimeter: this.get('polygon.perimeter'),        
        uArea: this.get('selectedUArea'),
        uPerimeter: this.get('selectedULongitude'),
        spRef: this.get('polygon.spRef'),
        json: this.get('polygon.json')
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updatePolygonForm', false);
      this.sendAction('updatePolygon', polygon, params);
    }
  }
});
