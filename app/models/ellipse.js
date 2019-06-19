import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    reference: DS.attr('string'),
    color: DS.attr('string'),
    area: DS.attr('number'),
    perimeter: DS.attr('number'),
    uArea: DS.attr('string'),
    uPerimeter: DS.attr('string'),
    radio: DS.attr('number'),
    spRef: DS.attr('number'),    
    json: DS.attr('string'),
    mobil: DS.belongsTo('mobil', { async: true })
});