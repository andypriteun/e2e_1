const navigationCommands = {
  goToHome() {
    return this.api.resizeWindow(1500, 1000)
      .url('http://www.profcoach.nl/') // this line should be env based
      // .url('http://localhost:8080/')
      .waitForElementVisible('body');
  },
  goToSquadSelection() {
    return this.click('@squadSelection')
      .waitForElementVisible('button.draftSelection__luckyDip');
  },
  goToTeam() {
    return this.click('@team')
      .waitForElementVisible('section.draft.team');
  },
  goToTransfers() {
    return this.click('@transfers')
      .waitForElementVisible('section.draft.transfers');
  },
};

export default {
  url: 'https://www.profcoach.nl/',
  commands: [navigationCommands],
  elements: {
    topNavigation: {
      selector: '.header .navigation',
    },
    mainNavigation: {
      selector: '.header__inner .navigation',
    },
    support: {
      selector: '.header .navigation a:first-of-type',
    },
    register: {
      selector: '.header .navigation a[href="/auth/register"]',
    },
    account: {
      selector: '.header .navigation a[href="/account"]',
    },
    logIn: {
      selector: '.header .navigation a[href="/auth/login"]',
    },
    logOut: {
      selector: '.header .navigation li:nth-child(3) a',
    },
    foxSportsLogo: {
      selector: '.header .header__logos a[href="http://www.foxsports.nl/"] img',
    },
    home: {
      selector: '.header__inner .navigation a[href="/"]',
    },
    squadSelection: {
      selector: '.header__inner .navigation a[href="/squad-selection"]',
    },
    team: {
      selector: '.header__inner .navigation a[href="/team"]',
    },
    points: {
      selector: '.header__inner .navigation a[href="/points"]',
    },
    transfers: {
      selector: '.header__inner .navigation a[href="/transfers"]',
    },
    leagues: {
      selector: '.header__inner .navigation li:nth-child(4) a',
    },
    news: {
      selector: '.header__inner .navigation a[href="/news"]',
    },
    rules: {
      selector: '.header__inner .navigation a[href="/rules"]',
    },
    prizes: {
      selector: '.header__inner .navigation a[href="/prizes"]',
    },
    faq: {
      selector: '.header__inner .navigation a[href="/faq"]',
    },
  },
};
