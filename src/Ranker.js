"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ranker = exports.getRankingGroupWithKickers = exports.getRankingGroup = void 0;
function getRankingGroup(pokerHands) {
    return { pokerHands: pokerHands, rankingKicker: undefined };
}
exports.getRankingGroup = getRankingGroup;
function getRankingGroupWithKickers(pokerHands, kicker) {
    return { pokerHands: pokerHands, rankingKicker: kicker };
}
exports.getRankingGroupWithKickers = getRankingGroupWithKickers;
class Ranker {
    static rankHands(pokerHands) {
        let sortedHands = pokerHands.sort(Ranker.compareHands);
        let rankedHands = [getRankingGroup([sortedHands[0]])];
        sortedHands.slice(1).forEach((hand) => {
            this.rankTiedHands(rankedHands[0].pokerHands[0], rankedHands, hand);
        });
        return rankedHands;
    }
    static rankTiedHands(lastHand, rankedHands, hand) {
        let start = rankedHands.length;
        if (this.areHandsTied(hand, lastHand)) {
            start = start - 1;
            rankedHands.splice(start, 1, ...this.handleTie(lastHand, hand));
        }
        else {
            rankedHands.splice(start, 0, getRankingGroup([hand]));
        }
    }
    static handleTie(lastHand, hand) {
        let rankedByKickers = [lastHand, hand].sort(this.compareKickers);
        if (this.handsHaveIdenticalKickers(hand, lastHand)) {
            return [getRankingGroup(rankedByKickers)];
        }
        else {
            const differentKickerIndex = rankedByKickers[0].kickers.findIndex((kicker, index) => {
                return kicker.value !== rankedByKickers[1].kickers[index].value;
            });
            return rankedByKickers.map((h) => {
                return getRankingGroupWithKickers([h], h.kickers[differentKickerIndex]);
            });
        }
    }
    static areHandsTied(hand, lastHand) {
        return !this.compareHands(hand, lastHand);
    }
    static handsHaveIdenticalKickers(hand, lastHand) {
        return !this.compareKickers(hand, lastHand);
    }
    static compareHands(hand1, hand2) {
        return (hand2.handType - hand1.handType) || Ranker.compareHandByRankingCardValue(hand1, hand2);
    }
    static compareHandByRankingCardValue(hand1, hand2) {
        return hand2.rankingCards.cards[0].value - hand1.rankingCards.cards[0].value;
    }
    static compareKickers(hand1, hand2) {
        let hand1Kickers = hand1.getKickerScore();
        let hand2Kickers = hand2.getKickerScore();
        return hand2Kickers - hand1Kickers;
    }
}
exports.Ranker = Ranker;
//# sourceMappingURL=Ranker.js.map