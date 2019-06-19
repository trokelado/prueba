import Ember from 'ember';

export default Ember.Component.extend({
    figure: null, 
    figures: Ember.String.w('Punto Línea Polígono Elipse Rectángulo'),
    
    addNewFeature: false,
    actions: {
        featureFormShow() {
            this.set('addNewFeature', true);
        },

        chooseFigure(figure) {     
            this.set('selectedFigure', figure);            
        },

        saveFeature() {
        var params = {
            name: this.get('name'),
            isActive: this.get('isActive'),
            figure: this.get('selectedFigure'),
            onsale: this.get('onsale'),
            project: this.get('project')            
        };
        this.set('addNewFeature', false);
        this.sendAction('saveFeature', params);
        }
    }
});

