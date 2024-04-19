import {letterHint, LetterHint} from "./LetterHint.ts";

export class WordlolGuess {
	constructor(
		readonly word: string,
		readonly letterHints: LetterHint[],
	) {
	}
	
	hintsOf(letter: string): LetterHint[] {
		return this.word
			.split("")
			.map((it, index) => it === letter ? index : -1)
			.filter(it => it >= 0)
			.map(it => this.letterHints[it]);
	}
	
	static of(guess: string, word: string): WordlolGuess {
		const guessLetters = guess.split("");
		
		const exactMatchIndices = guessLetters
			.map((letter, index) => word[index] === letter ? index : -1)
			.filter(it => it >= 0);
		
		const remainingLetters = word
			.split("")
			.filter((_, index) => exactMatchIndices.indexOf(index) < 0);
		
		const hints = guessLetters
			.map((letter, index) => {
				if (exactMatchIndices.indexOf(index) >= 0) {
					return letterHint.exactMatch;
				}
				const i = remainingLetters.indexOf(letter);
				if (i >= 0) {
					remainingLetters.splice(i, 1);
					return letterHint.inWord;
				}
				return letterHint.notInWord;
			})
		
		return new WordlolGuess(guess, hints);
	}
}
