import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('toyproject-tile', 'Integration | Component | toyproject tile', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{toyproject-tile}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#toyproject-tile}}
      template block text
    {{/toyproject-tile}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
