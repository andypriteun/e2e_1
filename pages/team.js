const teamCommands = {
  pickTeamValidateKeeper() {
    const self = this;
    // select keeper
    self.expect.element('@goalkeeper').to.be.present;
    self.click('@goalkeeper');
    // check if keeper highlighted
    self.verify.cssClassPresent('@goalkeeper', 'selected');
    // check if there is any subs highlighted
    self.api.elements('css selector', '.subsLayout__scrollable .selectable', function(result) {
      self.api.assert.notEqual(result.value.length, -1);
    });
    // validate if highlighted subs are keeper
    self.api.elements('css selector', '.subsLayout__scrollable .selectable', function(result) {
      self.expect.element('@subPosition').text.to.equal('K');
    });
    // validate if dimmed subs are not keeper
    self.api.elements('css selector', '.subsLayout__scrollable .disabled', function(result) {
      self.expect.element('@disabledSubPosition').text.to.not.contain('K');
    });
    // click once again to de-select the keeper
    self.click('@goalkeeper');
  },
  pickTeamValidateDefender() {
    const self = this;
    // select defender
    self.expect.element('@defender').to.be.present;
    self.click('@defender');
    // check if defender highlighted
    self.verify.cssClassPresent('@defender', 'selected');
    // validate if highlighted subs are defender, middlefield or striker
    const validPosition = [
      'v', 'm', 'a',
      // defeender, mid, striker
    ];
    function validateSelectable(elems) {
      elems.value.forEach(function(element) {
        self.api.elementIdText(element.ELEMENT, function(result) {
          console.log('highlighted: ', result.value);
          self.assert.notEqual(validPosition.indexOf(result.value.toLowerCase()), -1);
        });
      });
    }

    self.api.elements('css selector', '.subsLayout__scrollable .selectable .participant__position', validateSelectable);

    // validate if dimmed subs are not defender
    const validDisabledPosition = [
      // defender
      'v',
    ];
    function validateDisabledMid(elems) {
      elems.value.forEach(function(element) {
        self.api.elementIdText(element.ELEMENT, function(result) {
          console.log('disabled: ', result.value);
          self.assert.equal(validDisabledPosition.indexOf(result.value.toLowerCase()), -1);
        });
      });
    }
    self.api.elements('css selector', '.subsLayout__scrollable .disabled .participant__position', validateDisabledMid);
    // check if there is any subs highlighted
    self.api.elements('css selector', '.subsLayout__scrollable .selectable', function(result) {
      console.log('selectable exists: **', result.value)
      self.assert.notEqual(result.value.length, -1);
    });
    // click once again to de-select the defender
    self.click('@defender');
  },
  pickTeamValidateMidfielder() {
    const self = this;
    // select midfielder
    self.expect.element('@midfielder').to.be.present;
    self.click('@midfielder');
    // check if midfielder highlighted
    self.verify.cssClassPresent('@midfielder', 'selected');
    // validate if highlighted subs are defender, midfielder or striker
    const validPosition = [
      'v', 'm', 'a',
      // def, mid, striker
    ];
    function validateSelectable(elems) {
      elems.value.forEach(function(element) {
        self.api.elementIdText(element.ELEMENT, function(result) {
          console.log('highlighted is v,m or a: ', result.value);
          self.api.assert.notEqual(validPosition.indexOf(result.value.toLowerCase()), -1);
        });
      });
    }

    self.api.elements('css selector', '.subsLayout__scrollable .selectable .participant__position', validateSelectable);

    // validate if dimmed subs are not middlefield
    const validDisabledPosition = [
      // middlefield
      'm'
    ];

    function validateDisabledMid(elems) {
      elems.value.forEach(function(element) {
        self.api.elementIdText(element.ELEMENT, function(result) {
          console.log('*disabled is not mid: ', result.value);
          self.api.assert.equal(validDisabledPosition.indexOf(result.value.toLowerCase()), -1);
        });
      });
    }

    self.api.elements('css selector', '.subsLayout__scrollable .disabled .participant__position', validateDisabledMid);

    // check if there is any subs highlighted
    self.api.elements('css selector', '.subsLayout__scrollable .selectable', function (result) {
      console.log('selectable exists: *', result.value);
      self.api.assert.notEqual(result.value.length, -1);
    });

    // click once again to de-select the middlefield
    self.click('@midfielder');
  },
  pickTeamValidateStriker() {
    const self = this;
    // select striker
    self.expect.element('@striker').to.be.present;
    self.click('@striker');
    // check if striker highlighted
    self.verify.cssClassPresent('@striker', 'selected');
    // validate if highlighted subs are defender, middlefield or striker
    const validPosition = [
      'v', 'm', 'a',
      // def, mid, striker
    ];
    function validateSelectable(elems) {
      elems.value.forEach(function(element) {
        self.api.elementIdText(element.ELEMENT, function(result) {
          console.log('highlighted is v,m or a: ', result.value);
          self.api.assert.notEqual(validPosition.indexOf(result.value.toLowerCase()), -1);
        });
      });
    }
    self.api.elements('css selector', '.subsLayout__scrollable .selectable .participant__position', validateSelectable);
    // validate if dimmed subs are not striker
    const validDisabledPosition = [
      // striker
      'a',
    ];
    function validateDisabledMid(elems) {
      elems.value.forEach(function(element) {
        self.api.elementIdText(element.ELEMENT, function(result) {
          console.log('*disabled is not striker: ', result.value);
          self.api.assert.equal(validDisabledPosition.indexOf(result.value.toLowerCase()), -1);
        });
      });
    }
    self.api.elements('css selector', '.subsLayout__scrollable .disabled .participant__position', validateDisabledMid);
    // check if there is any subs highlighted
    self.api.elements('css selector', '.subsLayout__scrollable .selectable', function(result) {
      console.log('selectable exists: *', result.value);
      self.api.assert.notEqual(result.value.length, -1);
    });
    // click once again to de-select the striker
    self.click('@striker');
  },
  attemptSwapKeeperWithInvalidSub() {
    const self = this;
    let keeper; // keeper on grid
    let disabled; // disabled player on bench
    let benchkeeper; // keeper value after disabled player swapping attempt, shouldnt change after clicking disabled player on bench

    // select keeper
    self.api.perform(function(client, done) {
      self.click('@goalkeeper');
      self.api.pause(2000);
      done();
    });

    // try to select dimmed player
    self.api.perform(function(client, done) {
      // assign keeper value on grid
      self.api.elements('css selector', '.position-keeper div.keeper', function(result) {
        keeper = result.value[0].ELEMENT;
      });
      self.api.elements('css selector', '.subsLayout__scrollable div.disabled', function(result) {
        disabled = result.value[0].ELEMENT;
      });
      self.api.pause(2000);
      done();
    });
    self.api.perform(function(client, done) {
      console.log('keeper: ', keeper);
      console.log('disabled: ', disabled);
      console.log('benchkeeper: ', benchkeeper);
      done();
    });
    self.api.perform(function(client, done) {
      self.api.pause(2000);
      self.click('.subsLayout__scrollable div.disabled');
      // assign a value to bench keeper
      self.api.elements('css selector', '.subsLayout__scrollable div.keeper', function(result) {
        benchkeeper = result.value[0].ELEMENT;
      });
      done();
    });
    // validate swap not happend
    self.api.perform(function(client, done) {
      console.log('keeper: ', keeper);
      console.log('disabled: ', disabled);
      console.log('benchkeeper: ', benchkeeper);
      self.assert.notEqual(benchkeeper, keeper);
      done();
    });

    // validate you have only one keeper
    self.api.perform(function(client, done) {
      self.api.elements('css selector', '.position-keeper div.keeper', function(result) {
        self.assert.equal(result.value.length, 1);
      });
      self.api.pause(2000);
      done();
    });
  },
  verifySwapKeeperToBench() {
    const self = this;
    let keeper; // on grid
    let swappedkeeper; // keeper on bench after swapped so it is equal to keeper on grid
    // select keeper on grid
    self.api.perform(function(client, done) {
      self.click('@goalkeeper');
      done();
    });
    // try to swap keeper with keeper on bench
    self.api.perform(function(client, done) {
      // assign keeper value on grid
      self.api.elements('css selector', '.position-keeper div.keeper', function(result) {
        keeper = result.value[0].ELEMENT;
      });
      done();
    });
    self.api.perform(function(client, done) {
      console.log('keeper: ', keeper);
      console.log('swappedkeeper: ', swappedkeeper);
      done();
    });
    self.api.perform(function(client, done) {
      self.api.pause(1000);
      self.click('@subKeeper');
      self.api.elements('css selector', '.position-keeper div.keeper', function(result) {
        console.log(result);
        swappedkeeper = result.value[0].ELEMENT;
      });
      done();
    });

    // validate swap with other keeper from bench happened
    self.api.perform(function(client, done) {
      console.log('keeper: ', keeper);
      console.log('swappedkeeper: ', swappedkeeper);
      self.assert.equal(swappedkeeper, keeper);
      done();
    });
    self.api.pause(1000);
  },
  verifyDefenderSwapRules() {
    const self = this;
    let numberOfDefenders;
    let numberOfMidfielders;
    let numberOfStrikers;
    let numberOfSubDefenders;
    let numberOfSubMidfielders;
    let numberOfSubStrikers;

    // select a defender on grid
    self.api.perform(function(client, done) {
      self.click('@defender');
      done();
    });
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        numberOfDefenders = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        numberOfMidfielders = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        numberOfStrikers = result.value.length;
      });
      // number of Sub defenders on grid
      self.api.elements('css selector', '.subsLayout__scrollable .defender', function (result) {
        numberOfSubDefenders = result.value.length;
      });
      // number of Sub midfields on grid
      self.api.elements('css selector', '.subsLayout__scrollable .midfielder', function (result) {
        numberOfSubMidfielders = result.value.length;
      });
      // number of Sub strikers on grid
      self.api.elements('css selector', '.subsLayout__scrollable .striker', function (result) {
        numberOfSubStrikers = result.value.length;
      });
      done();
    });
    self.api.perform(function(client, done) {
      console.log('numberOfDefenders:', numberOfDefenders);
      console.log('numberOfMidfielders: ', numberOfMidfielders);
      console.log('numberOfStrikers: ', numberOfStrikers);
      console.log('numberOfSubDefenders:', numberOfSubDefenders);
      console.log('numberOfSubMidfielders: ', numberOfSubMidfielders);
      console.log('numberOfSubStrikers: ', numberOfSubStrikers);
      done();
    });
    self.api.perform(function(client, done) {
      // Another 'V position’ player - at any point (straight swap).
      (numberOfSubDefenders >= 1) ? client.assert.ok(true) : client.assert.fail(true);

      // An ‘M position’ player - only if there are < 5 V’s on the pitch AND > 3 M’s.
      if(numberOfDefenders < 5 && numberOfMidfielders > 3) {

        if(numberOfSubMidfielders >= 1) {
          self.api.assert.ok(true);
        } else {
          self.api.assert.fail(true);
        }
      } else {
        self.api.assert.ok(true);
      }
      // An ‘A position’ player - only if there are < 5 V’s on the pitch AND > 1 A.
      if(numberOfDefenders < 5 && numberOfStrikers > 1) {
        if(numberOfSubStrikers >= 1) {
          self.api.assert.ok(true);
        } else {
          self.api.assert.fail(true);
        }
      } else {
        self.api.assert.ok(true);
      }
      done();
    });

    // unselect a defender on grid to copmlete the part
    self.api.perform(function(client, done) {
      self.click('@defender');
      done();
    });
  },

  verifyDefenderStraightSwapFromPitch() {
    var self = this;
    let defender; // on grid
    let swappedDefender; // defender on bench after swapped so it is equal to defender on grid

    // select defender on grid
    self.api.perform(function(client, done) {
      self.click('@defender');
      done();
    });

    // try to swap defender with defender on bench
    self.api.perform(function(client, done) {
      // assign defender value on grid
      self.api.elements('css selector', '.position-verdediging div.defender', function (result) {
        defender = result.value[0].ELEMENT;
      });
      done();
    });

    self.api.perform(function(client, done) {
      console.log('defender: ', defender);
      console.log('swappedDefender: ', swappedDefender);
      done();
    });

    self.api.perform(function(client, done) {
      self.api.pause(1500);
      self.click('@subDefender');
      self.api.elements('css selector', '.position-verdediging div.defender', function (result) {
        swappedDefender = result.value[0].ELEMENT;
      });
      done();
    });

    // validate swap with other defender from bench happened
    self.api.perform(function(client, done) {
      console.log('defender: ', defender);
      console.log('swappedDefender: ', swappedDefender);
      self.api.assert.equal(swappedDefender, defender);
      done();
    });
    self.api.pause(1000);
  },
  verifyDefenderStraightSwapFromBench() {
    const self = this;
    let Defenders;
    let Midfielders;
    let Strikers;
    let SubDefenders;
    let SubMidfielders;
    let SubStrikers;

    // select a defender on bench
    self.api.perform(function(client, done) {
      self.click('@subDefender');
      done();
    });
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        Defenders = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        Midfielders = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        Strikers = result.value.length;
      });
      // number of Sub defenders on grid
      self.api.elements('css selector', '.subsLayout__scrollable .defender', function (result) {
        SubDefenders = result.value.length;
      });
      // number of Sub midfields on grid
      self.api.elements('css selector', '.subsLayout__scrollable .midfielder', function (result) {
        SubMidfielders = result.value.length;
      });
      // number of Sub strikers on grid
      self.api.elements('css selector', '.subsLayout__scrollable .striker', function (result) {
        SubStrikers = result.value.length;
      });

      done();
    });

    self.api.perform(function(client, done) {
      console.log('Defenders:', Defenders);
      console.log('Midfielders: ', Midfielders);
      console.log('Strikers: ', Strikers);
      console.log('SubDefenders:', SubDefenders);
      console.log('SubMidfielders: ', SubMidfielders);
      console.log('SubStrikers: ', SubStrikers);
      done();
    });

    self.api.perform(function(client, done) {
      // Another 'V position’ player - at any point (straight swap).
      (SubDefenders >= 1) ? self.api.assert.ok(true) : self.api.assert.fail(true);
      // An ‘M position’ player - only if there are < 5 V’s on the pitch AND > 3 M’s.
      if(Defenders < 5 && Midfielders > 3) {
        if(SubMidfielders >= 1) {
          self.api.assert.ok(true);
        } else {
          self.api.assert.fail(true);
        }
      } else {
        self.api.assert.ok(true);
      }
      // An ‘A position’ player - only if there are < 5 V’s on the pitch AND > 1 A.
      if(Defenders < 5 && Strikers > 1) {
        if(SubStrikers >= 1) {
          self.api.assert.ok(true);
        } else {
          self.api.assert.fail(true);
        }
      } else {
        self.api.assert.ok(true);
      }
      done();
    });

    self.api.perform(function(client, done) {
      // unselect a defender on bench to copmlete the part
      self.click('@subDefender');
      done();
    });

  },
  swapDefenderWithMidfielderFromBench() {
    const self = this;
    let Defenders;
    let Midfielders;
    let Strikers;
    let SubDefenders;
    let SubMidfielders;
    let SubStrikers;

    // select a defender on bench
    self.api.perform(function(client, done) {
      self.click('@defender');
      done();
    });
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        Defenders = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        Midfielders = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        Strikers = result.value.length;
      });
      // number of Sub defenders on grid
      self.api.elements('css selector', '.subsLayout__scrollable .defender', function (result) {
        SubDefenders = result.value.length;
      });
      // number of Sub midfields on grid
      self.api.elements('css selector', '.subsLayout__scrollable .midfielder', function (result) {
        SubMidfielders = result.value.length;
      });
      // number of Sub strikers on grid
      self.api.elements('css selector', '.subsLayout__scrollable .striker', function (result) {
        SubStrikers = result.value.length;
      });
      done();
    });
    self.api.perform(function(client, done) {
      console.log('Defenders:', Defenders);
      console.log('Midfielders: ', Midfielders);
      console.log('Strikers: ', Strikers);
      console.log('SubDefenders:', SubDefenders);
      console.log('SubMidfielders: ', SubMidfielders);
      console.log('SubStrikers: ', SubStrikers);
      done();
    });
    self.api.perform(function(client, done) {
      // select a midfielder on grid to swap
      self.click('@subMidfielder');
      self.api.pause(1000);
      done();
    });
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        Defenders = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        Midfielders = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        Strikers = result.value.length;
      });
      // number of Sub defenders on grid
      self.api.elements('css selector', '.subsLayout__scrollable .defender', function (result) {
        SubDefenders = result.value.length;
      });
      // number of Sub midfields on grid
      self.api.elements('css selector', '.subsLayout__scrollable .midfielder', function (result) {
        SubMidfielders = result.value.length;
      });
      // number of Sub strikers on grid
      self.api.elements('css selector', '.subsLayout__scrollable .striker', function (result) {
        SubStrikers = result.value.length;
      });
      self.api.pause(1000);
      done();
    });

    self.api.perform(function(client, done) {
      console.log('Defenders:', Defenders);
      console.log('Midfielders: ', Midfielders);
      console.log('Strikers: ', Strikers);
      console.log('SubDefenders:', SubDefenders);
      console.log('SubMidfielders: ', SubMidfielders);
      console.log('SubStrikers: ', SubStrikers);
      done();
    });
  },
  verifyMidfielderSwapRules() {
    const self = this;
    let numberOfDefenders;
    let numberOfMidfielders;
    let numberOfStrikers;
    let numberOfSubDefenders;
    let numberOfSubMidfielders;
    let numberOfSubStrikers;

    self.api.perform(function(client, done) {
      self.click('@midfielder')
      done();
    });
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        numberOfDefenders = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        numberOfMidfielders = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        numberOfStrikers = result.value.length;
      });
      // number of Sub defenders on grid
      self.api.elements('css selector', '.subsLayout__scrollable .defender', function (result) {
        numberOfSubDefenders = result.value.length;
      });
      // number of Sub midfields on grid
      self.api.elements('css selector', '.subsLayout__scrollable .midfielder', function (result) {
        numberOfSubMidfielders = result.value.length;
      });
      // number of Sub strikers on grid
      self.api.elements('css selector', '.subsLayout__scrollable .striker', function (result) {
        numberOfSubStrikers = result.value.length;
      });
      done();
    });

    self.api.perform(function(client, done) {
      console.log('numberOfDefenders:', numberOfDefenders);
      console.log('numberOfMidfielders: ', numberOfMidfielders);
      console.log('numberOfStrikers: ', numberOfStrikers);
      console.log('numberOfSubDefenders:', numberOfSubDefenders);
      console.log('numberOfSubMidfielders: ', numberOfSubMidfielders);
      console.log('numberOfSubStrikers: ', numberOfSubStrikers);
      done();
    });

    self.api.perform(function(client, done) {
      // Another 'D position’ player - at any point (straight swap).
      (numberOfSubMidfielders >= 1) ? client.assert.ok(true) : client.assert.fail(true);

      // An ‘V position’ player - only if there are < 5 M’s on the pitch AND > 3 V’s.
      if(numberOfMidfielders < 5 && numberOfDefenders > 3) {

        if(numberOfSubDefenders >= 1) {
          self.api.assert.ok(true);
        } else {
          self.api.assert.fail(true);
        }
      } else {
        self.api.assert.ok(true);
      }
      // An ‘A position’ player - only if there are < 5 M’s on the pitch AND > 1 A.
      if(numberOfMidfielders < 5 && numberOfStrikers > 1) {
        if(numberOfSubStrikers >= 1) {
          self.api.assert.ok(true);
        } else {
          self.api.assert.fail(true);
        }
      } else {
        self.api.assert.ok(true);
      }
      done();
    });
  },
  verifyMidfielderStraightSwapFromPitch() {
    var self = this;
    let midfielder; // on grid
    let swappedMidfielder; // midfielder on bench after swapped so it is equal to midfielder on grid

    // select midfielder on grid
    self.api.perform(function(client, done) {
      self.click('@midfielder');
      done();
    });

    // try to swap midfielder with midfielder on bench
    self.api.perform(function(client, done) {
      // assign midfielder value on grid
      self.api.elements('css selector', '.position-middenveld div.midfielder', function (result) {
        midfielder = result.value[0].ELEMENT;
      });
      done();
    });

    self.api.perform(function(client, done) {
      console.log('midfielder: ', midfielder);
      console.log('swappedMidfielder: ', swappedMidfielder);
      done();
    });

    self.api.perform(function(client, done) {
      self.api.pause(1500);
      self.click('@subMidfielder');
      self.api.elements('css selector', '.position-middenveld div.midfielder', function (result) {
        swappedMidfielder = result.value[0].ELEMENT;
      });
      done();
    });

    // validate swap with other midfielder from bench happened
    self.api.perform(function(client, done) {
      console.log('midfielder: ', midfielder);
      console.log('swappedMidfielder: ', swappedMidfielder);
      self.api.assert.equal(swappedMidfielder, midfielder);
      done();
    });
    self.api.pause(1000);
  },
  verifyMidfielderStraightSwapFromBench() {
    const self = this;
    let Defenders;
    let Midfielders;
    let Strikers;
    let SubDefenders;
    let SubMidfielders;
    let SubStrikers;

    // select a defender on bench
    self.api.perform(function(client, done) {
      self.click('@subMidfielder');
      done();
    });
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        Defenders = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        Midfielders = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        Strikers = result.value.length;
      });
      // number of Sub defenders on grid
      self.api.elements('css selector', '.subsLayout__scrollable .defender', function (result) {
        SubDefenders = result.value.length;
      });
      // number of Sub midfields on grid
      self.api.elements('css selector', '.subsLayout__scrollable .midfielder', function (result) {
        SubMidfielders = result.value.length;
      });
      // number of Sub strikers on grid
      self.api.elements('css selector', '.subsLayout__scrollable .striker', function (result) {
        SubStrikers = result.value.length;
      });

      done();
    });

    self.api.perform(function(client, done) {
      console.log('Defenders:', Defenders);
      console.log('Midfielders: ', Midfielders);
      console.log('Strikers: ', Strikers);
      console.log('SubDefenders:', SubDefenders);
      console.log('SubMidfielders: ', SubMidfielders);
      console.log('SubStrikers: ', SubStrikers);
      done();
    });

    self.api.perform(function(client, done) {
      // Another 'M position’ player - at any point (straight swap).
      (SubMidfielders >= 1) ? self.api.assert.ok(true) : self.api.assert.fail(true);
      // An ‘V position’ player - only if there are < 5 M’s on the pitch AND > 3 V’s.
      if(Midfielders < 5 && Defenders > 3) {
        if(SubDefenders >= 1) {
          self.api.assert.ok(true);
        } else {
          self.api.assert.fail(true);
        }
      } else {
        self.api.assert.ok(true);
      }
      // An ‘A position’ player - only if there are < 5 V’s on the pitch AND > 1 A.
      if(Midfielders < 5 && Strikers > 1) {
        if(SubStrikers >= 1) {
          self.api.assert.ok(true);
        } else {
          self.api.assert.fail(true);
        }
      } else {
        self.api.assert.ok(true);
      }
      done();
    });

    self.api.perform(function(client, done) {
      // unselect a midfielder on bench to copmlete the part
      self.click('@subMidfielder');
      done();
    });
  },
  swapMidfielderWithDefenderFromBench() {
    const self = this;
    let Defenders;
    let Midfielders;
    let Strikers;
    let SubDefenders;
    let SubMidfielders;
    let SubStrikers;

    // select a defender on bench
    self.api.perform(function(client, done) {
      self.click('@subDefender');
      done();
    });
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        Defenders = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        Midfielders = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        Strikers = result.value.length;
      });
      // number of Sub defenders on grid
      self.api.elements('css selector', '.subsLayout__scrollable .defender', function (result) {
        SubDefenders = result.value.length;
      });
      // number of Sub midfields on grid
      self.api.elements('css selector', '.subsLayout__scrollable .midfielder', function (result) {
        SubMidfielders = result.value.length;
      });
      // number of Sub strikers on grid
      self.api.elements('css selector', '.subsLayout__scrollable .striker', function (result) {
        SubStrikers = result.value.length;
      });
      done();
    });
    self.api.perform(function(client, done) {
      console.log('Defenders:', Defenders);
      console.log('Midfielders: ', Midfielders);
      console.log('Strikers: ', Strikers);
      console.log('SubDefenders:', SubDefenders);
      console.log('SubMidfielders: ', SubMidfielders);
      console.log('SubStrikers: ', SubStrikers);
      done();
    });
    self.api.perform(function(client, done) {
      // select a midfielder on grid to swap
      self.click('@midfielder');
      self.api.pause(1000);
      done();
    });
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        Defenders = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        Midfielders = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        Strikers = result.value.length;
      });
      // number of Sub defenders on grid
      self.api.elements('css selector', '.subsLayout__scrollable .defender', function (result) {
        SubDefenders = result.value.length;
      });
      // number of Sub midfields on grid
      self.api.elements('css selector', '.subsLayout__scrollable .midfielder', function (result) {
        SubMidfielders = result.value.length;
      });
      // number of Sub strikers on grid
      self.api.elements('css selector', '.subsLayout__scrollable .striker', function (result) {
        SubStrikers = result.value.length;
      });
      self.api.pause(1000);
      done();
    });

    self.api.perform(function(client, done) {
      console.log('Defenders:', Defenders);
      console.log('Midfielders: ', Midfielders);
      console.log('Strikers: ', Strikers);
      console.log('SubDefenders:', SubDefenders);
      console.log('SubMidfielders: ', SubMidfielders);
      console.log('SubStrikers: ', SubStrikers);
      done();
    });
  },
  verifyStrikerSwapRules() {
    const self = this;
    let numberOfDefenders;
    let numberOfMidfielders;
    let numberOfStrikers;
    let numberOfSubDefenders;
    let numberOfSubMidfielders;
    let numberOfSubStrikers;

    self.api.perform(function(client, done) {
      self.click('@striker')
      done();
    });
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        numberOfDefenders = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        numberOfMidfielders = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        numberOfStrikers = result.value.length;
      });
      // number of Sub defenders on grid
      self.api.elements('css selector', '.subsLayout__scrollable .defender', function (result) {
        numberOfSubDefenders = result.value.length;
      });
      // number of Sub midfields on grid
      self.api.elements('css selector', '.subsLayout__scrollable .midfielder', function (result) {
        numberOfSubMidfielders = result.value.length;
      });
      // number of Sub strikers on grid
      self.api.elements('css selector', '.subsLayout__scrollable .striker', function (result) {
        numberOfSubStrikers = result.value.length;
      });
      done();
    });

    self.api.perform(function(client, done) {
      console.log('numberOfDefenders:', numberOfDefenders);
      console.log('numberOfMidfielders: ', numberOfMidfielders);
      console.log('numberOfStrikers: ', numberOfStrikers);
      console.log('numberOfSubDefenders:', numberOfSubDefenders);
      console.log('numberOfSubMidfielders: ', numberOfSubMidfielders);
      console.log('numberOfSubStrikers: ', numberOfSubStrikers);
      done();
    });

    self.api.perform(function(client, done) {
      // Another 'A position’ player - at any point (straight swap).
      (numberOfSubStrikers >= 1) ? client.assert.ok(true) : client.assert.fail(true);

      // A 'V position’ player - only if there is > 3 V’s on the pitch AND < 3 A’s on the pitch.
      if(numberOfStrikers < 3 && numberOfDefenders > 3) {
        if(numberOfSubDefenders >= 1) {
          self.api.assert.ok(true);
        } else {
          self.api.assert.fail(true);
        }
      } else {
        self.api.assert.ok(true);
      }
      // A ‘M position’ player - only if there is > 3 M’s on the pitch AND < 3 A’s on the pitch.
      if(numberOfStrikers < 3 && numberOfMidfielders > 3) {
        if(numberOfSubMidfielders >= 1) {
          self.api.assert.ok(true);
        } else {
          self.api.assert.fail(true);
        }
      } else {
        self.api.assert.ok(true);
      }
      done();
    });
  },
  verifyStrikerStraightSwapFromPitch() {
    var self = this;
    let striker; // on grid
    let swappedStriker; // striker on bench after swapped so it is equal to midfielder on grid

    // select striker on grid
    self.api.perform(function(client, done) {
      self.click('@striker');
      done();
    });

    // try to swap striker with striker on bench
    self.api.perform(function(client, done) {
      // assign striker value on grid
      self.api.elements('css selector', '.position-aanval div.striker', function (result) {
        striker = result.value[0].ELEMENT;
      });
      done();
    });

    self.api.perform(function(client, done) {
      console.log('striker: ', striker);
      console.log('swappedStriker: ', swappedStriker);
      done();
    });

    self.api.perform(function(client, done) {
      self.api.pause(1500);
      self.click('@subStriker');
      self.api.elements('css selector', '.position-aanval div.striker', function (result) {
        swappedStriker = result.value[0].ELEMENT;
      });
      done();
    });

    // validate swap with other striker from bench happened
    self.api.perform(function(client, done) {
      console.log('striker: ', striker);
      console.log('swappedStriker: ', swappedStriker);
      self.api.assert.equal(swappedStriker, striker);
      done();
    });
    self.api.pause(1000);
  },
  verifyStrikerStraightSwapFromBench() {
    const self = this;
    let Defenders;
    let Midfielders;
    let Strikers;
    let SubDefenders;
    let SubMidfielders;
    let SubStrikers;

    // select a defender on bench
    self.api.perform(function(client, done) {
      self.click('@subStriker');
      done();
    });
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        Defenders = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        Midfielders = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        Strikers = result.value.length;
      });
      // number of Sub defenders on grid
      self.api.elements('css selector', '.subsLayout__scrollable .defender', function (result) {
        SubDefenders = result.value.length;
      });
      // number of Sub midfields on grid
      self.api.elements('css selector', '.subsLayout__scrollable .midfielder', function (result) {
        SubMidfielders = result.value.length;
      });
      // number of Sub strikers on grid
      self.api.elements('css selector', '.subsLayout__scrollable .striker', function (result) {
        SubStrikers = result.value.length;
      });

      done();
    });

    self.api.perform(function(client, done) {
      console.log('Defenders:', Defenders);
      console.log('Midfielders: ', Midfielders);
      console.log('Strikers: ', Strikers);
      console.log('SubDefenders:', SubDefenders);
      console.log('SubMidfielders: ', SubMidfielders);
      console.log('SubStrikers: ', SubStrikers);
      done();
    });

    self.api.perform(function(client, done) {
      // Another 'A position’ player - at any point (straight swap).
      (SubStrikers >= 1) ? self.api.assert.ok(true) : self.api.assert.fail(true);
      // An ‘V position’ player - only if there are > 3 V’s on the pitch AND < 3 A’s.
      if(Strikers < 3 && Defenders > 3) {
        if(SubDefenders >= 1) {
          self.api.assert.ok(true);
        } else {
          self.api.assert.fail(true);
        }
      } else {
        self.api.assert.ok(true);
      }
      // An ‘M position’ player - only if there are < 3 M’s on the pitch AND > 3 A's.
      if(Midfielders < 3 && Strikers > 3) {
        if(SubMidfielders >= 1) {
          self.api.assert.ok(true);
        } else {
          self.api.assert.fail(true);
        }
      } else {
        self.api.assert.ok(true);
      }
      done();
    });

    self.api.perform(function(client, done) {
      // unselect a Striker on bench to copmlete the part
      self.click('@subStriker');
      done();
    });
  },
  swapStrikerWithMidfielderFromBench() {
    const self = this;
    let Defenders;
    let Midfielders;
    let Strikers;
    let SubDefenders;
    let SubMidfielders;
    let SubStrikers;

    // select a striker
    self.api.perform(function(client, done) {
      self.click('@striker');
      done();
    });
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        Defenders = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        Midfielders = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        Strikers = result.value.length;
      });
      // number of Sub defenders on grid
      self.api.elements('css selector', '.subsLayout__scrollable .defender', function (result) {
        SubDefenders = result.value.length;
      });
      // number of Sub midfields on grid
      self.api.elements('css selector', '.subsLayout__scrollable .midfielder', function (result) {
        SubMidfielders = result.value.length;
      });
      // number of Sub strikers on grid
      self.api.elements('css selector', '.subsLayout__scrollable .striker', function (result) {
        SubStrikers = result.value.length;
      });
      done();
    });
    self.api.perform(function(client, done) {
      console.log('Defenders:', Defenders);
      console.log('Midfielders: ', Midfielders);
      console.log('Strikers: ', Strikers);
      console.log('SubDefenders:', SubDefenders);
      console.log('SubMidfielders: ', SubMidfielders);
      console.log('SubStrikers: ', SubStrikers);
      done();
    });
    self.api.perform(function(client, done) {
      // select a midfielder on bench to swap
      self.click('@subMidfielder');
      self.api.pause(1000);
      done();
    });
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        Defenders = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        Midfielders = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        Strikers = result.value.length;
      });
      // number of Sub defenders on grid
      self.api.elements('css selector', '.subsLayout__scrollable .defender', function (result) {
        SubDefenders = result.value.length;
      });
      // number of Sub midfields on grid
      self.api.elements('css selector', '.subsLayout__scrollable .midfielder', function (result) {
        SubMidfielders = result.value.length;
      });
      // number of Sub strikers on grid
      self.api.elements('css selector', '.subsLayout__scrollable .striker', function (result) {
        SubStrikers = result.value.length;
      });
      self.api.pause(1000);
      done();
    });

    self.api.perform(function(client, done) {
      console.log('Defenders:', Defenders);
      console.log('Midfielders: ', Midfielders);
      console.log('Strikers: ', Strikers);
      console.log('SubDefenders:', SubDefenders);
      console.log('SubMidfielders: ', SubMidfielders);
      console.log('SubStrikers: ', SubStrikers);
      done();
    });
  },
  checkFormationChangePersists(loginPage, EXISTING_USER_TWO_EMAIL, EXISTING_USER_TWO_PASSWORD, navigation) {
    const self = this;
    let defendersPreLogOut;
    let midfieldersPreLogOut;
    let strikersPreLogOut;
    let defendersPostLogIn;
    let midfieldersPostLogIn;
    let strikersPostLogIn;

    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        defendersPreLogOut = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        midfieldersPreLogOut = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        strikersPreLogOut = result.value.length;
      });
      done();
    });
    self.api.perform(function(client, done) {
      console.log('Defenders Pre Log Out:', defendersPreLogOut);
      console.log('Midfielders Pre Log Out: ', midfieldersPreLogOut);
      console.log('Strikers Pre Log Out: ', strikersPreLogOut);
      done();
    });
    self.click('@logOut');
    self.waitForElementPresent('@logIn');
    self.click('@logIn');
    loginPage.login(EXISTING_USER_TWO_EMAIL, EXISTING_USER_TWO_PASSWORD);
    navigation.goToTeam();
    self.api.perform(function(client, done) {
      // number of defenders on grid
      self.api.elements('css selector', '.position-verdediging .defender', function (result) {
        defendersPostLogIn = result.value.length;
      });
      // number of midfields on grid
      self.api.elements('css selector', '.position-middenveld .midfielder', function (result) {
        midfieldersPostLogIn = result.value.length;
      });
      // number of strikers on grid
      self.api.elements('css selector', '.position-aanval .striker', function (result) {
        strikersPostLogIn = result.value.length;
      });
      done();
    });
    self.api.perform(function(client, done) {
      console.log('Defenders Post Log In:', defendersPostLogIn);
      console.log('Midfielders Post Log In: ', midfieldersPostLogIn);
      console.log('Strikers Post Log In: ', strikersPostLogIn);
      done();
    });
    self.api.assert.equal(defendersPreLogOut, defendersPostLogIn);
    self.api.assert.equal(midfieldersPreLogOut, midfieldersPostLogIn);
    self.api.assert.equal(strikersPreLogOut, strikersPostLogIn);

  },
};

