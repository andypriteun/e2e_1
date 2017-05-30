const homePageCommands = {
  goToAppStore() {
    const self = this;
    self.api.click('footer a[href*="itunes.apple.com"]');
    // Jump to new tab
    self.api.window_handles(function(result) {
      const handle = result.value[1];
      self.api.switchWindow(handle);
    });
  },
  closeStore() {
    const self = this;
    self.api.closeWindow();
    // change back to first tab, it doesn't do this when the close the currently selected one
    self.api.window_handles(function(result) {
      const handle = result.value[0];
      self.api.switchWindow(handle);
    });
  },
  goToGooglePlayStore() {
    const self = this;
    self.api.click('footer a[href*="play.google.com"]');
    // Jump to new tab
    self.api.window_handles(function(result) {
      const handle = result.value[1];
      self.api.switchWindow(handle);
    });
  },
};

export default {
  url: 'https://www.profcoach.nl/',
  commands: [homePageCommands],
  elements: {
    homeLoginButton: {
      selector: '.home-container__row--column:nth-child(2) .btn',
    },
    homeSection: {
      selector: '.authenticated-home',
    },
    loadingMessage: {
      selector: '.home-container__rowtop h1',
    },
  },
  sections: {
    footer: {
      selector: 'footer',
      elements: {
        appStore: {
          selector: '.footer__logos--columndouble a[href*="itunes.apple.com"]',
        },
        googlePlay: {
          selector: '.footer__logos--columndouble a[href*="play.google.com"]',
        },
      },
    },
  },
};
