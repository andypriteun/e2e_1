export default {
  tags: ['ep-870'],
  'EP 870: Display vital elements upon successful registration': (client) => {
    const navigation = client.page.navigation();
    const squadSelection = client.page.squadSelection();
    const registration = client.page.registration();
    const onBoarding = squadSelection.section.onBoarding;
    navigation.goToHome();
    squadSelection.navigate();
    client.pause(500);
    squadSelection.selectLuckyDip();
    squadSelection.click('@overlayRegisterButton');
    registration.tryRegistrationWithNewUser();
    client.pause(1500);
    registration.selectFavouriteClub();
    client.pause(500);
    registration.setRandomTeamAndManagerName();
    client.pause(500);
    registration.click('@createProfileButton');
    registration.fillProfileFormAndCompleteRegistration();
    onBoarding
      .waitForElementPresent('@captain')
      .waitForElementPresent('@viceCaptain')
      .waitForElementPresent('@captainText')
      .waitForElementPresent('@substitutes')
      .waitForElementPresent('@navigation');
    squadSelection
      .waitForElementPresent('@onBoardingButton')
      .click('@onBoardingButton');
    client.pause(500);
  },
  after: (client) => {
    client.end();
  },
};
