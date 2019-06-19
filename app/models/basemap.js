import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    isActive: DS.attr('boolean'),
    short: DS.attr('string'),
    url: DS.attr('string'),
    spref: DS.attr('number'),
    isToken: DS.attr('boolean'),
    contract: DS.attr('string'),
    contact: DS.attr('string'),
    expiration: DS.attr('string')
});