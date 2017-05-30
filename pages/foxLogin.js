const loginCommands = {

  login(email, pass) {
    this.api.windowMaximize();
    this
      .setValue('@emailInput', email)
      .setValue('@passInput', pass)
      .waitForElementVisible('@loginButton')
      .click('@loginButton');
    return this;
  },

};

export default {
  commands: [loginCommands],
  elements: {
    loginSection: {
      selector: '.dcm-login',
    },

    emailInput: {
      selector: '.dcm-form--signin input[type=email]',
    },
    passInput: {
      selector: '.dcm-form--signin input[name=pwd]',
    },
    loginButton: {
      selector: '.dcm-form--signin button[type=submit]',
    },
    foxUserDropdown: {
      selector: '.dcm-select-wrap #login',
    },
    foxLogOutUser: {
      selector: '.dcm-select-wrap #logoutLink a',
    },
    headerLogin: {
      selector: '#headerLogin',
    },
  },
};
