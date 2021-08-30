"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatedValues = void 0;
const PokerHand_1 = require("./PokerHand");
const CardArray_1 = require("../CardArray");
class RepeatedValues extends PokerHand_1.PokerHand {
    constructor(playerName, symbols) {
        super(playerName, CardArray_1.CardArray.getCardArrayFromSymbols(symbols));
        let cards = CardArray_1.CardArray.getCardArrayFromSymbols(symbols);
        this.setupHandWithRepeatedValues(cards);
    }
    static isFullHouse(cards) {
        let cardValueCount = cards.countRepeatedValues();
        let is3ofAKind = [...cardValueCount.values()].includes(3);
        const numberOfPairOrHigher = [...cardValueCount.values()].filter(c => c === 3).length;
        return is3ofAKind && numberOfPairOrHigher >= 2;
    }
    getStringRepresentationOfRankingCards() {
        return ` ${[...new Set(this.rankingCards.cards.map(c => c.valueName))].join(' ')}`;
    }
    getRankingCards(cards) {
        let rankingCards;
        if (RepeatedValues.isFullHouse(cards)) {
            rankingCards = [...cards.countRepeatedValues().entries()].filter(e => {
                return e[1] > 2;
            }).slice(0, 2);
        }
        else {
            rankingCards = RepeatedValues.getRankingValue(RepeatedValues.getMaxRepeatedValueCount(cards), cards);
        }
        return new CardArray_1.CardArray(rankingCards);
    }
    static getRankingValue(numRepeats, cards) {
        let cardValueCount = cards.countRepeatedValues();
        let rankingValue = [...cardValueCount.entries()]
            .filter(this.getCardValuesMatchingRepeats(numRepeats))
            .map(this.getValues).sort((a, b) => b - a)[0];
        const cardsWithRepeatedValue = cards.cards.filter((card) => card.value === rankingValue);
        return [...new Set(cardsWithRepeatedValue)];
    }
    static getValues(valueAndCount) {
        return valueAndCount[0];
    }
    static getCardValuesMatchingRepeats(numRepeats) {
        return (valueAndCount) => valueAndCount[1] === numRepeats;
    }
    static getMaxRepeatedValueCount(cards) {
        let cardValueCount = cards.countRepeatedValues();
        return RepeatedValues.getMaxTimesACardRepeats(cardValueCount.values());
    }
    static getMaxTimesACardRepeats(valueRepeats) {
        return [...valueRepeats].sort().reverse()[0];
    }
    setupHandWithRepeatedValues(cards) {
        this.numRepeats = RepeatedValues.getMaxRepeatedValueCount(cards);
        if (this.numRepeats === 4) {
            this.handType = PokerHand_1.HandType.FOUR_OF_A_KIND;
            this.handName = "Four of a Kind";
        }
        else if (RepeatedValues.isFullHouse(cards)) {
            this.handName = 'Full House';
            this.handType = PokerHand_1.HandType.FULL_HOUSE;
        }
        else if (this.numRepeats === 3) {
            this.handType = PokerHand_1.HandType.THREE_OF_A_KIND;
            this.handName = "Three of a Kind";
        }
        else if (this.numRepeats === 2) {
            this.handType = PokerHand_1.HandType.PAIR;
            this.handName = 'Pair';
        }
        else {
            this.handType = PokerHand_1.HandType.HIGH_CARD;
            this.handName = 'High Card';
        }
    }
}
exports.RepeatedValues = RepeatedValues;
//# sourceMappingURL=RepeatedValues.js.map