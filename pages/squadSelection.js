const squadSelectionCommands = {
  validatePitchView() {
    this.api
    .assert.containsText('button.draftSelection__luckyDip', 'Gelukstreffer')
    .assert.containsText('.position-utilityplayer>.participant>.participant__name', 'Gouden wissel');
  },
  checkGoalkeeperNumber() {
    const self = this;
    self.api.elements('css selector','div.draftSelectorPositionsGrid .position-keeper .participant', function(result) {
      self.api.assert.equal(result.value.length, 2);
    });
  },
  checkDefenderNumber() {
    const self = this;
    self.api.elements('css selector','div.draftSelectorPositionsGrid .position-verdediging .participant', function(result) {
      self.api.assert.equal(result.value.length, 5);
    });
  },
  checkMidfielderNumber() {
    const self = this;
    self.api.elements('css selector','div.draftSelectorPositionsGrid .position-middenveld .participant', function(result) {
      self.api.assert.equal(result.value.length, 5);
    });
  },
  checkStrikerNumber() {
    const self = this;
    self.api.elements('css selector','div.draftSelectorPositionsGrid .position-aanval .participant', function(result) {
      self.api.assert.equal(result.value.length, 5);
    });
  },
  addKeeper() {
    const self = this;
    self.click('@goalkeeper'); //click on add keeper
    self.api.childLoop('table.participantsTable tr td:nth-child(2)', 'K', 'notEqual', 'innerHTML',
    function(result) {
      self.api.assert.equal(result, 0);
    });
  },
  addDefender(){
    const self = this;
    self.click('@defender'); //click on add keeper
    self.api.childLoop('table.participantsTable tr td:nth-child(2)', 'V', 'notEqual', 'innerHTML',
    function(result) {
      self.api.assert.equal(result, 0);
    });
  },
  addMidfielder(){
    const self = this;
    self.click('@midfielder'); //click on add keeper
    self.api.childLoop('table.participantsTable tr td:nth-child(2)', 'M', 'notEqual', 'innerHTML',
    function(result) {
      self.api.assert.equal(result, 0);
    });
  },
  addStriker(){
    const self = this;
    self.click('@striker'); //click on add keeper
    self.api.childLoop('table.participantsTable tr td:nth-child(2)', 'A', 'notEqual', 'innerHTML',
    function(result) {
      self.api.assert.equal(result, 0);
    });
  },
  selectLuckyDip() {
    this.click('@luckyDip')
    this.api
      .waitForElementVisible('.overlay__content a[href="/auth/login"]')
      .waitForElementVisible('.overlay__content a[href="/auth/register"]')
  },
  closeLuckyDip() {
    this.api
      .waitForElementVisible('.overlay__inner button.overlay__close')
      .click('.overlay__inner button.overlay__close')
      .waitForElementNotVisible('.overlay__inner button.overlay__close');
  },
  checkLuckyDipPlayers() {
    const self = this;
    self.api.childLoop('.participant>participant__name', '', 'isEqual', 'innerHTML',
      function(result) {
        self.api.assert.equal(result, 0);
      }
    );
  },
  checkGoalkeeperProfile() {
    this.click('@goalkeeper');
    this.api
      .waitForElementPresent('.participant__tooltip>button:first-child')
      .click('.participant__tooltip>button:first-child')
      .waitForElementPresent('.profile.active')
      .expect.element('.profile__group--type').text.to.equal('K');
    this.api
      .click('.profile.active .profile__backButton')
      .waitForElementNotPresent('.profile.active');
  },
  checkDefenderProfile() {
    this.api.pause(500);
    this.click('@defender');
    this.api
      .waitForElementPresent('.participant__tooltip>button:first-child')
      .click('.participant__tooltip>button:first-child')
      .waitForElementPresent('.profile.active')
      .expect.element('.profile__group--type').text.to.equal('V');
    this.api
      .click('.profile.active .profile__backButton')
      .waitForElementNotPresent('.profile.active');
  },
  checkMidfielderProfile() {
    this.api.pause(500);
    this.click('@midfielder');
    this.api
      .waitForElementPresent('.participant__tooltip>button:first-child')
      .click('.participant__tooltip>button:first-child')
      .waitForElementPresent('.profile.active')
      .expect.element('.profile__group--type').text.to.equal('M');
    this.api
      .click('.profile.active .profile__backButton')
      .waitForElementNotPresent('.profile.active');
  },
  checkStrikerProfile() {
    this.api.pause(500);
    this.click('@striker');
    this.api
      .waitForElementPresent('.participant__tooltip>button:first-child')
      .click('.participant__tooltip>button:first-child')
      .waitForElementPresent('.profile.active')
      .expect.element('.profile__group--type').text.to.equal('A');
    this.api
      .click('.profile.active .profile__backButton')
      .waitForElementNotPresent('.profile.active');
  },
  checkTeamBadges() {
    const self = this;
    self.api.execute(function() {
      const badgeArr = [];
      const myNodeList = document.querySelectorAll('.participant__badge');
      for (let i = 0; i < myNodeList.length; ++i) {
        const imgPath = myNodeList[i].src;
        const imgName = (imgPath.split('/').pop()).split('.').shift();//get just the numbers from file src

        if (typeof badgeArr[imgName] === 'undefined') {
          badgeArr[imgName] = i;// make array entry
        } else {
          return 1;// duplicate badge, failure
        }
      }
      return 0;
    }, function(result) {
      // if any empties found fail
      console.log('Number of Duplicate Badges');
      self.api.assert.equal(result.value, 0);
    });
  },
  playerDropdown() {
    this.api
      .pause(500);
    this.click('@striker');
    this.api
      .waitForElementPresent('.participant__tooltip>button:first-child')
      .click('.participant__tooltip>button:nth-child(2)')
      .pause(500)
      .expect.element('div.draftSelectorPositionsGrid .position-aanval .participant:first-child .participant__name').text.to.equal('');
      // player is now blank
    this.api
    .waitForElementPresent('section.draftSelection__selector button.draftSelection__luckyDip');
    // lucky dip button is back
  },
  removeTeam() {
    const self = this;
    self.api
    .pause(500)
    .click('button.draftSelection__clearSquad');

    self.api.childLoop('.participant>participant__name', '', 'notEqual', 'innerHTML',
      function(result) {
        self.api.assert.equal(result, 0);
      }
    );
    self.api.waitForElementNotPresent('button.draftSelection__clearSquad');
  },

};

