import {PokerHand} from "./pokerHands/PokerHand";
import Parser from "./Parser";
import {Ranker, RankingGroup} from "./Ranker";

export default class ShowdownRanker {

    static rank(showdown: string): string {
        try{
            let pokerHands: PokerHand[] = Parser.parse(showdown)
            if(pokerHands.length === 0){
                return 'Everyone folded or went home. No player hands were provided!'
            }

            let rankedHands = Ranker.rankHands(pokerHands);
            return ShowdownRanker.formatRankingForOutput(rankedHands)
        } catch (e) {
            return e.message
        }
    }

    private static formatRankingForOutput(rankedHands: RankingGroup[]) {
        let output: string = ``
        rankedHands.forEach((ranking:RankingGroup, index:number) => {
            const pokerHands = ranking.pokerHands
            pokerHands.forEach((hand) => {
                output += `${index+1}. ${hand.describeHand()}`;
                output += ranking.rankingKicker ? ` Kicker ${ranking.rankingKicker.valueName}`: ``
                output += pokerHands.length > 1 ? ` (TIE)` : ``
                output += `\n`
            })
        })
        return output
    }
}
