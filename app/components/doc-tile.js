import Ember from 'ember';

export default Ember.Component.extend({
  isImageShowing: false,    
actions: {
        imageShow: function(path) {
            this.set('isImageShowing', true);
            var find = '.';
            var pos = path.indexOf(find)    
            //alert("la posicion del punto es: " + pos);
            if (pos != -1) {
              var archivo = path.substring(pos)
              //alert("la posicion del punto es: " + archivo);
              if (archivo == '.pdf') {
                this.set('docIsImage', false);
              }                       
              else {
                this.set('docIsImage', true);
              } 
            }
            else {
              alert("archivo no definido !!");
            } 
        },
        imageHide: function() {
            this.set('isImageShowing', false);
        },  
    delete(doc) {
      if (confirm('Are you sure you want to delete this documento?')) {
        this.sendAction('destroyDoc', doc);
      }
    },
    updateDoc(doc, params) {
      //alert("entre al updateMobil de mobil-tile.js");      
        this.sendAction('updateDoc', doc, params);      
    } 
  }
});
