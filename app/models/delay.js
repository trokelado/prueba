import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    reference: DS.attr('string'),
    startOn: DS.attr('string'),
    finish: DS.attr('string'),    
    shipment: DS.belongsTo('shipment', { async: true }),
    reasons: DS.hasMany('reason', { async: true })        
});
