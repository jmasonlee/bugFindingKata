"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardArray = void 0;
const Card_1 = require("./Card");
class CardArray {
    constructor(cards) {
        this._cards = cards;
    }
    get cards() {
        return this._cards;
    }
    static getCardArrayFromSymbols(symbols) {
        let cards = CardArray.getCardsFromSymbols([...symbols]);
        return new CardArray(cards);
    }
    getCardsInSequence() {
        let longestSequence = [];
        let sequence = [];
        const sortedUniqueCards = this.filterDuplicateValues().cards.sort(Card_1.compareCards);
        CardArray.addLowAceIfRequired(sortedUniqueCards);
        sortedUniqueCards.forEach((card, index) => {
            const nextCard = sequence[sequence.length - 1];
            if (index === 0 || card.value === (nextCard.value) - 1) {
                sequence.push(card);
            }
            else if (longestSequence.length < sequence.length) {
                longestSequence = sequence;
                sequence = [card];
            }
            else {
                sequence = [card];
            }
        });
        const cardsInSequence = sequence.length < longestSequence.length ? longestSequence : sequence;
        return new CardArray(cardsInSequence);
    }
    countRepeatedSuits() {
        let cardSuits = this._cards.map(c => c.suit);
        return CardArray.countDuplicatesInArray(cardSuits);
    }
    countRepeatedValues() {
        let cardValues = this._cards.map(c => c.value);
        return CardArray.countDuplicatesInArray(cardValues);
    }
    static getCardsFromSymbols(symbols) {
        const cards = symbols.map(c => Card_1.getCardMatchingSymbol(c));
        return cards;
    }
    static addLowAceIfRequired(cards) {
        const lowAce = Card_1.makeLowAce(cards.sort(Card_1.compareCards)[0]);
        if (cards.some(c => c.value === 14) &&
            cards[cards.length - 1].value !== lowAce.value) {
            cards.push(lowAce);
        }
    }
    static countDuplicatesInArray(entries) {
        let entryCount = new Map();
        entries.forEach(property => {
            let currentCount = entryCount.get(property);
            currentCount = currentCount ? currentCount + 1 : 1;
            entryCount.set(property, currentCount);
        });
        return entryCount;
    }
    filterDuplicateValues() {
        let cardsWithuniqueValues = [];
        const uniqueValues = [...new Set(this._cards.map(c => c.value))];
        uniqueValues.forEach(value => {
            cardsWithuniqueValues.push(this._cards.find(card => card.value === value));
        });
        return new CardArray(cardsWithuniqueValues);
    }
}
exports.CardArray = CardArray;
//# sourceMappingURL=CardArray.js.map