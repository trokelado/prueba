import Ember from 'ember';

export default Ember.Controller.extend({
    //movilsales: Ember.inject.controller(),
    //data: Ember.computed.alias('model'),
    /*
    store: Ember.inject.service('store'),    
    mobil: this.store.get('mobil'),
    feature: mobil.get('feature'),
    figure: feature.get('figure'),
    */

    isPoint: function() {
        return this.get('model.feature.figure') === 'Punto';
    }.property('model.feature.figure'),

    isLine: function() {
        return this.get('model.feature.figure') === 'Línea';
    }.property('model.feature.figure'),

    isPolygon: function() {
        return this.get('model.feature.figure') === 'Polígono';
    }.property('model.feature.figure'),

    isEllipse: function() {
        return this.get('model.feature.figure') === 'Elipse';
    }.property('model.feature.figure'),

    isCube: function() {
        return this.get('model.feature.figure') === 'Rectángulo';
    }.property('model.feature.figure'),
    
/*  //Si jala
    isPoint: Ember.computed(function() {       
        let figure = this.get('model.feature.figure');
        console.log('la figura es: ' + figure);
        return figure === 'Punto';        
    }).property('model.feature.figure'),
 */           

    /*features: function(){
        return this.store.find('feature');
    }.property(),

isEditing : false,

    edit: function(){
        this.set('isEditing', true);
    },

    doneEditing: function(){
        this.set('isEditing', false);
        var mobil = this.get('model');
        mobil.save();
    },
*/

    actions:{
        deleteMobil: function(id){
            this.store.findRecord('mobil', id).then(function(mobil) {
                mobil.deleteRecord();

                //save to database
                mobil.save();                
            });
        }
    } 
});
