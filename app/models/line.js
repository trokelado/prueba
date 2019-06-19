import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    reference: DS.attr('string'),
    color: DS.attr('string'),    
    long: DS.attr('number'),
    uLong: DS.attr('string'),
    spRef: DS.attr('number'),    
    json: DS.attr('string'),        
    mobil: DS.belongsTo('mobil', { async: true })
});
