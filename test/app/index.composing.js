const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('app');
  context.composeWith = () => {};
  require('../../generators/app/index');
});

test('Call this.composeWith once', () => {
  const spy = chai.spy.on(context, 'composeWith');
  TestUtils.call(context, 'composing', {modules: 'webpack', styling: 'bootstrap', router: 'uirouter'});
  expect(spy).to.have.been.called.once();
  expect(spy).to.have.been.called.with(require.resolve('../../generators/basic'));
});
