import DS from 'ember-data';

export default DS.Model.extend({
    short: DS.attr('string'),    
    volume: DS.attr('number')
});
