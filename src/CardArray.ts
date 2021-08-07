import {Card, compareCards, getCardMatchingSymbol, makeLowAce} from './Card'

export class CardArray {
    private readonly _cards: Card[];

    constructor(cards: Card[]) {
        this._cards = cards
    }

    get cards(): Card[] {
        return this._cards;
    }

    static getCardArrayFromSymbols(symbols: string[]): CardArray {
        let cards:Card[] = CardArray.getCardsFromSymbols([...symbols])
        return new CardArray(cards)
    }

    getCardsInSequence(): CardArray {
        let longestSequence: Card[] = []
        let sequence: Card[] = []

        const sortedUniqueCards = this.filterDuplicateValues().cards.sort(compareCards)
        CardArray.addLowAceIfRequired(sortedUniqueCards);

        sortedUniqueCards.forEach((card: Card, index: number) => {
            const nextCard = sequence[sequence.length - 1];
            if (index === 0 || card.value === (nextCard.value) - 1) {
                sequence.push(card)
            } else if(longestSequence.length < sequence.length){
                longestSequence = sequence
                sequence = [card]
            } else{
                sequence = [card]
            }
        })

        const cardsInSequence = sequence.length < longestSequence.length? longestSequence : sequence
        return new CardArray(cardsInSequence)
    }

    public countRepeatedSuits() {
        let cardSuits: string[] = this._cards.map(c => c.suit)
        return CardArray.countDuplicatesInArray(cardSuits) as Map<string, number>
    }

    public countRepeatedValues() {
        let cardValues: number[] = this._cards.map(c => c.value)
        return CardArray.countDuplicatesInArray(cardValues) as Map<number, number>
    }

    private static getCardsFromSymbols(symbols: string[]):Card[] {
        const cards = symbols.map(c => getCardMatchingSymbol(c))
        return cards;
    }

    private static addLowAceIfRequired(cards: Card[]) {
        const lowAce = makeLowAce(cards.sort(compareCards)[0])
        if (cards.some(c => c.value === 14) &&
            cards[cards.length-1].value !== lowAce.value) {
            cards.push(lowAce)
        }
    }

    private static countDuplicatesInArray(entries: any[]): Map<any, number> {
        let entryCount: Map<any, number> = new Map<any, number>()
        entries.forEach(property => {
            let currentCount = entryCount.get(property)
            currentCount = currentCount ? currentCount + 1 : 1
            entryCount.set(property, currentCount)
        })
        return entryCount;
    }

    public filterDuplicateValues() {
        let cardsWithuniqueValues: Card[] = []
        const uniqueValues: number[] = [...new Set(this._cards.map(c => c.value))]
        uniqueValues.forEach(value => {
            cardsWithuniqueValues.push(this._cards.find(card => card.value === value))
        })
        return new CardArray(cardsWithuniqueValues);
    }
}
