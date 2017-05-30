export default {
  tags: ['ep-869'],
  'EP-869: Successful user registration from team selection screen': (client) => {
    const navigation = client.page.navigation();
    const squadSelection = client.page.squadSelection();
    const draftSelection = squadSelection.section.draftSelection;
    const registration = client.page.registration();
    const loginErrorMessages = registration.section.loginErrorMessages;
    const teamNameErrorMessages = registration.section.teamNameErrorMessages;
    const createProfileErrorMessages = registration.section.createProfileErrorMessages;
    navigation.goToHome();
    navigation.goToSquadSelection();
    draftSelection.waitForElementPresent('@luckyDip');
    squadSelection.selectLuckyDip();
    squadSelection.click('@overlayRegisterButton');
    registration.tryRegistrationWithoutInput();
    loginErrorMessages.expect.element('@messageOne').text.to.equal('* Je hebt geen e-mailadres ingevoerd');
    loginErrorMessages.expect.element('@messageTwo').text.to.equal('* Je hebt geen wachtwoord ingevoerd');
    registration.tryRegistrationWithOnlyEmail();
    loginErrorMessages.expect.element('@messageOne').text.to.equal('* Je hebt geen wachtwoord ingevoerd');
    registration.tryRegistrationWithExistingCredentials();
    loginErrorMessages.expect.element('@messageOne').text.to.equal('* Deze gebruikersnaam bestaat al');
    registration.tryRegistrationWithNewUser();
    client.pause(1500);
    registration.selectFavouriteClub();
    client.pause(500);
    registration.tryProceedWithoutTeamAndManagerName();
    client.pause(500);
    teamNameErrorMessages.expect.element('@messageOne').text.to.equal('*Helaas, deze teamnaam is al bezet');
    teamNameErrorMessages.expect.element('@messageTwo').text.to.equal('*Wanneer je een team registreert tijdens de transferperlode, zal jouw team pas beschikbaar zijn na de lopende Eredivisie speelronde.');
    registration.setRandomTeamAndManagerName();
    client.pause(500);
    registration.click('@createProfileButton');
    createProfileErrorMessages.expect.element('@messageOne').text.to.equal('* Je hebt geen voornaam ingevuld');
    createProfileErrorMessages.expect.element('@messageTwo').text.to.equal('* Je hebt geen achternaam ingevuld');
    createProfileErrorMessages.expect.element('@messageThree').text.to.equal('* Je hebt geen geen geboortedatum ingevuld');
    createProfileErrorMessages.expect.element('@messageFour').text.to.equal('* Je moet nog akkoord gaan met de algemene voorwoorden, gebruiksvoorwaarden en het privacybeleid');
    createProfileErrorMessages.expect.element('@messageFive').text.to.equal('* Je moet nog akkoord gaan met de Profcoach-spelregels');
    registration.fillProfileFormAndCompleteRegistration();
    client.pause(500);
  },
  after: (client) => {
    client.end();
  },
};
