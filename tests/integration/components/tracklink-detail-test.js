import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tracklink-detail', 'Integration | Component | tracklink detail', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tracklink-detail}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tracklink-detail}}
      template block text
    {{/tracklink-detail}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
