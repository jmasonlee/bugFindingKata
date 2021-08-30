import {HandType, PokerHand} from "./PokerHand";
import {CardArray} from "../CardArray";
import {StraightFlush} from "./StraightFlush";
import {PokerHandFactory} from "./PokerHandFactory";

export class RoyalFlush extends PokerHand{
    handName: string = 'Royal Flush'
    handType: HandType = HandType.ROYAL_FLUSH

    constructor(playerName: string, cards: CardArray) {
        super(playerName, cards)
    }

    protected getRankingCards(cards: CardArray): CardArray {
        return StraightFlush.getRankingCards(cards)
    }

    protected getStringRepresentationOfRankingCards(): string {
        return ''
    }

}
