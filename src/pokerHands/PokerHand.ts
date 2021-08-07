import {Card, compareCards} from "../Card";
import {CardArray} from "../CardArray";

export enum HandType {
    HIGH_CARD,
    PAIR,
    THREE_OF_A_KIND,
    STRAIGHT,
    FLUSH,
    FULL_HOUSE,
    FOUR_OF_A_KIND,
    STRAIGHT_FLUSH,
    ROYAL_FLUSH,
}

export abstract class PokerHand {
    private static HAND_SIZE: number = 5
    playerName: string
    rankingCards: CardArray
    handType: HandType
    handName: string
    kickers: Card[] = [];

     protected constructor(playerName: string, cards: CardArray) {
        this.playerName = playerName
        this.rankingCards = this.getRankingCards(cards)
        this.kickers = this.getKickers(cards.cards, this.rankingCards)
    }

    protected abstract getRankingCards(cards: CardArray): CardArray

    public describeHand() {
        return `${this.playerName} ${this.handName}${(this.getStringRepresentationOfRankingCards())}`
    }

    getKickerScore() {
        return this.kickers.map((kicker: Card) => kicker.value).reduce((a: number, b: number) => a + b, 0);
    }

    protected getStringRepresentationOfRankingCards(): string {
        return ` ${this.rankingCards.cards[0].valueName}`
    }

    private getKickers(cards: Card[], rankingCards: CardArray): Card[] {
        const kickers = [...cards];
        this.removeRankingCards(kickers, rankingCards.cards);
        const numKickers = PokerHand.HAND_SIZE - rankingCards.cards.length;
        return PokerHand.getKickersWithHighestValue(kickers, numKickers);
    }

    private static getKickersWithHighestValue(cards: Card[], numKickers: number): Card[] {
        return cards.sort(compareCards).slice(0, numKickers);
    }

    private removeRankingCards(cards: Card[], rankingCards: Card[]) {
        rankingCards.map(c => cards.splice(cards.indexOf(c), 1))
    }
}

