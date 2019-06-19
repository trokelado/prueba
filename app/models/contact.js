import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  dateIn: DS.attr('string'),
  message: DS.attr('string'),
  isValid: Ember.computed.match('email', /^.+@.+\..+$/),  
  isMessage: Ember.computed.gte('message.length', 20),
  isComplete: Ember.computed.and('isValid', 'isMessage'),
  isDisabled: Ember.computed.not('isComplete')
});