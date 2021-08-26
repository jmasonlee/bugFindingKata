import {RepeatedValues} from "./RepeatedValues"
import {Straight} from "./Straight";
import {Flush} from "./Flush";
import {StraightFlush} from "./StraightFlush";
import {RoyalFlush} from "./RoyalFlush";
import {PokerHand} from "./PokerHand";
import {Ranker} from "../Ranker";
import {CardArray} from "../CardArray";


export class PokerHandFactory {
    public static createPokerHand(playerName: string, allCards: string[]) {
        let cards:CardArray = CardArray.getCardArrayFromSymbols(allCards)

        const possibleHands: PokerHand[] = [
            this.makeHandIfValid(RoyalFlush.isRoyalFlush(cards), RoyalFlush.makeRoyalFlushIfValid(playerName, allCards)),
            this.makeHandIfValid(StraightFlush.isStraightFlush(cards), StraightFlush.makeStraightFlushIfValid(playerName, allCards)),
            Flush.makeFlushIfValid(playerName, allCards),
            Straight.makeStraightIfValid(playerName, allCards),
            new RepeatedValues(playerName, allCards)
        ].filter(hand => hand)

        let bestHand: PokerHand = Ranker.rankHands(possibleHands)[0].pokerHands[0]

        return bestHand
    }

    private static makeHandIfValid(cardsCanMakeHandType: boolean, createHandType: PokerHand) {
        if (cardsCanMakeHandType) {
            return createHandType
        }
        return null
    }
}
