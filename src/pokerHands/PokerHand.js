"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerHand = exports.HandType = void 0;
const Card_1 = require("../Card");
var HandType;
(function (HandType) {
    HandType[HandType["HIGH_CARD"] = 0] = "HIGH_CARD";
    HandType[HandType["PAIR"] = 1] = "PAIR";
    HandType[HandType["THREE_OF_A_KIND"] = 2] = "THREE_OF_A_KIND";
    HandType[HandType["STRAIGHT"] = 3] = "STRAIGHT";
    HandType[HandType["FLUSH"] = 4] = "FLUSH";
    HandType[HandType["FULL_HOUSE"] = 5] = "FULL_HOUSE";
    HandType[HandType["FOUR_OF_A_KIND"] = 6] = "FOUR_OF_A_KIND";
    HandType[HandType["STRAIGHT_FLUSH"] = 7] = "STRAIGHT_FLUSH";
    HandType[HandType["ROYAL_FLUSH"] = 8] = "ROYAL_FLUSH";
})(HandType = exports.HandType || (exports.HandType = {}));
class PokerHand {
    constructor(playerName, cards) {
        this.kickers = [];
        this.playerName = playerName;
        this.rankingCards = this.getRankingCards(cards);
        this.kickers = this.getKickers(cards.cards, this.rankingCards);
    }
    describeHand() {
        return `${this.playerName} ${this.handName}${(this.getStringRepresentationOfRankingCards())}`;
    }
    getKickerScore() {
        return this.kickers.map((kicker) => kicker.value).reduce((a, b) => a + b, 0);
    }
    getStringRepresentationOfRankingCards() {
        return ` ${this.rankingCards.cards[0].valueName}`;
    }
    getKickers(cards, rankingCards) {
        const kickers = [...cards];
        this.removeRankingCards(kickers, rankingCards.cards);
        const numKickers = PokerHand.HAND_SIZE - rankingCards.cards.length;
        return PokerHand.getKickersWithHighestValue(kickers, numKickers);
    }
    static getKickersWithHighestValue(cards, numKickers) {
        return cards.sort(Card_1.compareCards).slice(0, numKickers);
    }
    removeRankingCards(cards, rankingCards) {
        rankingCards.map(c => cards.splice(cards.indexOf(c), 1));
    }
}
exports.PokerHand = PokerHand;
PokerHand.HAND_SIZE = 5;
//# sourceMappingURL=PokerHand.js.map