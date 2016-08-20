"use strict";
const _ = require("lodash");
const Player = require("./Player").Player;

class BettingRound {
    constructor(bettingRoundObject) {
        _.assign(this, {
            players: _.map(bettingRoundObject.players, player => {
                return new Player(player);
            }),
            preflop: bettingRoundObject.preflop,
            smallBlind: bettingRoundObject.smallBlind,
            bigBlind: bettingRoundObject.bigBlind,
            numberOfRaises: bettingRoundObject.numberOfRaises,
            dealer: bettingRoundObject.dealer
        });

        if (this.dealer) {
            this.roundCreated = true;
        } else {
            this.roundCreated = false;
        }
        this.decideWhoToStartBetting();
    }

    decideWhoToStartBetting() {
        if (this.preflop) {
            this.decideWhoToBetPreflop();
        } else {
            this.playerToBetNext = this.dealer;
        }
    }

    decideWhoToBetPreflop() {
        if (!this.smallBlind && !this.bigBlind) {
            this.playerToBetNext = this.dealer;
        } else {
            if (this.players.length > 2) {
                let foundDealerIndex = _.findIndex(this.players, player => {
                    return player.toJSON().id === this.dealer.id;
                });
                let potentialIdToBet = foundDealerIndex + 3;
                const wrapAround = this.players.length - 1 - potentialIdToBet;
                const idToBet = wrapAround < 0 ? -wrapAround - 1 : potentialIdToBet;
                this.playerToBetNext = this.players[idToBet];
            }
        }
    }

    toJSON() {
        let json = _.omit(this, ["players", "playerToBetNext"]);
        _.assign(json, {
            players: _.map(this.players, player => {
                return player.toJSON();
            }),
            playerToBetNext: this.playerToBetNext ? this.playerToBetNext.toJSON() : null
        });
        return json;
    }
}

module.exports = BettingRound;
