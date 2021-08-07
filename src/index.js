"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const ShowdownRanker_1 = require("./ShowdownRanker");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `Please Enter your texas hold'em showdown:\n`
});
rl.prompt();
let input = ``;
rl.on('line', (line) => {
    if (line === '') {
        console.log(ShowdownRanker_1.default.rank(input));
        rl.close();
    }
    input += line + '\n';
});
//# sourceMappingURL=index.js.map