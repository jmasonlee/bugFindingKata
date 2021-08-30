"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PokerHandFactory_1 = require("./pokerHands/PokerHandFactory");
class Parser {
    static parse(input) {
        let parsedElements = this.parseInputIntoElements(input);
        let communityCards = parsedElements[0];
        if (communityCards.length !== 5) {
            throw (new Error(`Oops! [${communityCards}] should have 5 community cards`));
        }
        let playersAndHoleCards = parsedElements.slice(1);
        if (playersAndHoleCards.some(p => p.length !== 3)) {
            const badLine = playersAndHoleCards.find(p => p.length !== 3);
            throw (new Error(`Oops! ${badLine[0]} should have 2 hole cards instead of: [${badLine.slice(1)}]`));
        }
        return this.createHands(playersAndHoleCards, communityCards);
    }
    static parseInputIntoElements(input) {
        let inputLines = input.trim().split("\n");
        let parsedElements = [];
        inputLines.forEach(line => {
            let elements = this.splitLinesIntoElements(line);
            parsedElements.push(elements);
        });
        return parsedElements;
    }
    static createHands(playersAndPocketCards, communityCards) {
        let pokerHands = [];
        playersAndPocketCards.forEach(line => {
            let playerName = line[0];
            let holeCards = line.slice(1);
            let playerCards = [...communityCards, ...holeCards];
            let pokerHand = PokerHandFactory_1.PokerHandFactory.createPokerHand(playerName, playerCards);
            pokerHands.push(pokerHand);
        });
        return pokerHands;
    }
    static splitLinesIntoElements(line) {
        return line.trim().split(/(\s+)/).filter(this.containsWhitespace);
    }
    static containsWhitespace(token) {
        return token.match(/^ *$/) == null;
    }
}
exports.default = Parser;
//# sourceMappingURL=Parser.js.map