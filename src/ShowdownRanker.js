"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const Ranker_1 = require("./Ranker");
class ShowdownRanker {
    static rank(showdown) {
        try {
            let pokerHands = Parser_1.default.parse(showdown);
            if (pokerHands.length === 0) {
                return 'Everyone folded or went home. No player hands were provided!';
            }
            let rankedHands = Ranker_1.Ranker.rankHands(pokerHands);
            return ShowdownRanker.formatRankingForOutput(rankedHands);
        }
        catch (e) {
            return e.message;
        }
    }
    static formatRankingForOutput(rankedHands) {
        let output = ``;
        rankedHands.forEach((ranking, index) => {
            const pokerHands = ranking.pokerHands;
            pokerHands.forEach((hand) => {
                output += `${index + 1}. ${hand.describeHand()}`;
                output += ranking.rankingKicker ? ` Kicker ${ranking.rankingKicker.valueName}` : ``;
                output += pokerHands.length > 1 ? ` (TIE)` : ``;
                output += `\n`;
            });
        });
        return output;
    }
}
exports.default = ShowdownRanker;
//# sourceMappingURL=ShowdownRanker.js.map