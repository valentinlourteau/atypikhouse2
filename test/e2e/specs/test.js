// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 8000)
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Offrez-vous la Magie d"une nuit insolite')
      .assert.elementCount('img', 1)
      .end()
  }
}
