"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Straight = void 0;
const PokerHand_1 = require("./PokerHand");
const CardArray_1 = require("../CardArray");
class Straight extends PokerHand_1.PokerHand {
    constructor(playerName, cards) {
        super(playerName, cards);
        this.handType = PokerHand_1.HandType.STRAIGHT;
        this.handName = 'Straight';
    }
    static isStraight(cards) {
        let cardsInSequence = cards.getCardsInSequence();
        return 5 <= cardsInSequence.cards.length;
    }
    getRankingCards(cards) {
        return new CardArray_1.CardArray(cards.getCardsInSequence().cards.slice(0, 5));
    }
    static makeStraightIfValid(playerName, symbols) {
        let cards = CardArray_1.CardArray.getCardArrayFromSymbols(symbols);
        if (Straight.isStraight(cards)) {
            return new Straight(playerName, cards);
        }
        return null;
    }
}
exports.Straight = Straight;
//# sourceMappingURL=Straight.js.map