"use strict";

const _ = require("lodash");
const cardConstants = require("./cardConstants");

const gameStatuses = {
    DEAL_HIGH_CARDS: 0,
    DEAL_HAND: 1,
    VOTE_FOR_WINNER: 2
};


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

class PreGameHighCards {
    constructor(players) {
        var availableCards = _.chain(cardConstants).reduce((result, cardConstant, n) => {
            result.push(n);
            return result;
        }, []).shuffle().value();
        _.forEach(players, player => {
            player.setHand([availableCards.pop(1)]);
        });
    }
}

/**
* My method description.  Like other pieces of your comment blocks,
* this can span multiple lines.
*
* @method methodName
* @param {String} foo Argument 1
* @param {Object} config A config object
* @param {String} config.name The name on the config object
* @param {Function} config.callback A callback function on the config object
* @param {Boolean} [extra=false] Do extra, optional work
* @return {Boolean} Returns true on success
*/

class PokerGame {
    constructor(playersAmounts) {
        this.players = _.map(playersAmounts, (player) => {
            return new Player(player.name, player.amount);
        });
        this.gameStatus = gameStatuses.DEAL_HIGH_CARDS;
    }

    getPlayersInfo() {
        return _.map(this.players, player => {
            return player.getPlayerInfo();
        });
    }

    getPlayers() {
        return this.players;
    }

    continueGame() {
        switch(this.gameStatus) {
            case gameStatuses.DEAL_HIGH_CARDS:
                new PreGameHighCards(this.getPlayers());
                break;
            case gameStatuses.VOTE_FOR_WINNER:
        }
    }
}

var firstPokerGame = new PokerGame([
    {
        name: "tom",
        amount: 20
    },
    {
        name: "ryan",
        amount: 20
    }
]);

firstPokerGame.continueGame();

console.log(firstPokerGame.getPlayersInfo());
