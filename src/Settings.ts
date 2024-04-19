export const Settings = {
	length: {default: 5, min: 4, max: 10} as NumericSetting,
	maxGuesses: {default: 6, min: 3, max: 20} as NumericSetting,
	colors: {
		exactMatch: "#638c54",
		inWord: "#b49f4c",
		notInWord: "#3a3a3a",
		default: "#5b5b5b",
	},
};

interface NumericSetting {
	readonly default: number;
	readonly min: number;
	readonly max: number;
}
