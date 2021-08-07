import {HandType, PokerHand} from "./PokerHand";
import {Card} from "../Card";
import {CardArray} from "../CardArray";

export class RepeatedValues extends PokerHand {
    private numRepeats: number;

    constructor(playerName: string, symbols: string[]) {
        super(playerName, CardArray.getCardArrayFromSymbols(symbols));
        let cards:CardArray = CardArray.getCardArrayFromSymbols(symbols)
        this.setupHandWithRepeatedValues(cards)
    }

    public static isFullHouse(cards: CardArray) {
        let cardValueCount: Map<number, number> = cards.countRepeatedValues()
        let is3ofAKind = [...cardValueCount.values()].includes(3);
        let isPair = [...cardValueCount.values()].includes(2);
        return is3ofAKind && isPair
    }

    protected getStringRepresentationOfRankingCards(): string {
        return ` ${[...new Set(this.rankingCards.cards.map(c => c.valueName))].join(' ')}`
    }

    protected getRankingCards(cards: CardArray): CardArray {
        let rankingCards
        if (RepeatedValues.isFullHouse(cards)) {
            rankingCards =  [...RepeatedValues.getRankingValue(3, cards),
                ...RepeatedValues.getRankingValue(2, cards)]
        } else{
            rankingCards = RepeatedValues.getRankingValue(RepeatedValues.getMaxRepeatedValueCount(cards), cards)
        }

        return new CardArray(rankingCards)
    }

    private static getRankingValue(numRepeats: number, cards: CardArray): Card[] {
        let cardValueCount = cards.countRepeatedValues()
        let rankingValue = [...cardValueCount.entries()]
            .filter(this.getCardValuesMatchingRepeats(numRepeats))
            .map(this.getValues).sort((a, b) => b - a)[0]

        const cardsWithRepeatedValue = cards.cards.filter((card: Card) => card.value === rankingValue);
        return [...new Set(cardsWithRepeatedValue)]
    }

    private static getValues(valueAndCount: [number, number]) {
        return valueAndCount[0];
    }

    private static getCardValuesMatchingRepeats(numRepeats: number) {
        return (valueAndCount: [number, number]) => valueAndCount[1] === numRepeats;
    }

    private static getMaxRepeatedValueCount(cards: CardArray): number {
        let cardValueCount: Map<number, number> = cards.countRepeatedValues()
        return RepeatedValues.getMaxTimesACardRepeats(cardValueCount.values())
    }

    private static getMaxTimesACardRepeats(valueRepeats: IterableIterator<number>) {
        return [...valueRepeats].sort().reverse()[0];
    }

    private setupHandWithRepeatedValues(cards: CardArray) {
        this.numRepeats = RepeatedValues.getMaxRepeatedValueCount(cards)
        if (this.numRepeats === 4) {
            this.handType = HandType.FOUR_OF_A_KIND
            this.handName = "Four of a Kind"
        } else if (RepeatedValues.isFullHouse(cards)) {
            this.handName = 'Full House'
            this.handType = HandType.FULL_HOUSE
        } else if (this.numRepeats === 3) {
            this.handType = HandType.THREE_OF_A_KIND
            this.handName = "Three of a Kind"
        } else if (this.numRepeats === 2) {
            this.handType = HandType.PAIR
            this.handName = 'Pair'
        } else {
            this.handType = HandType.HIGH_CARD
            this.handName = 'High Card'
        }
    }
}
