'use strict';

const path = require('path');
const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('@oligibson/bitmate-generator').TestUtils;

let context;

const files = [
  'client/index.js',
  'client/index.css',
  'client/app/main.css',
  'client/app/main.js',
  'client/app/main.html',
  'client/app/main.spec.js',
  'client/app/index.js'
];

test.before(() => {
  context = TestUtils.mock('basic');
  require('../../generators/basic');
  process.chdir(path.resolve(__dirname, '../../'));
});

test(`Call this.copyTemplate 7 times`, t => {
  const spy = chai.spy.on(context, 'copyTemplate');
  TestUtils.call(context, 'writing', {
    client: 'angular2',
    modules: 'webpack',
    css: 'css',
    js: 'js',
    router: 'uirouter',
    styling: 'bootstrap'
  });
  expect(spy).to.have.been.called.exactly(files.length);
  files.forEach(file => t.true(context.copyTemplate[file].length > 0));
});
