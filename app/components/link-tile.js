import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        delete(link) {
            if (confirm('¿ Esta seguro de querer borrar esta trayectoria ?')) {
                this.sendAction('destroyLink', link);
            }
        },       
        updateLink(link, params) {              
            this.sendAction('updateLink', link, params);      
        }    
    }
});
