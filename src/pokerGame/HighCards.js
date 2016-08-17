"use strict";
const _ = require("lodash");
const Deck = require("./Deck");

class HighCards {
    constructor(players) {
        var availableCards = new Deck();
        _.forEach(players, player => {
            player.setHand(availableCards.dealCards(1));
        });
        this.winner = _.maxBy(players, player => {
            return player.toJSON().hand[0];
        });
    }

    toJSON() {
        let json = _.omit(this, ["winner"]);
        json.winner = this.winner.toJSON();
        return json;
    }


}

module.exports = HighCards;
