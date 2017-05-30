const loginCommands = {

  login(email, pass) {
    this.api.windowMaximize();
    this
      .waitForElementVisible('@loginForm')
      .setValue('@emailInput', email)
      .setValue('@passInput', pass)
      .waitForElementVisible('@loginButton')
      .click('@loginButton');

    this
      .waitForElementVisible('@homeContainer');

    return this;
  },

};

export default {
  url: 'https://www.profcoach.nl/auth/login',
  commands: [loginCommands],
  elements: {
    homeContainer: {
      selector: '.authenticated-home',
    },
    loginForm: {
      selector: '.login__form',
    },
    emailInput: {
      selector: 'input[type=email]',
    },
    passInput: {
      selector: 'input[name=password]',
    },
    loginButton: {
      selector: 'button[type=submit]',
    },
    foxLoginButton: {
      selector: '.login__registervia .btn',
    },
    forgottenPasswordLink: {
      selector: '.login__forgottenpass--link',
    },
  },
};
