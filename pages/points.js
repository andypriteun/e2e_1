const pointsCommands = {
  getKeeperDetails(keeperNumber, keeperName) {
    const self = this;
    self.api.elements('css selector', 'div.draftSelectorPositionsGrid .position-keeper .participant', function(result) {
      keeperNumber = result.value.length;
      for(let i = 0; i < keeperNumber; i++) {
        self.getText('div.draftSelectorPositionsGrid .position-keeper:nth-child(' + (i + 1) + ') .participant__name', function(result){
          keeperName.push(result.value);
        });
      }
    });
  },
  getDefenderDetails(defenderNumber, defenderNames) {
    const self = this;
    self.api.elements('css selector', 'div.draftSelectorPositionsGrid .position-verdediging .participant', function(result) {
      defenderNumber = result.value.length;
      for(let i = 0; i < defenderNumber; i++) {
        self.getText('div.draftSelectorPositionsGrid .position-verdediging .defender:nth-child(' + (i + 1) + ') .participant__name', function(result){
          defenderNames.push(result.value);
        });
      }
    });
  },
  getMidfielderDetails(midfielderNumber, midfielderNames) {
    const self = this;
    self.api.elements('css selector', 'div.draftSelectorPositionsGrid .position-middenveld .participant', function(result) {
      midfielderNumber = result.value.length;
      for(let i = 0; i < midfielderNumber; i++) {
        self.getText('div.draftSelectorPositionsGrid .position-middenveld .midfielder:nth-child(' + (i + 1) + ') .participant__name', function(result){
          midfielderNames.push(result.value);
        });
      }
    });
  },
  getStrikerDetails(strikerNumber, strikerNames) {
    const self = this;
    self.api.elements('css selector', 'div.draftSelectorPositionsGrid .position-aanval .participant', function(result) {
      strikerNumber = result.value.length;
      for(let i = 0; i < strikerNumber; i++) {
        self.getText('div.draftSelectorPositionsGrid .position-aanval .striker:nth-child(' + (i + 1) + ') .participant__name', function(result){
          strikerNames.push(result.value);
        });
      }
    });
  },
  getSubsDetails(subsNames, subsNumber) {
    for(let i = 0; i < subsNumber; i++) {
      this.getText('.subsLayout__participants .participant:nth-child(' + (i + 1) + ') .participant__name', function(result) {
        subsNames.push(result.value);
      });
    }
  },
  checkTeamsMatch(pointsPlayer, teamPlayer) {
    const self = this;
    self.api.perform(function(client, done) {
      for(let i = 0; i < pointsPlayer.length; i++) {
        self.api.assert.equal(pointsPlayer[i], teamPlayer[i]);
      }
      done();
    });
  },
  checkPlayerListColumns() {
    const self = this;
    self.expect.element('@playerListHeaderClub').text.to.equal('Club');
    self.expect.element('@playerListHeaderPosition').text.to.equal('Pos');
    self.expect.element('@playerListHeaderName').text.to.equal('Speler');
    self.expect.element('@playerListHeaderSeasonPoints').text.to.equal('Ptn dit\nseizoen');
    self.expect.element('@playerListHeaderRoundPoints').text.to.equal('Ptn deze\nronde');
    self.api.perform(function(client, done) {
      for(let i = 0; i < 11; i++) {
        self.getText('.flex-table__body .flex-table__row:nth-child(' + (i + 1) + ') .flex-table__cell--club', function(result) {
          if(result.value.length === 3 || 2) {
            self.api.assert.ok(true, 'club short name length matches');
          } else {
            self.api.assert.fail(true);
          }
          self.expect.element('.flex-table__body .flex-table__row:nth-child(' + (i + 1) + ') .flex-table__cell--club').text.to.match(/[A-Z0-9]/);
        });
      }
      for(let i = 0; i < 7; i++) {
        self.getText('.flex-table__body .flex-table__row:nth-child(' + (i + 13) + ') .flex-table__cell--club', function(result) {
          if(result.value.length === 3 || 2) {
            self.api.assert.ok(true, 'club short name length matches');
          } else {
            self.api.assert.fail(true);
          }
          self.expect.element('.flex-table__body .flex-table__row:nth-child(' + (i + 13) + ') .flex-table__cell--club').text.to.match(/[A-Z0-9]/);
        });
      }
      done();
    });
    self.api.perform(function(client, done) {
      for(let i = 0; i < 11; i++) {
        self.getText('.flex-table__body .flex-table__row:nth-child(' + (i + 1) + ') .flex-table__cell--pos', function(result) {
          if(['K', 'V', 'M', 'A'].indexOf(result.value) !== -1) {
            self.api.assert.ok(true, 'player position matches: ' + result.value);
          } else {
            self.api.assert.fail(true, 'player position doesn\'t match');
          }
        });
      };
      for(let i = 0; i < 7; i++) {
        self.getText('.flex-table__body .flex-table__row:nth-child(' + (i + 13) + ') .flex-table__cell--pos', function(result) {
          if(['K', 'V', 'M', 'A'].indexOf(result.value) !== -1) {
            self.api.assert.ok(true, 'player position matches: ' + result.value);
          } else {
            self.api.assert.fail(true);
          }
        });
      }
      done();
    });
    self.api.perform(function(client, done) {
      for(let i = 0; i < 11; i++) {
        self.getText('.flex-table__body .flex-table__row:nth-child(' + (i + 1) + ') .flex-table__cell--points:nth-child(6)', function(result) {
          if(/^-?\d+(\.\d+)?$/.test(result.value)) {
            self.api.assert.ok(true, 'points matches a number: ' + result.value);
          } else {
            self.api.assert.fail(true, 'points do not match');
          }
        });
      };
      // for(let i = 0; i < 7; i++) {
      // }
      done();
    });
  },
  checkCurrentRoundPlayerPointsEqualZero() {
    const self = this;
    self.api.elements('css selector', 'div.draftSelectorPositionsGrid .position-keeper .participant', function(result) {
      for(let i = 0; i < result.value.length; i++) {
        self.getText('div.draftSelectorPositionsGrid .keeper:nth-child(' + (i + 1) + ') .participant__info--points', function(result){
          self.api.assert.equal(result.value, '0ptn', 'GK current points (outside of lockdown) equals zero');
        });
      }
    });
    self.api.elements('css selector', 'div.draftSelectorPositionsGrid .position-verdediging .participant', function(result) {
      for(let i = 0; i < result.value.length; i++) {
        self.getText('div.draftSelectorPositionsGrid .defender:nth-child(' + (i + 1) + ') .participant__info--points', function(result){
          self.api.assert.equal(result.value, '0ptn', 'DEF current points (outside of lockdown) equals zero');
        });
      }
    });
    self.api.elements('css selector', 'div.draftSelectorPositionsGrid .position-middenveld .participant', function(result) {
      for(let i = 0; i < result.value.length; i++) {
        self.getText('div.draftSelectorPositionsGrid .midfielder:nth-child(' + (i + 1) + ') .participant__info--points', function(result){
          self.api.assert.equal(result.value, '0ptn', 'MID current points (outside of lockdown) equals zero');
        });
      }
    });
    self.api.elements('css selector', 'div.draftSelectorPositionsGrid .position-aanval .participant', function(result) {
      for(let i = 0; i < result.value.length; i++) {
        self.getText('div.draftSelectorPositionsGrid .striker:nth-child(' + (i + 1) + ') .participant__info--points', function(result){
          self.api.assert.equal(result.value, '0ptn', 'ATT current points (outside of lockdown) equals zero');
        });
      }
    });
      for(let i = 0; i < 7; i++) {
        self.getText('.subsLayout__participants .participant:nth-child(' + (i + 1) + ') .participant__info--points', function(result){
          self.api.assert.equal(result.value, '0ptn', 'SUBS current points (outside of lockdown) equals zero');
        });
      }
  },
  checkSeasonPointsContainsNumber() {
    const self = this;
    self.api.perform(function(client, done) {
      self.getText('.points-summary__total .points-summary__digit', function(result) {
        const formattedResult = result.value.slice(0, -3)
        if(/^-?\d+(\.\d+)?$/.test(formattedResult)) {
          self.api.assert.ok(true, 'total points matches a number: ' + formattedResult);
        } else {
          self.api.assert.fail(true, 'total points do not match a number');
        }
      });
      done();
    });
  },
  checkPitchPointsAgainstRightPlayerList(pitchPointsValues){
    const self = this;
    const rightHandListPointsValues = [];

    // check goalkeeper pitch points
    self.api.elements('css selector', '.position-keeper .participant__info', function(result) {
      for(let i = 0; i < result.value.length; i++) {
        this.getText('.position-keeper .keeper:nth-child(' + (i + 1) + ') .participant__info', function(result) {
          pitchPointsValues.push(result.value.slice(0, -3));
        } )
      }
    });

    // check defender pitch points
    self.api.elements('css selector', '.position-verdediging .participant__info', function(result) {
      for(let i = 0; i < result.value.length; i++) {
        this.getText('.position-verdediging .defender:nth-child(' + (i + 1) + ') .participant__info', function(result) {
          pitchPointsValues.push(result.value.slice(0, -3));
        } )
      }
    });

    // check midfielder pitch points
    self.api.elements('css selector', '.position-middenveld .participant__info', function(result) {

      for(let i = 0; i < result.value.length; i++) {
        this.getText('.position-middenveld .midfielder:nth-child(' + (i + 1) + ') .participant__info', function(result) {
          pitchPointsValues.push(result.value.slice(0, -3));
        })
      }
    });

    // check striker pitch points
    self.api.elements('css selector', '.position-aanval .participant__info', function(result) {
      for(let i = 0; i < result.value.length; i++) {
        this.getText('.position-aanval .striker:nth-child(' + (i + 1) + ') .participant__info', function(result) {
          pitchPointsValues.push(result.value.slice(0, -3));
        } )
      }
    });

    // check subs pitch points
    for(let i = 0; i < 7; i++) {
      self.getText('.subsLayout__participants .participant:nth-child(' + (i + 1) + ') .participant__info', function(result) {
        pitchPointsValues.push(result.value.slice(0, -3));
      });
    }
    // check points from right player list
    for(let i = 0; i < 11; i++) {
      self.getText('.flex-table__points .flex-table__body .flex-table__row:nth-child(' + (i+1) + ') .flex-table__cell--points:last-child', function(result) {
        rightHandListPointsValues.push(result.value);
      });
    }
    // check points from bank
    for(let i = 12; i < 19; i++) {
      self.getText('.flex-table__points .flex-table__body .flex-table__row:nth-child(' + (i+1) + ') .flex-table__cell--points:last-child', function(result) {
        rightHandListPointsValues.push(result.value);
      });
    }

    self.api.perform(function(client, done) {
    // if player is invalid give 0 points
      for(let i = 0; i < pitchPointsValues.length; i++) {
        if (pitchPointsValues[i] == 'ONGEL') {
          pitchPointsValues[i] = '0';
        }
      }
      done()
    });
    self.api.perform(function(client, done) {
      self.api.assert.deepEqual(pitchPointsValues, rightHandListPointsValues, 'Pitch points and Right hands points match')
      done();
    });
    return pitchPointsValues
  },
  checkRoundPointsAndPitchPointsTotal(pitchPointsValues) {
    const self = this;
    self.api.perform(function(client, done) {
    pitchPointsValues = pitchPointsValues.slice(0, -7)
    const pitchPointsValuesTotal = pitchPointsValues.reduce(
      function(total, num) {
        total = parseInt(total);
        num = parseInt(num);
        return total + num;
      }, 0);

      self.getText('.points-summary__round .points-summary__digit', function(result) {
        self.api.assert.equal(pitchPointsValuesTotal,  result.value.slice(0, -3), 'compare round points against team pitch points:', pitchPointsValuesTotal, '=', result.value.slice(0, -3));
      });
        done();
    });
  },
  checkRoundSelectArrows() {
    this.api.assert.cssClassPresent('.period-selector .period-selector__nav--next', 'is-disabled', 'next Arrow is disabled');
    this.api.assert.cssClassNotPresent('.period-selector .period-selector__nav--prev', 'is-disabled', 'previous Arrow is not disabled');
  }
};

