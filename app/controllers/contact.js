import Ember from 'ember';

export default Ember.Controller.extend({  
//este era el app/controller/contact.js pero fue substituido. 
//las validaciones se pasaron al modelo y a la vista
// y las acciones se pasaron a la ruta
  //basemaps: Ember.String.w('streets satellite hybrid topo dark-gray gray oceans osm national-geographic'),
  //basemaps: Ember.String.w('streets satellite hybrid topo'),
  sortedBasemaps: Ember.computed.sort('model.basemaps', '_basemapSort'),
  _basemapSort: ['name'],    
  
  email: '',
  message: '',  
  //isValid: Ember.computed.match('email', /^.+@.+\..+$/),  
  //isMessage: Ember.computed.gte('message.length', 5),
  //isComplete: Ember.computed.and('isValid', 'isMessage'),
  //isDisabled: Ember.computed.not('isComplete'),

  actions: {
    chooseBasemap(basemap) {
     //alert("entre al chooseBasemap de contact.js controller !");
      this.set('selectedBasemap', basemap);                        
    },
/*  //version anterior sin grabar
    saveMessage() {
      alert(`Sending a message is in progress to Email: ${this.get('emailAddress')}`);
      this.set('responseMessage', `Thank you! We got your message and we’ll get in touch soon: ${this.get('emailAddress')}`);
      this.set('emailAddress', '');
      this.set('message', '');
    }
    */
    /*
    saveMessage() {      
      const email = this.get('email');
      const message = this.get('message');

      const newMessage = this.store.createRecord('contact', { email: email, message: message });
     
      //ES6 solution
      newMessage.save().then((response) => {
        this.set('responseMessage', `Thank you! We got your message and we’ll get in touch soon: ${response.get('id')}`);
        this.set('email', '');
        this.set('message', '');
      });
    }
    */    
  }
});