export default {
  url: 'http://www.profcoach.nl/team',
  commands: [teamCommands],
  elements: {
    onBoardingButton: '.on-boarding__btn',
    teamSection: '.draft.team',
    goalkeeper: 'div.draftSelectorPositionsGrid .position-keeper .participant .participant__info--next-match',
    goalkeeperCaptain: 'div.draftSelectorPositionsGrid .position-keeper .participant .participant__captain',
    defender: 'div.draftSelectorPositionsGrid .position-verdediging .participant .participant__info--next-match',
    defenderLeft: 'div.draftSelectorPositionsGrid .position-verdediging .participant:first-child',
    defenderLeftViceCaptain: 'div.draftSelectorPositionsGrid .position-verdediging .participant:first-child .participant__vicecaptain',
    midfielder: 'div.draftSelectorPositionsGrid .position-middenveld .participant  .participant__info--next-match',
    striker: 'div.draftSelectorPositionsGrid .position-aanval .participant .participant__info--next-match',
    luckyDip: 'section.draftSelection__selector button.draftSelection__luckyDip',
    overlayRegisterButton: '.overlay__content a[href="/auth/register"]',
    onBoardingButton: '.on-boarding__btn',
    captain: '.draftSelection__layout .captain',
    viceCaptain: '.draftSelection__layout .viceCaptain',
    selectableSub: '.subsLayout__scrollable .selectable',
    disabledSub: '.subsLayout__scrollable .disabled',
    subPosition: '.subsLayout__scrollable .participant__position',
    disabledSubPosition: '.subsLayout__scrollable .disabled .participant__position',
    subKeeper: '.subsLayout__scrollable div.keeper',
    subDefender: '.subsLayout__scrollable div.defender',
    subMidfielder: '.subsLayout__scrollable div.midfielder',
    subStriker: '.subsLayout__scrollable div.striker',
    logOut: '.header .navigation li:nth-child(3) a',
    logIn: '.header .navigation a[href="/auth/login"]',
    pitchSub7name: '.subsLayout__participants .participant:nth-child(7) .participant__name',
  },
};
