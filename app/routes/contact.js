import Ember from 'ember';

export default Ember.Route.extend({
esriLoader: Ember.inject.service('esri-loader'),
  // this will be called only the first time the route is loaded
  init () {
    this._super(...arguments);
    // lazy load the JSAPI
    const esriLoader = this.get('esriLoader');
            // NOTE: to use a version other than the latest  4.x release
            // pass the url in the options argument to load()
            //alert('entre al lazy load the JSAPI en init maps.js !');
            //esriLoader.load({ url: 'https://js.arcgis.com/3.20compact' }).catch(err => {
            //esriLoader.load({ url: 'https://js.arcgis.com/3.21compact/' }).catch(err => {      
            //esriLoader.load({ url: 'https://js.arcgis.com/4.4/' }).catch(err => { puro batallar
            //cuando no se ponen parametros va a la version mas nueva      
      esriLoader.load({ url: 'https://js.arcgis.com/3.21/' }).catch(err => {
      //esriLoader.load().catch(err => { 
            // do something with the error
      alert('entre al error de lazy load the JSAPI en init maps.js !');
    });
  },
/*
    model() {
        return this.store.createRecord('contact');
    },
*/
    model() {
      return Ember.RSVP.hash({
        contact: this.store.createRecord('contact'), 
        basemaps: [
                    {id: 'streets', name: 'Urbano'},
                    {id: 'satellite', name: 'Satelital'},
                    {id: 'hybrid', name: 'Hibrido'},
                    {id: 'topo', name: 'Topografico'},
                    {id: 'dark-gray', name: 'Gris obscuro'},
                    {id: 'gray', name: 'Gris claro'},                    
                    {id: 'osm', name: 'Osm'},
                    {id: 'national-geographic', name: 'Nat.Geogra'}
                  ],
      });
    },

  actions: {
    /*
    saveMessage(newMessage) {                                      
      //ES6 solution using a model in route y si jala
      //checa como la vista maneja el model.contact
      newMessage.save().then((response) => this.controller.set('responseMessage', true));
    },
    */
    //ES6 deseche la solution anterior porque faltaba la fecha me vi obligado a agregar lo siguiente: 
    saveMessage(comprimido) {
      //convierte una fecha a string como 2017-10-08  (año-mes-dia)
      //var dateIn = new Date().toISOString().slice(0, 10);
      //Keep in mind that the above solution does not take into account your timezone offset.
      var date = new Date();
      //lo encontre en http://jsfiddle.net/simo/sapuhzmm/
      function toJSONLocal (date) {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
      }
            
      var dateIn = toJSONLocal(date);
      //alert(dateIn);                
      var params = {
        message: comprimido.get('message'),
        email: comprimido.get('email'),
        dateIn: dateIn   //new Date().getTime()  // este covierte a timestamp      
      };      
      var newMessage = this.store.createRecord('contact', params);                
      newMessage.save().then((response) => this.controller.set('responseMessage', true));
    },
    willTransition() {
    // rollbackAttributes() removes the record from the store
    // if the model 'isNew'
        this.controller.get('model.contact').rollbackAttributes();
        this.controller.set('responseMessage', false);
    },            
  }
});
