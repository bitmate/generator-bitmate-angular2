'use strict';

const test = require('ava');
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('@oligibson/bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
});

test(`Set angularOptions router of 'uirouter' and styling of 'bootstrap'`, async t => {
  context.option = () => {
  };
  context.prompt = () => new Promise(resolve => resolve({styling: 'bootstrap', router: 'uirouter'}));
  TestUtils.call(context, 'prompting.angularOptions').then(() => {
    t.is(context.props.router, 'uirouter');
    t.is(context.props.styling, 'bootstrap');
  });
});
