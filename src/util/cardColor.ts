import {LetterHint} from "../domain/wordlol/LetterHint.ts";
import {Settings} from "../Settings.ts";

export function cardColor(hint: LetterHint | undefined) {
	return (hint && Settings.colors[hint]) ?? Settings.colors.default;
}
