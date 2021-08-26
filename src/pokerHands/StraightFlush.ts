import {Card} from "../Card";
import {HandType, PokerHand} from "./PokerHand";
import {Straight} from "./Straight";
import {Flush} from "./Flush";
import {CardArray} from "../CardArray";

export class StraightFlush extends PokerHand {
    handName: string = 'Straight Flush'
    handType: HandType = HandType.STRAIGHT_FLUSH

    constructor(playerName: string, cards: CardArray) {
        super(playerName, cards);
    }

    public static makeStraightFlushIfValid(playerName: string, symbols: string[]): StraightFlush | null {
        let cards:CardArray = CardArray.getCardArrayFromSymbols(symbols)
        if(StraightFlush.isStraightFlush(cards)) {
            return new StraightFlush(playerName, cards)
        }
        return null
    }

    static isStraightFlush(cards: CardArray) {
        if (Straight.isStraight(cards)) {
            const eligibleForStraight: CardArray = cards.getCardsInSequence()
            return Flush.isFlush(eligibleForStraight.cards)
        }
        return false
    }

    protected getRankingCards(cards: CardArray): CardArray {
        return StraightFlush.getRankingCards(cards)
    }

    public static getRankingCards(cards: CardArray): CardArray {
        const eligibleForStraight: CardArray = cards.getCardsInSequence()
        return Flush.getRankingCards(eligibleForStraight)
    }

}
