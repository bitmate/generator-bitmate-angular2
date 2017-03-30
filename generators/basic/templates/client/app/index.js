var ng = require('@angular/core');
var ngPlatformBrowser = require('@angular/platform-browser');
<% if (router === 'uirouter') { -%>
var uiRouter = require('ui-router-ng2');
var myRoutes = require('../routes');
<% } else if (router === 'ngroute') { -%>
var myRoutes = require('../routes');
<% } -%>

var MainComponent = require('./main');

module.exports = ng.NgModule({
  imports: [
    ngPlatformBrowser.BrowserModule,
<% if (router === 'ngroute') { -%>
    myRoutes.routing
<% } else if (router === 'uirouter') { -%>
    uiRouter.UIRouterModule.forRoot({states: myRoutes.STATES, configClass: myRoutes.MyUIRouterConfig})
<% } -%>
  ],
  declarations: [
<% if (router === 'ngroute') { -%>
    myRoutes.RootComponent,
<% } -%>
    MainComponent
  ],
<% if (router === 'uirouter') { -%>
  bootstrap: [uiRouter.UIView]
<% } else if (router === 'ngroute') { -%>
  bootstrap: [myRoutes.RootComponent]
<% } -%>
<% if (router !== 'uirouter') { -%>
})
.Class({
  constructor: function () {}
});
<% } else { -%>
})(
  ng.Class({
    constructor: function () {}
  })
);
<% } -%>
