import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    project: DS.attr('string'),
    toy: DS.belongsTo('toy', { async: true })            
});
