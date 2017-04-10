'use strict';

const bitmate = require('@oligibson/bitmate-generator');

module.exports = bitmate.Base.extend({
  prompting: {
    bitmate() {
      this.options.server = (this.options.server) ? this.options.server : 'none';
      this.options.client = 'angular2';
      return this.bitmatePrompts();
    },

    angularOptions() {
      // Can add more prompts that are angular specific here...
      this.option('router', {type: String, required: true});
      this.option('styling', {type: String, required: false});

      const prompts = [{
        when: !this.options.router,
        type: 'list',
        name: 'router',
        message: 'Would you like a router?',
        choices: [
          {name: 'UI Router', value: 'uirouter'},
          {name: 'Angular Router', value: 'ngroute'}
        ]
      }, {
        when: !this.options.styling,
        type: 'list',
        name: 'styling',
        message: 'Which CSS Styling Framework would you like?',
        choices: [
          {name: 'Bootstrap', value: 'bootstrap'},
          {name: 'None', value: 'none'}
        ]
      }];

      return this.prompt(prompts).then(props => {
        Object.assign(this.props, props);
      });
    }
  },

  configuring: {
    pkg() {
      const pkg = Object.assign({}, {
        name: 'app',
        version: '0.0.0',
        dependencies: {
          '@angular/core': '2.4.10',
          '@angular/compiler': '2.4.10',
          '@angular/common': '2.4.10',
          '@angular/platform-browser': '2.4.10',
          '@angular/platform-browser-dynamic': '2.4.10',
          '@angular/http': '2.4.10',
          rxjs: '5.1.1',
          'zone.js': '0.7.8',
          'core-js': '2.4.1'
        }
      });

      this.mergeJson('package.json', pkg);
    },

    babel() {
      if (this.props.js === 'babel') {
        this.mergeJson('package.json', {
          devDependencies: {
            'babel-plugin-angular2-annotations': '5.1.0',
            'babel-plugin-transform-class-properties': '6.24.1',
            'babel-plugin-transform-decorators-legacy': '1.3.4',
            'babel-plugin-transform-flow-strip-types': '6.22.0'
          }
        });

        const plugins = [
          'angular2-annotations',
          'transform-decorators-legacy',
          'transform-class-properties',
          'transform-flow-strip-types'
        ];

        // if (this.props.modules === 'webpack') {
        //   this.mergeJson('.babelrc', {
        //     env: {
        //       development: {plugins},
        //       production: {plugins}
        //     }
        //   });
        // } else {
        //   this.mergeJson('.babelrc', {plugins});
        // }

        this.mergeJson('.babelrc', {plugins});
      }
    },

    bootstrap() {
      if (this.props.styling === 'bootstrap') {
        this.mergeJson('package.json', {
          dependencies: {
            tether: '1.4.0',
            jquery: '3.2.1',
            bootstrap: '4.0.0-alpha.6'
          }
        });
      }
    },

    router() {
      if (this.props.router === 'ngroute') {
        this.mergeJson('package.json', {
          dependencies: {
            '@angular/router': '3.4.10'
          }
        });
      }
      if (this.props.router === 'uirouter') {
        this.mergeJson('package.json', {
          dependencies: {
            '@angular/router': '3.4.10',
            'ui-router-ng2': '1.0.0-beta.4'
          }
        });
      }
    }
  },

  composing() {
    const options = {
      client: this.props.client,
      modules: this.props.modules,
      html: this.props.html,
      css: this.props.css,
      js: this.props.js,
      router: this.props.router,
      styling: this.props.styling,
      skipInstall: this.props.skipInstall,
      skipCache: this.props.skipCache
    };

    this.composeWith(require.resolve(`../basic`), {options});
  },

  writing() {
    const files = [
      'client/index.html',
      'client/favicon.ico',
      'client/robots.txt',
      'client/.htaccess'
    ];

    files.forEach(file => {
      this.copyTemplate(file, file, this.props);
    });

    if (this.props.router) {
      this.copyTemplate(`client/${this.props.router}/routes.js`, 'client/routes.js', this.props);
    }
  }
});
