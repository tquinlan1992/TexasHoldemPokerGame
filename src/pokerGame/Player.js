"use strict";
const _ = require("lodash");
const bigRat = require("big-rational");

class Player {
    constructor(player) {
        this.id = player.id;
        this.amount = player.amount;
    }

    editAmount(amount) {
        this.amount = bigRat(this.amount).add(amount);
    }

    setHand(hand) {
        this.hand = !this.hand.length ? hand : this.hand;
    }

    toJSON() {
        let json = _.omit(this, ["amount"]);
        _.assign(json, {
            amount: this.amount !== undefined ? bigRat(this.amount).toDecimal(2) : undefined
        });
        return _.omitBy(json, o => o === undefined);
    }
}

class PlayerWithHand extends Player {
    constructor(player) {
        super(player);
        _.assign(this, {
            hand: _.get(player, "hand.length") ? player.hand : []
        });
    }

    setHand(hand) {
        this.hand = !this.hand.length ? hand : this.hand;
    }
}

module.exports = {
    Player: Player,
    PlayerWithHand: PlayerWithHand
};
