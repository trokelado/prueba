import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    track: DS.belongsTo('track', { async: true }),
    shipment: DS.belongsTo('shipment', { async: true })
});