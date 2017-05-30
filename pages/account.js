const accountCommands = {
  checkSeasonPointsAgainstPointsPage(navigation, points) {
    const self = this;
    let accountPoints;
    let pointsPageSeasonPoints;
    self.getText('@accountSeasonPointsValue', function(result) {
      accountPoints = result.value;
      console.log('account points:', accountPoints);
    });
    navigation.click('@points');
    points.waitForElementPresent('@seasonPointsSummary');
    points.getText('@seasonPointsSummary', function(result) {
      pointsPageSeasonPoints = result.value;
      console.log('points page points:', pointsPageSeasonPoints);
      self.api.assert.equal(accountPoints, pointsPageSeasonPoints);
    });
  },
  checkCurrentPositionAgainstLeaguesPage(navigation, leagues) {
    const self = this;
    let accountPosition;
    let leaguesPosition;
    self.getText('@currentPositionValue', function(result) {
      accountPosition = result.value;
      console.log('current position:', accountPosition);
    });
    navigation.click('@leagues');
    leagues.waitForElementPresent('@leaguePositionPublicValue');
    leagues.getText('@leaguePositionPublicValue', function(result) {
      leaguesPosition = result.value.replace(/\D/g, '');
      console.log('league Position:', leaguesPosition);
      self.api.assert.equal(accountPosition, leaguesPosition);
    });
  },
  checkTeamNameField(navigation, leagues) {
    const self = this;
    let accountTeamName;
    let leaguesTeamName;
    self.waitForElementPresent('@teamName');
    self.getText('@teamName', function(result) {
      accountTeamName = result.value;
      console.log('account team name:', accountTeamName);
    });
    navigation.click('@leagues');
    leagues.waitForElementPresent('@leaguePositionPublicValue');
    leagues.click('@leaguePositionPublicValue');
    leagues.waitForElementPresent('@userRowTeamName');
    leagues.getText('@userRowTeamName', function(result) {
      leaguesTeamName = result.value;
      console.log('league team name:', accountTeamName);
      self.api.assert.equal(accountTeamName, leaguesTeamName);
    });
  },
  editAccountAndCancel(userFirstName, userSurname, userTeamName, userManagerName, userFirstNameUpdated, userSurnameUpdated, userTeamNameUpdated, userManagerNameUpdated, userUpdatedPassword) {
    this
      .clearValue('@editFirstNameInput')
      .setValue('@editFirstNameInput', userFirstNameUpdated)
      .clearValue('@editSurnameInput')
      .setValue('@editSurnameInput', userSurnameUpdated)
      .clearValue('@editTeamNameInput')
      .setValue('@editTeamNameInput', userTeamNameUpdated)
      .clearValue('@editManagerNameInput')
      .setValue('@editManagerNameInput', userManagerNameUpdated)
      .click('@cancelAccountChangesButton');
    this.waitForElementPresent('@firstName');
    this.expect.element('@firstName').text.to.equal(userFirstName);
    this.expect.element('@surname').text.to.equal(userSurname);
    this.expect.element('@teamName').text.to.equal(userTeamName);
    this.expect.element('@managerName').text.to.equal(userManagerName);
  },
  // editAccountSubmitBlankFields(userFirstName, userSurname, userTeamName, userManagerName) {
  //   this
  //     .clearValue('@editFirstNameInput')
  //     .clearValue('@editSurnameInput')
  //     .clearValue('@editTeamNameInput')
  //     .clearValue('@editManagerNameInput')
  // },
  changePasswordandLogIn(email, password, navigation, loginPage) {
    this
      .setValue('@editPasswordInput', password)
      .click('@submitAccountChangesButton')
      .click('@submitOverlayClose');
    navigation
      .click('@logOut')
      .waitForElementPresent('@logIn')
      .click('@logIn');
    loginPage.login(email, password);
  },
};
export default {
  url: 'https://www.profcoach.nl/account',
  commands: [accountCommands],
  elements: {
    accountDiv: '.account',
    accountName: '.account__accounttitle--name',
    accountSurname: '.account__accounttitle--surname',
    accountSeasonPointsValue: '.account__points .account__nums',
    currentPositionValue: '.account__currentposition .account__nums',
    accountClubValue: '.account__club .account__nums',
    passwordField: '.account__editpass--edit',
    editAccount: '.account button.account__profile--edit',
    editFirstNameInput: '.account__accounttitle--inpname input',
    firstName: '.account__accounttitle--name',
    editSurnameInput: '.account__accounttitle--inpsurname input',
    surname: '.account__accounttitle--surname',
    editPasswordInput: '.account__editpass input',
    editTeamNameInput: '.account__info--left input:nth-child(2)',
    teamName: '.account__info--left .account__info--copy:nth-child(2)',
    editManagerNameInput: '.account__info--left input:nth-child(4)',
    managerName: '.account__info--left .account__info--copy:nth-child(4)',
    gameUpdatesUncheckableCheckbox: '.account__emailprefs--left:nth-child(2) .account__emailprefs--greenbox.checked',
    subLeagueUpdatesUncheckableCheckbox: '.account__emailprefs--left:nth-child(4) .account__emailprefs--greenbox.checked',
    tAndCsUncheckableCheckbox: '.account__reqcon--left:nth-child(2) .account__reqcon--greenbox.checked',
    rulesUncheckableCheckbox: '.account__reqcon--left:nth-child(4) .account__reqcon--greenbox.checked',
    gameUpdatesCheckbox: '.account__emailprefs--left:nth-child(2) .form-group input[type=checkbox]',
    subLeagueUpdatesCheckbox: '.account__emailprefs--left:nth-child(4) .form-group input[type=checkbox]',
    cancelAccountChangesButton: '.account__submit button:first-child',
    submitAccountChangesButton: '.account__submit button:nth-child(2)',
    submitOverlayMessage: '.account .account__overlaycontent',
    submitOverlayClose: '.account .overlay__close',
  },
};
