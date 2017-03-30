const bitmate = require('bitmate-generator');

module.exports = bitmate.Base.extend({
  writing() {
    [
      'client/index.js',
      'client/index.css',
      'client/app/main.css',
      'client/app/main.js',
      'client/app/main.html',
      'client/app/main.spec.js',
      'client/app/index.js'
    ].map(file => this.copyTemplate(file, file));
  }
});
