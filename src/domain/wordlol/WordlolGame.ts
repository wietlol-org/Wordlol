import {WordlolGuess} from "./WordlolGuess.ts";
import {DictionaryCorner} from "./DictionaryCorner.ts";

export class WordlolGame {
	constructor(
		readonly word: string,
		readonly guesses: WordlolGuess[],
		readonly maxGuesses: number,
		readonly dictionary: DictionaryCorner,
	){}
	
	get isGameOver() {
		return this.guesses.length === this.maxGuesses;
	}
	
	get isGameWon() {
		return this.guesses.some(it => it.word === this.word);
	}
	
	get isGameLost() {
		return this.isGameOver && !this.isGameWon;
	}
	
	guessWord(guess: string): WordlolGame {
		if (guess.length !== this.word.length)
			throw new Error("please");
		
		if (!this.dictionary.wordExists(guess))
			throw new Error("not a word");
		
		return new WordlolGame(
			this.word,
			[
				...this.guesses,
				WordlolGuess.of(guess, this.word),
			],
			this.maxGuesses,
			this.dictionary,
		);
	}
}
