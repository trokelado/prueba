import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    reference: DS.attr('string'),
    type: DS.attr('string'),        
    long: DS.attr('number'),
    uLong: DS.attr('string'),
    shipments: DS.hasMany('shipment', { async: true }),    
    links: DS.hasMany('link', { async: true })
});
