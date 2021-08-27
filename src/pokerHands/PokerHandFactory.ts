import {RepeatedValues} from "./RepeatedValues"
import {Straight} from "./Straight";
import {Flush} from "./Flush";
import {StraightFlush} from "./StraightFlush";
import {RoyalFlush} from "./RoyalFlush";
import {HandType, PokerHand} from "./PokerHand";
import {Ranker} from "../Ranker";
import {CardArray} from "../CardArray";


export class PokerHandFactory {
    private static makeHandMatching: Map<HandType, (cards: CardArray, playerName:string) => PokerHand|null>
        = new Map<HandType, (cards: CardArray, playerName:string) => PokerHand|null>([
                [HandType.ROYAL_FLUSH, (cards, playerName) => {
                    return PokerHandFactory.makeHandIfValid(RoyalFlush.isRoyalFlush(cards), new RoyalFlush(playerName, cards))}],
                [HandType.STRAIGHT_FLUSH, (cards, playerName) => {
                    return PokerHandFactory.makeHandIfValid(StraightFlush.isStraightFlush(cards), new StraightFlush(playerName, cards))}],
            ]
        )

    public static createPokerHand(playerName: string, allCards: string[]) {
        let cards:CardArray = CardArray.getCardArrayFromSymbols(allCards)


        const possibleHands: PokerHand[] = [
            this.makeHandMatching.get(HandType.ROYAL_FLUSH)(cards, playerName),
            this.makeHandMatching.get(HandType.STRAIGHT_FLUSH)(cards, playerName),
            this.makeHandIfValid(Flush.isFlush(cards.cards), new Flush(playerName, cards)),
            this.makeHandIfValid(Straight.isStraight(cards), new Straight(playerName,cards)),
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
