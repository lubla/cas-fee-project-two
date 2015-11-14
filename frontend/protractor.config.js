var glob = require('glob')
  , buildConfigFile = require('findup-sync')('build.config.js')
  , buildConfig = require(buildConfigFile);

exports.config = {
  baseUrl: 'http://' + buildConfig.host + ':' + buildConfig.port,
  seleniumServerJar: glob.sync('./node_modules/protractor/selenium/selenium-server-standalone-*.jar').join(),
  capabilities: {
    //browserName: 'firefox',
    //browserName: 'ie',
    browserName: 'chrome',
    chromeOptions: {
      args: ['--test-type']
    }
  },

  suites: {
    imageManagement: './build/test/e2e/**/*_test.js'
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
