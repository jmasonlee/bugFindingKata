import {RepeatedValues} from "./RepeatedValues"
import {Straight} from "./Straight";
import {Flush} from "./Flush";
import {StraightFlush} from "./StraightFlush";
import {RoyalFlush} from "./RoyalFlush";
import {HandType, PokerHand} from "./PokerHand";
import {Ranker} from "../Ranker";
import {CardArray} from "../CardArray";


export class PokerHandFactory {

    public static createPokerHand(playerName: string, allCards: string[]) {
        let cards:CardArray = CardArray.getCardArrayFromSymbols(allCards)

        const possibleHands: PokerHand[] = [
            this.pokerHandMakers.get(HandType.ROYAL_FLUSH)(cards, playerName),
            this.pokerHandMakers.get(HandType.STRAIGHT_FLUSH)(cards, playerName),
            this.pokerHandMakers.get(HandType.FLUSH)(cards, playerName),
            this.pokerHandMakers.get(HandType.STRAIGHT)(cards, playerName),
            new RepeatedValues(playerName, allCards)
        ].filter(hand => hand)

        let bestHand: PokerHand = Ranker.rankHands(possibleHands)[0].pokerHands[0]

        return bestHand
    }

    private static pokerHandMakers: Map<HandType, (cards: CardArray, playerName:string) => PokerHand|null>
        = new Map<HandType, (cards: CardArray, playerName:string) => PokerHand|null>([
                [HandType.ROYAL_FLUSH, (cards, playerName) => {
                    return PokerHandFactory.makeHandIfValid(RoyalFlush.isRoyalFlush(cards), new RoyalFlush(playerName, cards))}],
                [HandType.STRAIGHT_FLUSH, (cards, playerName) => {
                    return PokerHandFactory.makeHandIfValid(StraightFlush.isStraightFlush(cards), new StraightFlush(playerName, cards))}],
                [HandType.FLUSH, (cards, playerName) => {
                    return PokerHandFactory.makeHandIfValid(Flush.isFlush(cards.cards), new Flush(playerName, cards))}],
                [HandType.STRAIGHT, (cards, playerName) => {
                    return PokerHandFactory.makeHandIfValid(Straight.isStraight(cards), new Straight(playerName,cards))}],
            ]
        )

    private static makeHandIfValid(cardsCanMakeHandType: boolean, createHandType: PokerHand) {
        if (cardsCanMakeHandType) {
            return createHandType
        }
        return null
    }
}