export default {
  url: 'http://www.profcoach.nl/squad-selection',
  commands: [squadSelectionCommands],
  elements: {
    goalkeeper: 'div.draftSelectorPositionsGrid .position-keeper .participant',
    defender: 'div.draftSelectorPositionsGrid .position-verdediging .participant',
    midfielder: 'div.draftSelectorPositionsGrid .position-middenveld .participant',
    striker: 'div.draftSelectorPositionsGrid .position-aanval .participant',
    luckyDip: 'section.draftSelection__selector button.draftSelection__luckyDip',
    overlayRegisterButton: '.overlay__content a[href="/auth/register"]',
    onBoardingButton: '.on-boarding__btn',
  },
  sections: {
    draftSelection: {
      selector: 'section.draftSelection__selector',
      elements: {
        luckyDip: {
          selector: 'button.draftSelection__luckyDip',
        },
        utilityPlayer: {
          selector: '.position-utilityplayer>.participant>.participant__name',
        },
        infoBox: {
          selector: '.draftSelection__infoBox>p',
        },
        clearSquad: {
          selector: 'button.draftSelection__clearSquad',
        },
        onBoardingActive: {
          selector: '.boarding-active',
        },
      },
      sections: {
        infoBox: {
          selector: '.draftSelection__infoBox',
          elements: {
            login: {
              selector: 'a[href="/auth/login"]',
            },
            register: {
              selector: 'a[href="/auth/register"]',
            },
            message: {
              selector: 'p',
            },
          },
        },
      },
    },
    participantsList: {
      selector: '.participantslist',
      elements: {
        backButton: '.participantslist__goback',
      },
    },
    overlay: {
      selector: '.overlay__content',
      elements: {
        register: 'a[href="/auth/register"]',
      },
    },
    onBoarding: {
      selector: '.on-boarding',
      elements: {
        captain: {
          selector: '.captain',
        },
        viceCaptain: {
          selector: '.viceCaptain',
        },
        captainText: {
          selector: '.on-boarding__captain',
        },
        substitutes: {
          selector: '.on-boarding__subs',
        },
        navigation: {
          selector: '.on-boarding__nav',
        },
      },
    },
  },
};