export default {
  url: 'https://www.profcoach.nl/points',
  commands: [pointsCommands],
  elements: {
    seasonPointsSummary: '.points-summary .points-summary__total:nth-child(2) .points-summary__digit',
    pointsSection: 'section.draft.points',

    participantPoints: '.participant__info--points',
    playerListHeaderClub: '.flex-table__header .flex-table__cell--club',
    playerListHeaderPosition: '.flex-table__header .flex-table__cell--pos',
    playerListHeaderName: '.flex-table__header .flex-table__cell--name',
    playerListHeaderSeasonPoints: '.flex-table__header .flex-table__cell.flex-table__cell--points:nth-child(5)',
    playerListHeaderRoundPoints: '.flex-table__header .flex-table__cell.flex-table__cell--points:nth-child(6)',
    totalPointsSummary: '.points-summary__total',
    totalPointsSummaryTitle: '.points-summary__total .points-summary__title',
    totalPointsSummaryNumber: '.points-summary__total .points-summary__digit',
    roundPointsSummaryNumber: '.points-summary__round .points-summary__digit',
    roundSelector: '.period-selector',
    roundSelectorHeader: '.period-selector h2',
    roundSelectNext: '.period-selector .period-selector__nav--next',
    roundSelectPrevious: '.period-selector .period-selector__nav--prev',
  },
};
