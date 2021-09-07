import {RepeatedValues} from "./RepeatedValues"
import {Straight} from "./Straight";
import {Flush} from "./Flush";
import {StraightFlush} from "./StraightFlush";
import {RoyalFlush} from "./RoyalFlush";
import {HandType, PokerHand} from "./PokerHand";
import {Ranker} from "../Ranker";
import {CardArray} from "../CardArray";
import {Card} from "../Card";


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
                    return PokerHandFactory.isRoyalFlush(cards)? new RoyalFlush(playerName, cards) : null}],
                [HandType.STRAIGHT_FLUSH, (cards, playerName) => {
                    return PokerHandFactory.isStraightFlush(cards) ? new StraightFlush(playerName, cards) : null}],
                [HandType.FLUSH, (cards, playerName) => {
                    return PokerHandFactory.isFlush(cards.cards) ? new Flush(playerName, cards): null}],
                [HandType.STRAIGHT, (cards, playerName) => {
                    return PokerHandFactory.isStraight(cards) ? new Straight(playerName,cards): null}],
            ]
        )

    static isFlush(cards: Card[]) {
        let occurencesOfSuit: Map<string, number> = new CardArray(cards).countRepeatedSuits()
        return [...occurencesOfSuit.values()].some(value => 5 <= value)
    }

    static isRoyalFlush(cards: CardArray) {
        if (PokerHandFactory.isStraightFlush(cards)) {
            return StraightFlush.getRankingCards(cards).cards[0].value === 14
        }
        return false
    }

    static isStraight(cards: CardArray) {
        let cardsInSequence = cards.getCardsInSequence()
        return 5 <= cardsInSequence.cards.length
    }

    static isStraightFlush(cards: CardArray) {
        if (PokerHandFactory.isStraight(cards)) {
            const eligibleForStraight: CardArray = cards.getCardsInSequence()
            return PokerHandFactory.isFlush(eligibleForStraight.cards)
        }
        return false
    }
}
