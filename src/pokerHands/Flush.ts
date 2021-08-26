import {Card, compareCards} from "../Card";
import {HandType, PokerHand} from "./PokerHand";
import {CardArray} from "../CardArray";

export class Flush extends PokerHand {
    handType: HandType = HandType.FLUSH
    handName: string = 'Flush'

    constructor(playerName: string, cards: CardArray) {
        super(playerName, cards);
    }

    static isFlush(cards: Card[]) {
        let occurencesOfSuit: Map<string, number> = new CardArray(cards).countRepeatedSuits()
        return [...occurencesOfSuit.values()].some(value => 5 <= value)
    }

    public getRankingCards(cards: CardArray): CardArray {
        return Flush.getRankingCards(cards)
    }

    public static getRankingCards(cards: CardArray): CardArray {
        let rankingCards:Card[] = [...cards.cards]
        let occurencesOfSuit: Map<string, number> = cards.countRepeatedSuits()
        let flushSuit: string = Flush.getFlushSuit(occurencesOfSuit)
        rankingCards = rankingCards.filter(card => card.suit === flushSuit).sort(compareCards).slice(0, 5);

        return new CardArray(rankingCards)
    }

    private static getFlushSuit(occurencesOfSuit: Map<string, number>) {
        const suitCounts: [string, number][] = [...occurencesOfSuit.entries()];
        return suitCounts.find(this.occurs5OrMoreTimes)[0];
    }

    private static occurs5OrMoreTimes(entry) {
        return 5 <= entry[1];
    }

    static makeFlushIfValid(playerName: string, symbols: string[]): Flush | null {
        let cards:CardArray = CardArray.getCardArrayFromSymbols(symbols)
        if(Flush.isFlush(cards.cards)){
            return new Flush(playerName, cards)
        }
        return null
    }
}
