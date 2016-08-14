"use strict";
const _ = require("lodash");
const Player = require("Player");

class BettingRoundPlayer extends Player {
    setDealer(player, dealer) {
        super(player);
        this.dealer = dealer;
    }
}

class BettingRound {
    constructor(players, smallBlind, bigBlind, numberOfRaises, dealerId) {
        this.players = _.clone(players);
        this.smallBlind = smallBlind;
        this.bigBlind = bigBlind;
        this.numberOfRaises = numberOfRaises;
        let foundUser = _.find(this.players, player => {
            return player.getPlayerInfo().id === dealerId;
        });
        if (foundUser) {
            foundUser.dealer = true;
            this.roundCreated = true;
        } else {
            this.roundCreated = false;
        }
    }

    getRoundConfigs() {
        return {
            smallBlind: this.smallBlind,
            bigBlind: this.bigBlind,
            numberOfRaises: this.numberOfRaises
        };
    }

    getPlayers() {
        return _.map(this.players, player => {
            return player.getPlayerInfo();
        });
    }

    getRoundCreated() {
        return this.roundCreated;
    }
}

module.exports = BettingRound;
