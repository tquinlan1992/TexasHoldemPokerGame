"use strict";
const _ = require("lodash");
const Deck = require("./Deck");
const Player = require("./Player").PlayerWithHand;

class HighCards {
    constructor(highCardsValues) {
        var deckObject = new Deck(highCardsValues.deck);
        this.players = _.map(highCardsValues.players, player => {
            return new Player(player);
        });
        _.forEach(this.players, player => {
            player.setHand(deckObject.dealCards(1));
        });
        this.winner = highCardsValues.winner ? new Player(highCardsValues.winner) : _.maxBy(this.players, player => {
            return player.toJSON().hand[0];
        });
    }

    toJSON() {
        let json = _.omit(this, ["winner", "players"]);
        _.assign(json, {
            winner: this.winner.toJSON(),
            players: _.map(this.players, player => {
                return player.toJSON();
            })
        });
        return json;
    }
}

module.exports = HighCards;
