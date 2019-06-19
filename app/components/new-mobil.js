import Ember from 'ember';

export default Ember.Component.extend({
  //los valores iniciales de uArea y uPerimeter y color vienen del controlador
    UAreas: Ember.String.w('Kilometros_cuadrados Hectáreas Metros_cuadrados Square_miles Acres Square_feet'),    
    ULongitudes: Ember.String.w('Kilometros Metros Miles Feet'),  
    Colors: Ember.String.w('Black Blue Brown Cyan Gray Green Lime Magenta Orange Pink Purple Red Salmon Silver Violet White Yellow'),

    addNewMobil: false,
    selectedColor: null,
    selectedUArea: null,
    selectedULongitude: null,

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

      mobilFormShow() {
        this.set('addNewMobil', true);
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
      saveMobil() {
        var params = {
          name: this.get('name'),
          isActive: this.get('isActive'),
          logo: this.get('logo'),
          taxo: this.get('taxo'),
          size: this.get('size'),
          color: this.get('selectedColor'),
          uArea: this.get('selectedUArea'),
          uLong: this.get('selectedULongitude'),
          radio: this.get('radio'),
          feature: this.get('feature')
        };
        this.set('addNewMobil', false);
        this.sendAction('saveMobil', params);
      }
    }
});
