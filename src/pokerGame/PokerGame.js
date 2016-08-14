"use strict";
const _ = require("lodash");
const Player = require("./Player");
const PreGameHighCards = require("./PreGameHighCards");
const pokerGameStatuses = require("./constants/pokerGameStatuses");
const TexasHoldemDeck = require("./TexasHoldemDeck");
const texasHoldemDeckConstants = require("./constants/texasHoldemDeck");

class PokerGame {
    constructor(players) {

        this.players = _.map(players, (player) => {
            return new Player(player);
        });

        this.gameStatus = pokerGameStatuses.DEAL_CARDS;
    }

    dealHighCards() {
        new PreGameHighCards(this.players);
        this.gameStatus = pokerGameStatuses.VOTE_FOR_WINNER;
    }

    dealCardsForTexasHoldem() {
        this.texasHoldemDeck = new TexasHoldemDeck(this.players);
        this.gameStatus = pokerGameStatuses.BET_CHECK_OR_FOLD;
    }

    getTexasHoldemTableCards(flopTurnRiver) {
        switch(flopTurnRiver) {
            case texasHoldemDeckConstants.FLOP:
                if (_.chain(texasHoldemDeckConstants).omit("PRE_FLOP").includes(this.texasHoldemDeck.getStatus()).value()) {
                    return this.texasHoldemDeck.getFlop();
                }
        }
    }

    setGameWinner(name) {
        this.gameWinner = name;
    }

    toJSON() {
        let json = _.omit(this, ["players"]);
        json.players = _.map(this.players, player => {
            return player.getPlayerInfo();
        });
        return json;
    }
}

module.exports = PokerGame;
