"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoyalFlush = void 0;
const PokerHand_1 = require("./PokerHand");
const CardArray_1 = require("../CardArray");
const StraightFlush_1 = require("./StraightFlush");
class RoyalFlush extends PokerHand_1.PokerHand {
    constructor(playerName, cards) {
        super(playerName, cards);
        this.handName = 'Royal Flush';
        this.handType = PokerHand_1.HandType.ROYAL_FLUSH;
    }
    static isRoyalFlush(cards) {
        if (StraightFlush_1.StraightFlush.isStraightFlush(cards)) {
            return StraightFlush_1.StraightFlush.getRankingCards(cards).cards[0].value === 14;
        }
        return false;
    }
    getRankingCards(cards) {
        return StraightFlush_1.StraightFlush.getRankingCards(cards);
    }
    getStringRepresentationOfRankingCards() {
        return '';
    }
    static makeRoyalFlushIfValid(playerName, symbols) {
        let cards = CardArray_1.CardArray.getCardArrayFromSymbols(symbols);
        if (RoyalFlush.isRoyalFlush(cards)) {
            return new RoyalFlush(playerName, cards);
        }
        return null;
    }
}
exports.RoyalFlush = RoyalFlush;
//# sourceMappingURL=RoyalFlush.js.map