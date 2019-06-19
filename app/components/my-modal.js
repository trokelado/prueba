import Ember from 'ember';

export default Ember.Component.extend({
/*          //tambien jala pero es mas rollo
    show: Ember.on('didInsertElement', function() {
        Ember.on('hidden.bs.modal', function() {
          console.log('Toy en el hidden.bs.modal de my-modal !');
          this.get('onConfirm')();
          //this.sendAction('closeModalDialog'); //no manda la accion al route 
        }.bind(this), this.$('.modal').modal());
    }),
*/
  //si jala
    show: function() {
        this.$('.modal').modal();
    }.on('didInsertElement'),

/*
    show: function() {
        this.$('.modal').modal().on('hidden.bs.modal', function() {
            //this.sendAction('closeModalDialog');
            //this.controllerFor('login').set('isShowingModal', false);
            }.bind(this));
    }.on('didInsertElement'),
*/
    actions: {
        ok: function() {
            this.$('.modal').modal('hide');
            console.log('Toy en el ok de my-modal !');
            this.get('onConfirm')(); //will return the function passed from the parent as the value of onConfirm, and the following () will invoke the function
            //this.sendAction('closeModalDialog');    //no manda la accion al route                         
        },        
    }    
});
