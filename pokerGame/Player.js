"use strict";

class Player {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
        this.hand = [];
    }

    getPlayerInfo() {
        return {
            name: this.name,
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
}

module.exports = Player;
