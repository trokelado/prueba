import Ember from 'ember';

const { Service } = Ember;

export default Ember.Service.extend({

    init() {
        this._super(...arguments);
        this.signInSuccess = [];
    }

});
