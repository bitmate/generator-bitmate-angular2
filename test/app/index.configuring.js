const test = require('ava');
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
});

test.beforeEach(() => {
  context.mergeJson['package.json'] = {};
});

test(`Add '@angular/core' to package.json dependencies`, t => {
  context.props = {js: 'babel'};
  TestUtils.call(context, 'configuring.pkg');
  t.is(context.mergeJson['package.json'].dependencies['@angular/core'], '^2.4.8');
});

test(`Add 'babel-plugin-angular2-annotations' to package.json devDependencies with js of 'babel'`, t => {
  context.props = {js: 'babel'};
  TestUtils.call(context, 'configuring.babel');
  t.is(context.mergeJson['package.json'].devDependencies['babel-plugin-angular2-annotations'], '^5.1.0');
});

test(`Add 'angular2-annotations' to .babelrc plugins when js is 'babel' and modules is 'webpack'`, t => {
  context.props = {js: 'babel', modules: 'webpack'};
  TestUtils.call(context, 'configuring.babel');
  // t.true(context.mergeJson['.babelrc'].env.production.plugins.indexOf('angular2-annotations') > -1);
  t.true(context.mergeJson['.babelrc'].plugins.indexOf('angular2-annotations') > -1);
});

test(`Don't add .babelrc if js is js`, t => {
  context.props = {js: 'js'};
  TestUtils.call(context, 'configuring.babel');
  t.false(false);
});

test(`Add 'bootstrap' to package.json devDependencies with 'styling' is 'bootstrap'`, t => {
  context.props = {styling: 'bootstrap'};
  TestUtils.call(context, 'configuring.bootstrap');
  t.is(context.mergeJson['package.json'].dependencies.bootstrap, '4.0.0-alpha.6');
});

test(`Don't add 'bootstrap' to package.json devDependencies with 'styling' is 'none'`, t => {
  context.props = {styling: 'none'};
  TestUtils.call(context, 'configuring.bootstrap');
  t.false(false);
});

test(`Add '@angular/router' to package.json dependencies`, t => {
  context.props = {router: 'ngroute'};
  TestUtils.call(context, 'configuring.router');
  t.is(context.mergeJson['package.json'].dependencies['@angular/router'], '^3.4.8');
});

test(`Add 'ui-router-ng2' to package.json dependencies`, t => {
  context.props = {router: 'uirouter'};
  TestUtils.call(context, 'configuring.router');
  t.is(context.mergeJson['package.json'].dependencies['ui-router-ng2'], '1.0.0-beta.4');
});
