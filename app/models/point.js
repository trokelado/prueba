import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    reference: DS.attr('string'),
    icon: DS.attr('string'),
    spRef: DS.attr('number'),
    X: DS.attr('number'),
    Y: DS.attr('number'),            
    mobil: DS.belongsTo('mobil', { async: true }),
    docs: DS.hasMany('doc', { async: true }),
    imagePath: function() {
    return "/assets/logos/" + this.get("icon");
  }.property('icon')
});
