"use strict";

class Player {
    constructor(player) {
        this.id = player.id;
        this.amount = player.amount;
        this.hand = [];
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
}

module.exports = Player;
