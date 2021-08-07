import {PokerHand} from "./pokerHands/PokerHand";
import {Card} from "./Card";

export interface RankingGroup {
    pokerHands: PokerHand[],
    rankingKicker: Card | undefined
}

export function getRankingGroup(pokerHands: PokerHand[]) {
   return {pokerHands: pokerHands, rankingKicker: undefined}
}

export function getRankingGroupWithKickers(pokerHands: PokerHand[], kicker:Card) {
   return {pokerHands: pokerHands, rankingKicker: kicker}
}

export class Ranker {
    static rankHands(pokerHands: PokerHand[]) : RankingGroup[]{
        let sortedHands: PokerHand[] = pokerHands.sort(Ranker.compareHands)
        let rankedHands: RankingGroup[] = [getRankingGroup([sortedHands[0]])]
        sortedHands.slice(1).forEach((hand: PokerHand) => {
            this.rankTiedHands(rankedHands[0].pokerHands[0], rankedHands, hand);
        })
        return rankedHands;
    }

    private static rankTiedHands(lastHand: PokerHand, rankedHands: RankingGroup[], hand: PokerHand) {
        let start = rankedHands.length

        if (this.areHandsTied(hand, lastHand)) {
            start = start - 1
            rankedHands.splice(start, 1, ...this.handleTie(lastHand, hand))
        }
        else {
            rankedHands.splice(start, 0, getRankingGroup([hand]))
        }
    }

    private static handleTie(lastHand: PokerHand, hand: PokerHand): RankingGroup[]{
        let rankedByKickers: PokerHand[] = [lastHand, hand].sort(this.compareKickers)
        if (this.handsHaveIdenticalKickers(hand, lastHand)) {
            return [getRankingGroup(rankedByKickers)]
        } else {
            const differentKickerIndex = rankedByKickers[0].kickers.findIndex((kicker:Card, index: number) =>{
                return kicker.value !== rankedByKickers[1].kickers[index].value
            })

            return rankedByKickers.map<RankingGroup>(
                (h:PokerHand):RankingGroup => {
                    return getRankingGroupWithKickers([h], h.kickers[differentKickerIndex])
                })
        }
    }

    private static areHandsTied(hand: PokerHand, lastHand: PokerHand) {
        return !this.compareHands(hand, lastHand);
    }

    private static handsHaveIdenticalKickers(hand: PokerHand, lastHand: PokerHand) {
        return !this.compareKickers(hand, lastHand);
    }

    private static compareHands(hand1: PokerHand, hand2: PokerHand): number {
        return (hand2.handType - hand1.handType)  ||  Ranker.compareHandByRankingCardValue(hand1, hand2)
    }

    private static compareHandByRankingCardValue(hand1: PokerHand, hand2: PokerHand): number {
        return hand2.rankingCards.cards[0].value - hand1.rankingCards.cards[0].value
    }

    private static compareKickers(hand1: PokerHand, hand2: PokerHand) {
        let hand1Kickers: number = hand1.getKickerScore()
        let hand2Kickers: number = hand2.getKickerScore()
        return hand2Kickers - hand1Kickers
    }
}

