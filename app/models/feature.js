import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    figure: DS.attr('string'),
    onsale: DS.attr('boolean'),
    project: DS.belongsTo('project', { async: true }),
    mobils: DS.hasMany('mobil', { async: true })
});
