import {WordlolGame} from "./WordlolGame.ts";
import {Settings} from "../../Settings.ts";

export class DictionaryCorner {
	constructor(
		readonly dictionaries: Record<number, string[]>,
	) {
	}
	
	wordExists(word: string) {
		const words = this.dictionaries[word.length] ?? [];
		return words.indexOf(word) >= 0;
	}
	
	game(options?: {
		word?: string,
		length?: number,
		maxGuesses?: number,
		seed?: number,
	}) {
		if (options?.word
			&& options.word.length >= Settings.length.min
			&& options.word.length <= Settings.length.max
			&& this.wordExists(options.word))
			return this.specificGame(options.word, options);
		return this.randomGame(options);
	}
	
	randomGame(options?: {
		length?: number,
		maxGuesses?: number,
		seed?: number,
	}) {
		const length = options?.length ?? Settings.length.default;
		
		const words = this.dictionaries[length] ?? [];
		const word = words[Math.floor(Math.random() * words.length)]
		return this.specificGame(word, options);
	}
	
	specificGame(word: string, options?: {maxGuesses?: number}) {
		const maxGuesses = options?.maxGuesses ?? word.length + 1;
		return new WordlolGame(word, [], maxGuesses, this);
	}
	
	static async download(options?: { url?: string }) {
		const url = options?.url ?? "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";
		
		const response = await fetch(url);
		const body = await response.text();
		
		const words = body.split("\r\n");
		const dictionaries = groupBy(words, "length");
		
		return new DictionaryCorner(dictionaries);
	}
}

function groupBy(array: any[], key: string) {
	return array.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
}
