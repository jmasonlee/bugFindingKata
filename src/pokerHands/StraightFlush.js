"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StraightFlush = void 0;
const PokerHand_1 = require("./PokerHand");
const Straight_1 = require("./Straight");
const Flush_1 = require("./Flush");
const CardArray_1 = require("../CardArray");
class StraightFlush extends PokerHand_1.PokerHand {
    constructor(playerName, cards) {
        super(playerName, cards);
        this.handName = 'Straight Flush';
        this.handType = PokerHand_1.HandType.STRAIGHT_FLUSH;
    }
    static makeStraightFlushIfValid(playerName, symbols) {
        let cards = CardArray_1.CardArray.getCardArrayFromSymbols(symbols);
        if (StraightFlush.isStraightFlush(cards)) {
            return new StraightFlush(playerName, cards);
        }
        return null;
    }
    static isStraightFlush(cards) {
        if (Straight_1.Straight.isStraight(cards)) {
            const eligibleForStraight = cards.getCardsInSequence();
            return Flush_1.Flush.isFlush(eligibleForStraight.cards);
        }
        return false;
    }
    getRankingCards(cards) {
        return StraightFlush.getRankingCards(cards);
    }
    static getRankingCards(cards) {
        const eligibleForStraight = cards.getCardsInSequence();
        return Flush_1.Flush.getRankingCards(eligibleForStraight);
    }
}
exports.StraightFlush = StraightFlush;
//# sourceMappingURL=StraightFlush.js.map