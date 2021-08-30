import {Card} from "../Card";
import {HandType, PokerHand} from "./PokerHand";
import {Straight} from "./Straight";
import {Flush} from "./Flush";
import {CardArray} from "../CardArray";
import {PokerHandFactory} from "./PokerHandFactory";

export class StraightFlush extends PokerHand {
    handName: string = 'Straight Flush'
    handType: HandType = HandType.STRAIGHT_FLUSH

    constructor(playerName: string, cards: CardArray) {
        super(playerName, cards);
    }

    protected getRankingCards(cards: CardArray): CardArray {
        return StraightFlush.getRankingCards(cards)
    }

    public static getRankingCards(cards: CardArray): CardArray {
        const eligibleForStraight: CardArray = cards.getCardsInSequence()
        return Flush.getRankingCards(eligibleForStraight)
    }

}
