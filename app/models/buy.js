import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    fbId: DS.attr('string'),            
    dateIn: DS.attr('string'),    
    status: DS.attr('string'),
    instruct: DS.attr('string'),    
    publishBuy: DS.attr('string'),
    publishSale: DS.attr('string'),
    volume: DS.attr('number'),    
    total: DS.attr('number'),
    evalBuy: DS.attr('string'),
    evalSale: DS.attr('string'),
    toy: DS.belongsTo('toy', { async: true }),
    sale: DS.belongsTo('sale', { async: true })    
});