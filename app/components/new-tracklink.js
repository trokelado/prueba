import Ember from 'ember';

export default Ember.Component.extend({

  addNewTrackLink: false,
  actions: {
    tracklinkFormShow() {
      this.set('addNewTrackLink', true);
    },
    chooseTrackLink(link) {     
      this.set('selectedLink', link);
      //alert("entre al chooseFigure de infeatures.js y seleccione figure.name: " + figure.name + ' figure.id: ' + figure.id);           
    },        
    saveTrackLink() {
     var params = {       
       link: this.get('selectedLink')             
     };
     this.set('addNewTrackLink', false);
     this.sendAction('saveTrackLink', params);
   }
  }
});
