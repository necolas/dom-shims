// Karma configuration file
//
// For all available config options and default values, see:
// https://github.com/karma-runner/karma/blob/stable/lib/config.js#L54

var fs = require('fs');

module.exports = function (config) {
  'use strict';

  // https://saucelabs.com/platforms
  var customLaunchers = {
    sauceChrome: {
      base: 'SauceLabs',
      browserName: 'Chrome',
      version: '35'
    },
    sauceFirefox: {
      base: 'SauceLabs',
      browserName: 'Firefox',
      version: '29'
    },
    sauceSafari6: {
      base: 'SauceLabs',
      browserName: 'Safari',
      platform: 'OS X 10.8',
      version: '6'
    },
    sauceIE9: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
      platform: 'Windows 7',
      version: '9'
    },
    sauceIE10: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
      platform: 'Windows 8',
      version: '10'
    },
    sauceIE11: {
      base: 'SauceLabs',
      browserName: 'Internet Explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    sauceiOS5: {
      base: 'SauceLabs',
      platform: 'OS X 10.8',
      browserName: 'Iphone',
      version: '5.1'
    },
    sauceiOS7: {
      base: 'SauceLabs',
      platform: 'OS X 10.9',
      browserName: 'Iphone',
      version: '7.1'
    },
    sauceAndroid4: {
      base: 'SauceLabs',
      platform: 'Linux',
      browserName: 'Android',
      version: '4.3'
    }
  };

  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (!process.env.SAUCE_USERNAME) {
    if (!fs.existsSync('sauce.json')) {
      console.log('Missing local sauce.json with SauceLabs credentials.');
      process.exit(1);
    } else {
      process.env.SAUCE_USERNAME = require('./sauce').username;
      process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }
  }

  config.set({
    autoWatch: true,
    basePath: '',
    browsers: [ 'Chrome' ],
    // saucelabs mobile emulation (esp android emulator)
    // can be really slow sometimes, we need to give it time to connect
    browserDisconnectTimeout: 60 * 1000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 60 * 1000,
    captureTimeout: 60 * 1000,
    customLaunchers: customLaunchers,
    files: [
      'index.js',
      'lib/*.js',
      'shim/*.js',
      'test/*.spec.js'
    ],
    frameworks: [
      'commonjs',
      'mocha',
      'chai'
    ],
    preprocessors: {
      'index.js': [ 'commonjs' ],
      'lib/*.js': [ 'commonjs' ],
      'shim/*.js': [ 'commonjs' ],
      'test/*.spec.js': [ 'commonjs' ]
    },
    reporters: [ 'dots' ],
    singleRun: false,
    sauceLabs: {
      accessKey: process.env.SAUCE_KEY,
      'idle-timeout': 1000,
      recordScreenshots: false,
      testName: 'dom-shims unit tests',
      username: process.env.SAUCE_USER
    }
  });

  if (process.env.TRAVIS) {
    var buildLabel = 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';
    config.browsers = Object.keys(customLaunchers);
    config.reporters.push('saucelabs');
    config.sauceLabs.build = buildLabel;

    if (process.env.BROWSER_PROVIDER === 'saucelabs' || !process.env.BROWSER_PROVIDER) {
      // Allocating a browser can take pretty long (eg. if we are out of capacity
      // and need to wait for another build to finish) and so the
      // `captureTimeout` typically kills an in-queue-pending request, which
      // makes no sense.
      config.captureTimeout = 0;
    }
  }
};
