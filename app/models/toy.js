import DS from 'ember-data';

export default DS.Model.extend({
    uid: DS.attr('string'),
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    email: DS.attr('string'),    
    rol: DS.attr('string'),        
    sales: DS.hasMany('sale', { async: true }),
    buys: DS.hasMany('buy', { async: true }),
    toyprojects: DS.hasMany('toyproject', { async: true }),            
    isValid: Ember.computed.match('email', /^.+@.+\..+$/)          
});
