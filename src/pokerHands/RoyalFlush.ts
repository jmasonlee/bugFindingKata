import {HandType, PokerHand} from "./PokerHand";
import {CardArray} from "../CardArray";
import {StraightFlush} from "./StraightFlush";

export class RoyalFlush extends PokerHand{
    handName: string = 'Royal Flush'
    handType: HandType = HandType.ROYAL_FLUSH

    constructor(playerName: string, cards: CardArray) {
        super(playerName, cards)
    }

    static isRoyalFlush(cards: CardArray) {
        if (StraightFlush.isStraightFlush(cards)) {
            return StraightFlush.getRankingCards(cards).cards[0].value === 14
        }
        return false
    }

    protected getRankingCards(cards: CardArray): CardArray {
        return StraightFlush.getRankingCards(cards)
    }

    protected getStringRepresentationOfRankingCards(): string {
        return ''
    }

}
