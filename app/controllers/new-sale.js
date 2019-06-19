import Ember from 'ember';

export default Ember.Controller.extend({
    appController: Ember.inject.controller('movilsales'),        

    chooseBasura: function() {
        alert('entre al chooseBasura de new-sale Controller');
        let movil = this.get('appController');
        let fbid = this.movil.get('fbid');
        console.log('toy en el chooseBasura de new-sale Controller el fbid: ' + fbid)
      //alert('ahora el selectedStatus es:' + selected);
      //console.log(this.get('selectedStatus'))
    },
});
