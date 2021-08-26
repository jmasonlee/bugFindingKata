import {Card} from "../Card";
import {HandType, PokerHand} from "./PokerHand";
import {CardArray} from "../CardArray";

export class Straight extends PokerHand {
    handType: HandType = HandType.STRAIGHT
    handName: string = 'Straight'

    constructor(playerName: string, cards: CardArray) {
        super(playerName, cards);
    }

    static isStraight(cards: CardArray) {
        let cardsInSequence = cards.getCardsInSequence()
        return 5 <= cardsInSequence.cards.length
    }

    protected getRankingCards(cards: CardArray): CardArray {
        return new CardArray(cards.getCardsInSequence().cards.slice(0, 5))
    }

}
