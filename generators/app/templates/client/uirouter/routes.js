var ng = require('@angular/core');

var MainComponent = require('./app/main');

var STATES = [
  {
    name: 'App',
    url: '/',
    component: MainComponent
  }
];

var MyUIRouterConfig = ng.Class({
  constructor: function () {},

  configure: function (uiRouter) {
    uiRouter.urlRouterProvider.otherwise('App');
  }
});

module.exports = {
  STATES: STATES,
  MyUIRouterConfig: MyUIRouterConfig
};
