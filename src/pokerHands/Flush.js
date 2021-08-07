"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flush = void 0;
const Card_1 = require("../Card");
const PokerHand_1 = require("./PokerHand");
const CardArray_1 = require("../CardArray");
class Flush extends PokerHand_1.PokerHand {
    constructor(playerName, cards) {
        super(playerName, cards);
        this.handType = PokerHand_1.HandType.FLUSH;
        this.handName = 'Flush';
    }
    static isFlush(cards) {
        let occurencesOfSuit = new CardArray_1.CardArray(cards).countRepeatedSuits();
        return [...occurencesOfSuit.values()].some(value => 5 <= value);
    }
    getRankingCards(cards) {
        return Flush.getRankingCards(cards);
    }
    static getRankingCards(cards) {
        let rankingCards = [...cards.cards];
        let occurencesOfSuit = cards.countRepeatedSuits();
        let flushSuit = Flush.getFlushSuit(occurencesOfSuit);
        rankingCards = rankingCards.filter(card => card.suit === flushSuit).sort(Card_1.compareCards).slice(0, 5);
        return new CardArray_1.CardArray(rankingCards);
    }
    static getFlushSuit(occurencesOfSuit) {
        const suitCounts = [...occurencesOfSuit.entries()];
        return suitCounts.find(this.occurs5OrMoreTimes)[0];
    }
    static occurs5OrMoreTimes(entry) {
        return 5 <= entry[1];
    }
    static makeFlushIfValid(playerName, symbols) {
        let cards = CardArray_1.CardArray.getCardArrayFromSymbols(symbols);
        if (Flush.isFlush(cards.cards)) {
            return new Flush(playerName, cards);
        }
        return null;
    }
}
exports.Flush = Flush;
//# sourceMappingURL=Flush.js.map