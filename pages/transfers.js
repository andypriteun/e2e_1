export default {
  url: 'http://www.profcoach.nl/transfer',
  elements: {
    onBoardingButton: '.on-boarding__btn',
    transferSection: '.draft.transfer',
    goalkeeper: 'div.draftSelectorPositionsGrid .position-keeper .participant .participant__info--next-match',
    goalkeeperTransfer: '.participant__tooltip--btn:nth-child(2)',
    goalkeeperSelectFromList: '.flex-table__body .participantslist__icon--add',
    goalkeeperTransferConfirm: '.btn-set--inline .btn:last-child',
    goalkeeperTransferConfirmPopUp: '.overlay.active .btn-set--inline .btn:last-child',
    goalkeeperCaptain: 'div.draftSelectorPositionsGrid .position-keeper .participant .participant__captain',
    defender: 'div.draftSelectorPositionsGrid .position-verdediging .participant .participant__info--next-match',
    defenderLeft: 'div.draftSelectorPositionsGrid .position-verdediging .participant:first-child',
    defenderLeftViceCaptain: 'div.draftSelectorPositionsGrid .position-verdediging .participant:first-child .participant__vicecaptain',
    midfielder: 'div.draftSelectorPositionsGrid .position-middenveld .participant  .participant__info--next-match',
    striker: 'div.draftSelectorPositionsGrid .position-aanval .participant .participant__info--next-match',
  },
};
