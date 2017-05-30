export default {
  tags: ['ep-866'],
  'EP 866: Lucky dip team selection': (client) => {
    const navigation = client.page.navigation();
    const squadSelection = client.page.squadSelection();
    const draftSelection = squadSelection.section.draftSelection;
    const overlay = squadSelection.section.overlay;
    const infoBox = draftSelection.section.infoBox;
    navigation.goToHome();
    navigation.goToSquadSelection();
    draftSelection.waitForElementPresent('@luckyDip');
    draftSelection.expect.element('@luckyDip').text.to.equal('Gelukstreffer');
    draftSelection.expect.element('@utilityPlayer').text.to.equal('Gouden wissel');
    draftSelection.expect.element('@infoBox').text.to.equal('Kies je selectie van 18 spelers (1 per Eredivisie-club). Klik op het plusteken om een speler te selecteren. De Gouden Wissel kan elke veldspeler zijn, ongeacht zijn positie.');
    squadSelection.checkGoalkeeperNumber();
    squadSelection.checkDefenderNumber();
    squadSelection.checkMidfielderNumber();
    squadSelection.checkStrikerNumber();
    squadSelection.addKeeper();
    squadSelection.addDefender();
    squadSelection.addMidfielder();
    squadSelection.addStriker();
    squadSelection.selectLuckyDip();
    squadSelection.closeLuckyDip();
    squadSelection.checkLuckyDipPlayers();
    draftSelection
      .waitForElementNotPresent('@luckyDip')
      .waitForElementPresent('@clearSquad')
      .expect.element('@clearSquad').text.to.equal('Verwijder team');
    draftSelection
      .waitForElementNotPresent('@infoBox');
    infoBox
      .waitForElementPresent('@login')
      .waitForElementPresent('@register')
      .expect.element('@message').text.to.equal('Jouw team is compleet');
    squadSelection.checkGoalkeeperProfile();
    squadSelection.checkDefenderProfile();
    squadSelection.checkMidfielderProfile();
    squadSelection.checkStrikerProfile();
    squadSelection.checkTeamBadges();
    squadSelection.playerDropdown();
    squadSelection.removeTeam();
    client.pause(500);
    draftSelection.click('@luckyDip');
    overlay.waitForElementVisible('@register');
    squadSelection.click('@overlayRegisterButton');
    client
      .pause(2000)
      .waitForElementPresent('body')
      .assert.urlEquals('https://www.profcoach.nl/auth/register');
  },

  after: (client) => {
    client.end();
  },
};
