"use strict";
const _ = require("lodash");
const Player = require("./Player").Player;
const bettingRoundConstants = require("./constants/bettingRound");

function findPlayerIndex(id, players) {
    return _.findIndex(players, player => {
        return player.toJSON().id === id;
    });
}

class BettingRound {
    constructor(bettingRoundObject) {
        const originalPlayers = _.map(bettingRoundObject.players, player => {
            return new Player(player);
        });
        _.assign(this, {
            originalPlayers: _.clone(originalPlayers),
            players: _.clone(originalPlayers),
            preflop: bettingRoundObject.preflop,
            smallBlind: bettingRoundObject.smallBlind,
            bigBlind: bettingRoundObject.bigBlind,
            numberOfRounds: bettingRoundObject.numberOfRounds,
            dealer: bettingRoundObject.dealer ? new Player(bettingRoundObject.dealer) : null,
            status: bettingRoundObject.status ? bettingRoundObject.status : bettingRoundConstants.ACTIVE,
            pot: bettingRoundObject.pot ? bettingRoundObject.pot : "0"
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
                let foundDealerIndex = findPlayerIndex(this.dealer.id, this.players);
                let potentialIdToBet = foundDealerIndex + 3;
                const wrapAround = this.players.length - 1 - potentialIdToBet;
                const indexOfPlayerToBet = wrapAround < 0 ? -wrapAround - 1 : potentialIdToBet;
                this.playerToBetNext = this.players[indexOfPlayerToBet];
            }
        }
    }

    placeBet(betObject) {
        if (betObject.id === this.playerToBetNext.toJSON().id) {
            const playerToBetIndex = findPlayerIndex(betObject.id, this.players);
            const playerToBet = this.players[playerToBetIndex];
            playerToBet.editAmount(-betObject.amount);
            this.editPot(betObject.amount);
            return {
                success: true,
                message: "bet placed",
                amountReduced: betObject.amount
            };
        } else {
            return {
                success: false,
                message: "wrong player to bet"
            };
        }
    }

    editPot(amount) {
        this.pot += amount;
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
