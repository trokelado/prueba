import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    short: DS.attr('string'),
    type: DS.attr('string'),
    volume: DS.attr('number'),    
    icon: DS.attr('string')  
});