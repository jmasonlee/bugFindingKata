import * as readline from 'readline';
import ShowdownRanker from "./ShowdownRanker";

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `Please Enter your texas hold'em showdown:\n`
});

rl.prompt()

let input = ``
rl.on('line', (line) => {
    if(line === ''){
        console.log(ShowdownRanker.rank(input))
        rl.close()
    }
    input += line + '\n'
});

