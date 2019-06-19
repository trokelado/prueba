import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        delete(freight) {
            if (confirm('¿ Esta seguro de querer borrar esta ruta ?')) {
                this.sendAction('destroyFreight', freight);
            }
        },       
        updateFreight(freight, params) {              
            this.sendAction('updateFreight', freight, params);      
        }    
    }
});
