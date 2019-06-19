import Ember from 'ember';

export default Ember.Component.extend({
actions: {
        deleteTrack(track) {
            if (confirm('¿ Esta seguro de querer borrar esta Ruta ?')) {
                this.sendAction('destroyTrack', track);
            }
        },       
        updateTrack(track, params) {              
            this.sendAction('updateTrack', track, params);      
        },
        deleteLink(link) {
            if (confirm('¿ Esta seguro de querer borrar esta trayectoria ?')) {
                this.sendAction('destroyLink', link);
            }
        },       
        updateLink(link, params) {              
            this.sendAction('updateLink', link, params);      
        }    
    }
})