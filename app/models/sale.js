import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    fbId: DS.attr('string'),
    dateIn: DS.attr('string'),
    dateOut: DS.attr('string'),
    status: DS.attr('string'),    
    volume: DS.attr('number'),
    balance: DS.attr('number'),
    unit: DS.attr('string'),
    price: DS.attr('number'),    
    detail: DS.attr('string'),
    toy: DS.belongsTo('toy', { async: true }),
    mobil: DS.belongsTo('mobil', { async: true }),
    buys: DS.hasMany('buy', { async: true })
});