const registrationCommmands = {
  tryRegistrationWithoutInput() {
    this
      .waitForElementPresent('@emailInput')
      .waitForElementPresent('@submitLogin')
      .waitForElementPresent('@loginErrorMessages')
      .click('@submitLogin');
  },
  tryRegistrationWithOnlyEmail() {
    this
      .setValue('@emailInput', 'testing001@testing.com')
      .click('@submitLogin')
      .waitForElementPresent('@loginErrorMessages');
  },
  tryRegistrationWithExistingCredentials() {
    const EXISTING_USER_ONE_EMAIL = process.env.EXISTING_USER_ONE_EMAIL;
    const EXISTING_USER_ONE_PASSWORD = process.env.EXISTING_USER_ONE_PASSWORD;
    this
      .clearValue('@emailInput')
      .clearValue('@passwordInput')
      .setValue('@emailInput', EXISTING_USER_ONE_EMAIL)
      .setValue('@passwordInput', EXISTING_USER_ONE_PASSWORD)
      .click('@submitLogin')
      .waitForElementPresent('@loginErrorMessages');
  },
  tryRegistrationWithNewUser() {
    const self = this;
    self
      .clearValue('@emailInput')
      .clearValue('@passwordInput');
    self.api.execute(function() {
      return randomUser = Math.floor((Math.random() * 1000000000000) + 1);
    },function(result) {
      self.setValue('@emailInput', 'e2e-' + result.value + '-test@chromasports.com');
      self.setValue('@passwordInput', 'randomPass-' + result.value);
      console.log({
        'username': 'e2e-' + result.value + '-test@chromasports.com',
        'password': 'randomPass-' + result.value,
      });
    });
    self.click('@submitLogin');
  },
  selectFavouriteClub() {
    this
      .waitForElementVisible('@favouriteClubButton')
      .click('@favouriteClubButton')
      .waitForElementVisible('@favouriteClubFirstChild')
      .click('@favouriteClubFirstChild');
  },
  tryProceedWithoutTeamAndManagerName() {
    this
      .clearValue('@teamNameInput')
      .clearValue('@managerNameInput')
      .click('@teamNameContinueButton');
  },
  setRandomTeamAndManagerName() {
    const self = this;
    self.api.execute(function() {
      return randomName = Math.floor((Math.random() * 1000000000000) + 1);
    }, function(result) {
      self.setValue('@teamNameInput', 'e2e-' + result.value + ' Van Manager');
      self.setValue('@managerNameInput', 'e2e-' + result.value + ' Van Team name');
      console.log({
        'manager-name': 'e2e-' + result.value + ' Van Manager',
        'team-name': 'e2e-' + result.value + ' Van Team name',
      });
    });
    self.click('@teamNameContinueButton');
  },
  fillProfileFormAndCompleteRegistration() {
    this
    .setValue('@profileFirstName', 'e2e-name')
    .setValue('@profileSurname', 'e2e-surname')
    .setValue('@profileDob', '12/12/1980')
    .click('@profileAcceptTerms')
    .click('@profileAcceptConditions')
    .click('@profileCreateButton');
  },
};
export default {
  url: 'https://www.profcoach.nl/auth/register',
  commands: [registrationCommmands],
  elements: {
    emailInput: {
      selector: '.login__form--input input[placeholder="E-mail"]',
    },
    passwordInput: {
      selector: '.login__form--input input[placeholder="Wachtwoord"]',
    },
    submitLogin: {
      selector: '.form.login__form button[type="submit"]',
    },
    loginErrorMessages: {
      selector: '.errormessages',
    },
    favouriteClubButton: {
      selector: '.teamname__content button.btn-block',
    },
    favouriteClubFirstChild: {
      selector: '.favouriteClub__teams .favouriteClub__team:first-child',
    },
    teamNameInput: {
      selector: 'input[name="teamName"]',
    },
    managerNameInput: {
      selector: 'input[name="managerName"]',
    },
    teamNameContinueButton: {
      selector: 'button.teamname__continue',
    },
    createProfileButton: {
      selector: '.create-profile button[type="submit"]',
    },
    profileFirstName: {
      selector: 'input[name="firstname"]',
    },
    profileSurname: {
      selector: 'input[name="surname"]',
    },
    profileDob: {
      selector: 'input[name="dob"]',
    },
    profileAcceptTerms: {
      selector: 'input[name="acceptTerms"]',
    },
    profileAcceptConditions: {
      selector: 'input[name="acceptConditions"]',
    },
    profileCreateButton: {
      selector: '.create-profile__submit button[type="submit"]',
    },
  },
  sections: {
    loginErrorMessages: {
      selector: '.errormessages',
      elements: {
        messageOne: {
          selector: 'p:first-child',
        },
        messageTwo: {
          selector: 'p:nth-child(2)',
        },
      },
    },
    teamNameErrorMessages: {
      selector: '.teamname__content',
      elements: {
        messageOne: {
          selector: '.errormessages--error',
        },
        messageTwo: {
          selector: '.tempErrorMessage',
        },
      },
    },
    createProfileErrorMessages: {
      selector: '.create-profile .errormessages',
      elements: {
        messageOne: {
          selector: 'p:first-child',
        },
        messageTwo: {
          selector: 'p:nth-child(2)',
        },
        messageThree: {
          selector: 'p:nth-child(3)',
        },
        messageFour: {
          selector: 'p:nth-child(4)',
        },
        messageFive: {
          selector: 'p:nth-child(5)',
        },
      },
    },
  },
};
