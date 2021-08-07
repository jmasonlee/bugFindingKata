enum Suits {
    'H' , 'C', 'D', 'S'
}

export class Card {
    value: (number | undefined)
    suit: (string | undefined)
    valueName: (string | undefined)
}

export function makeLowAce(highAce: Card){
    return {
        value: 1,
        valueName: 'Ace',
        suit: highAce.suit
    }
}

export function compareCards(c1: Card, c2: Card) {
    if (c1.value < c2.value) {
        return 1
    }
    if (c2.value < c1.value) {
        return -1
    } else {
        return 0
    }
}

function badlyFormattedCardError(badCard: string){
    return new Error(`Oops! ${badCard} is not a valid card.`)
}

export function getCardMatchingSymbol(cardSymbol: string): Card {
    if(cardSymbol.length !== 2) {
        throw badlyFormattedCardError(cardSymbol)
    }

    const card:Card = {value: undefined, valueName: undefined, suit: cardSymbol[1]}
    switch (cardSymbol[0]) {
        case 'T':
            card.value = 10
            card.valueName = '10'
            break
        case 'J':
            card.value = 11
            card.valueName = 'Jack'
            break
        case 'Q':
            card.value = 12
            card.valueName = 'Queen'
            break
        case 'K':
            card.value = 13
            card.valueName = 'King'
            break
        case 'A':
            card.value = 14
            card.valueName = 'Ace'
            break
        default:
            card.value = +cardSymbol[0]
            card.valueName = cardSymbol[0]
    }

    if(isNaN(card.value) || !(card.suit in Suits)){
        throw badlyFormattedCardError(cardSymbol)
    }

    return card
}
