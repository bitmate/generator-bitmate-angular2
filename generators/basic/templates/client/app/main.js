var ng = require('@angular/core');

module.exports = ng.Component({
  selector: 'bitmate-app',
  template: require('./main.html')
})
.Class({
  constructor: function () {
    this.hello = 'Hello World!';
  }
});
