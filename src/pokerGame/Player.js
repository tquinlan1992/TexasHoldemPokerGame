"use strict";
const _ = require("lodash");

class Player {
    constructor(player) {
        this.id = player.id;
        this.amount = player.amount;
        this.hand = [];
        this.dealer = player.dealer;
    }

    getPlayerInfo() {
        return {
            id: this.id,
            amount: this.amount,
            hand: this.hand
        };
    }

    setAmount(amount) {
        this.amount += amount;
    }

    setHand(hand) {
        this.hand = hand;
    }

    toJSON() {
        let json = _.omit(this, []);
        return json;
    }
}

module.exports = Player;
