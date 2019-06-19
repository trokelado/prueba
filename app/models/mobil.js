import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    logo: DS.attr('string'),
    color: DS.attr('string'),
    radio: DS.attr('number'),
    uArea: DS.attr('string'),
    uLong: DS.attr('string'),
    taxo: DS.attr('string'),
    size: DS.attr('string'),    
    feature: DS.belongsTo('feature', { async: true }),
    points: DS.hasMany('point', { async: true }),
    polygons: DS.hasMany('polygon', { async: true }),
    lines: DS.hasMany('line', { async: true }),
    ellipses: DS.hasMany('ellipse', { async: true }),
    rectangles: DS.hasMany('Rectangle', { async: true }),
    sales: DS.hasMany('sale', { async: true }),
    imagePath: function() {
    return "/assets/logos/" + this.get("logo");
  }.property('logo')
});