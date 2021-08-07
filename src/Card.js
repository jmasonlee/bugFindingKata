"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardMatchingSymbol = exports.compareCards = exports.makeLowAce = exports.Card = void 0;
var Suits;
(function (Suits) {
    Suits[Suits["H"] = 0] = "H";
    Suits[Suits["C"] = 1] = "C";
    Suits[Suits["D"] = 2] = "D";
    Suits[Suits["S"] = 3] = "S";
})(Suits || (Suits = {}));
class Card {
}
exports.Card = Card;
function makeLowAce(highAce) {
    return {
        value: 1,
        valueName: 'Ace',
        suit: highAce.suit
    };
}
exports.makeLowAce = makeLowAce;
function compareCards(c1, c2) {
    if (c1.value < c2.value) {
        return 1;
    }
    if (c2.value < c1.value) {
        return -1;
    }
    else {
        return 0;
    }
}
exports.compareCards = compareCards;
function badlyFormattedCardError(badCard) {
    return new Error(`Oops! ${badCard} is not a valid card.`);
}
function getCardMatchingSymbol(cardSymbol) {
    if (cardSymbol.length !== 2) {
        throw badlyFormattedCardError(cardSymbol);
    }
    const card = { value: undefined, valueName: undefined, suit: cardSymbol[1] };
    switch (cardSymbol[0]) {
        case 'T':
            card.value = 10;
            card.valueName = '10';
            break;
        case 'J':
            card.value = 11;
            card.valueName = 'Jack';
            break;
        case 'Q':
            card.value = 12;
            card.valueName = 'Queen';
            break;
        case 'K':
            card.value = 13;
            card.valueName = 'King';
            break;
        case 'A':
            card.value = 14;
            card.valueName = 'Ace';
            break;
        default:
            card.value = +cardSymbol[0];
            card.valueName = cardSymbol[0];
    }
    if (isNaN(card.value) || !(card.suit in Suits)) {
        throw badlyFormattedCardError(cardSymbol);
    }
    return card;
}
exports.getCardMatchingSymbol = getCardMatchingSymbol;
//# sourceMappingURL=Card.js.map