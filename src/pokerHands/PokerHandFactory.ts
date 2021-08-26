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
        {
            let cardsCanMakeHandType = RoyalFlush.isRoyalFlush(cards);
            if (cardsCanMakeHandType) {
                return RoyalFlush.makeRoyalFlushIfValid(playerName, allCards)
            }
        }
        {
            if (StraightFlush.isStraightFlush(cards)) {
                return StraightFlush.makeStraightFlushIfValid(playerName, allCards)
            }
        }
        const possibleHands: PokerHand[] = [
            RoyalFlush.makeRoyalFlushIfValid(playerName, allCards),
            StraightFlush.makeStraightFlushIfValid(playerName, allCards),
            Flush.makeFlushIfValid(playerName, allCards),
            Straight.makeStraightIfValid(playerName, allCards),
            new RepeatedValues(playerName, allCards)
        ].filter(hand => hand)

        let bestHand: PokerHand = Ranker.rankHands(possibleHands)[0].pokerHands[0]

        return bestHand
    }
}
