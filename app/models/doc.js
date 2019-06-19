import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    path: DS.attr('string'),
    dateIn: DS.attr('string'),             
    format: DS.attr('string'),
    type: DS.attr('string'),
    point: DS.belongsTo('point', { async: true }),

    imagePath: function() {
      return "/assets/dinamicas/" + this.get("path");
    }.property('path'),

    docName: function() {
      return this.get("format") + ' ' + this.get("name");
    }.property('name'),
  
  publishedDate: Ember.computed('dateIn', function() { 
     var m = moment(this.get('dateIn')); 
     return `${m.format('MMMM Do, YYYY')} at ${m.format('h:mm:ss a')}`; 
   })         
});
