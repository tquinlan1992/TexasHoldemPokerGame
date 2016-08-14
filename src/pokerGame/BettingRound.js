"use strict";
const _ = require("lodash");

class BettingRound {
    constructor(players, smallBlind, bigBlind, numberOfRaises, dealerId) {
        this.players = players;
        this.smallBlind = smallBlind;
        this.bigBlind = bigBlind;
        this.numberOfRaises = numberOfRaises;
        let foundUser = _.find(this.players, player => {
            return player.toJSON().id === dealerId;
        });
        if (foundUser) {
            foundUser.dealer = true;
            this.roundCreated = true;
        } else {
            this.roundCreated = false;
        }
    }

    toJSON() {
        let json = _.omit(this, ["players"]);
        json.players = _.map(this.players, player => {
            return player.toJSON();
        });
        return json;
    }
}

module.exports = BettingRound;
