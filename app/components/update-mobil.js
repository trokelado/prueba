import Ember from 'ember';

export default Ember.Component.extend({
    //los valores iniciales de uArea y uPerimeter y color vienen del controlador
    UAreas: Ember.String.w('Kilometros_cuadrados Hectáreas Metros_cuadrados Square_miles Acres Square_feet'),    
    ULongitudes: Ember.String.w('Kilometros Metros Miles Feet'),  
    Colors: Ember.String.w('Black Blue Brown Cyan Gray Green Lime Magenta Orange Pink Purple Red Salmon Silver Violet White Yellow'),

    updateMobilForm: false,
    isPoint: function() {
        return this.get('figure') === 'Punto';
    }.property('figure'),

    isLine: function() {
        return this.get('figure') === 'Línea';
    }.property('figure'),

    isPolygon: function() {
        return this.get('figure') === 'Polígono';
    }.property('figure'),

    isEllipse: function() {
        return this.get('figure') === 'Elipse';
    }.property('figure'),

    isCube: function() {
        return this.get('figure') === 'Rectángulo';
    }.property('figure'),
    
  actions: {
    updateMobilForm() {
      this.set('updateMobilForm', true);
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
    updateMobil(mobil) {
      //alert("entre a updateMobil1");
      var params = {        
        name: this.get('mobil.name'),
        isActive: this.get('mobil.isActive'),
        logo: this.get('mobil.logo'),
        color: this.get('selectedColor'),
        uArea: this.get('selectedUArea'),
        uLong: this.get('selectedULongitude'),
        radio: this.get('mobil.radio'),
        taxo: this.get('mobil.taxo'),
        size: this.get('mobil.size')
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateMobilForm', false);
      this.sendAction('updateMobil', mobil, params);
    }
  }
});
