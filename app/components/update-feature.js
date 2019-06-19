import Ember from 'ember';

export default Ember.Component.extend({
  //figure: null, el valor inicial viene del controlador
  //figures: Ember.String.w('Punto Línea Polígono Elipse Rectángulo'),

  actions: {
    updateFeatureForm() {
      this.set('updateFeatureForm', true);      
    },

    chooseFigure(figure) {     
      this.set('selectedFigure', figure);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },

    updateFeature(feature) {
      //alert("entre a updateFeature1");
      var params = {
        id: this.get('feature.id'),
        name: this.get('feature.name'),
        isActive: this.get('feature.isActive'),
        //figure: this.get('feature.figure'),
        figure: this.get('selectedFigure'),
        onsale: this.get('feature.onsale')
      };
      //alert(params.id + " " + params.name + " ahora voy al update superior");      
      this.set('updateFeatureForm', false);
      this.sendAction('updateFeature', feature, params);
    }
  }
});

/* esta accion la vi por ahi parece que funciona habra que probarlo
actions: 
 {
    filterStudentResults(param) 
    {
     if (param !== '') 
     {
       return this.get('store').query('Students', { studentName: param });
     } 
     else 
     {
       return this.get('store').findAll('Students');
     }
   }
}
*/