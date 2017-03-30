var ng = require('@angular/core');
var ngRouter = require('@angular/router');
var MainComponent = require('./app/main');

var RootComponent =
  ng.Component({
    selector: 'bitmate-root',
    template: '<router-outlet></router-outlet>'
  })
  .Class({
    constructor: function () {}
  });

var routes = [
  {
    path: '',
    component: MainComponent
  }
];

module.exports = {RootComponent: RootComponent, routes: routes, routing: ngRouter.RouterModule.forRoot(routes)};
