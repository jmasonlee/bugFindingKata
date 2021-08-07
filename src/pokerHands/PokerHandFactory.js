"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerHandFactory = void 0;
const RepeatedValues_1 = require("./RepeatedValues");
const Straight_1 = require("./Straight");
const Flush_1 = require("./Flush");
const StraightFlush_1 = require("./StraightFlush");
const RoyalFlush_1 = require("./RoyalFlush");
const Ranker_1 = require("../Ranker");
class PokerHandFactory {
    static createPokerHand(playerName, allCards) {
        const possibleHands = [
            RoyalFlush_1.RoyalFlush.makeRoyalFlushIfValid(playerName, allCards),
            StraightFlush_1.StraightFlush.makeStraightFlushIfValid(playerName, allCards),
            Flush_1.Flush.makeFlushIfValid(playerName, allCards),
            Straight_1.Straight.makeStraightIfValid(playerName, allCards),
            new RepeatedValues_1.RepeatedValues(playerName, allCards)
        ].filter(hand => hand);
        const bestHand = Ranker_1.Ranker.rankHands(possibleHands)[0].pokerHands[0];
        return bestHand;
    }
}
exports.PokerHandFactory = PokerHandFactory;
//# sourceMappingURL=PokerHandFactory.js.map