import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    minX: DS.attr('string'),
    minY: DS.attr('string'),
    maxX: DS.attr('string'),
    maxY: DS.attr('string'),
    spRef: DS.attr('number'),    
    features: DS.hasMany('feature', { async: true }),
    shipments: DS.hasMany('shipment', { async: true })                     
});
