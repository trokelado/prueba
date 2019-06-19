import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    reference: DS.attr('string'),
    type: DS.attr('string'),
    startOn: DS.attr('string'),
    arrival: DS.attr('string'),
    delivery: DS.attr('string'),    
    long: DS.attr('number'),
    uLong: DS.attr('string'),
    project: DS.belongsTo('project', { async: true }),    
    tracks: DS.hasMany('track', { async: true }),
    delays: DS.hasMany('delay', { async: true })
});
