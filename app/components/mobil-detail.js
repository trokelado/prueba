import Ember from 'ember';

export default Ember.Component.extend({

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
    updatePoint(point, params) {
      //alert("entre al update de point-tile.js");      
        this.sendAction('updatePoint', point, params);      
    },
    destroyPoint(point) {
        //alert("entre al destroyPoint de mobil-detail.js");      
            this.sendAction('destroyPoint', point);      
    },
    updatePolygon(polygon, params) {
      //alert("entre al update de point-tile.js");      
        this.sendAction('updatePolygon', polygon, params);      
    },
    destroyPolygon(polygon) {
        //alert("entre al destroyPoint de mobil-detail.js");      
            this.sendAction('destroyPolygon', polygon);      
    },
    updateLine(line, params) {
      //alert("entre al update de point-tile.js");      
        this.sendAction('updateLine', line, params);      
    },
    destroyLine(line) {
        //alert("entre al destroyPoint de mobil-detail.js");      
            this.sendAction('destroyLine', line);      
    },
    updateEllipse(ellipse, params) {
      //alert("entre al update de point-tile.js");      
        this.sendAction('updateEllipse', ellipse, params);      
    },
    destroyEllipse(ellipse) {
        //alert("entre al destroyPoint de mobil-detail.js");      
            this.sendAction('destroyEllipse', ellipse);      
    },
    updateCube(rectangle, params) {
      //alert("entre al update de point-tile.js");      
        this.sendAction('updateCube', rectangle, params);      
    },
    destroyCube(rectangle) {
        //alert("entre al destroyPoint de mobil-detail.js");      
            this.sendAction('destroyCube', rectangle);      
    },
    saveDoc(params) {
      //alert("entre al saveDoc de point-tile.js");      
        this.sendAction('saveDoc', params);      
    },
    updateDoc(doc, params) {
      //alert("entre al update de point-tile.js");      
        this.sendAction('updateDoc', doc, params);      
    },           
    destroyDoc(doc) {      
        this.sendAction('destroyDoc', doc);      
    },               
  }
});
