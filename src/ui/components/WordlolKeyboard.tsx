import {WordlolGame} from "../../domain/wordlol/WordlolGame.ts";
import {Card, Stack} from "@mui/material";
import {letterHint, LetterHint} from "../../domain/wordlol/LetterHint.ts";
import {cardColor} from "../../util/cardColor.ts";

export interface WordlolKeyboardProps {
	readonly game: WordlolGame;
}

export function WordlolKeyboard(props: WordlolKeyboardProps) {
	const letters = [
		"qwertyuiop",
		"asdfghjkl",
		"zxcvbnm",
	]
	
	function getLetterHint(letter: string): LetterHint | undefined {
		const hints = props.game.guesses
			.flatMap(it => it.hintsOf(letter));
		if (hints.indexOf(letterHint.exactMatch) >= 0)
			return letterHint.exactMatch;
		if (hints.indexOf(letterHint.inWord) >= 0)
			return letterHint.inWord;
		if (hints.indexOf(letterHint.notInWord) >= 0)
			return letterHint.notInWord;
		return undefined;
	}
	
	return <Stack gap={1} alignItems={"center"}>
		{letters.map(row => {
			return <Stack key={row} direction={"row"} gap={1}>
				{row.split("").map(letter => {
					return <KeyboardLetter key={letter} letter={letter} hint={getLetterHint(letter)}/>
				})}
			</Stack>;
		})}
	</Stack>
}

interface KeyboardLetterProps {
	readonly letter: string;
	readonly hint: LetterHint | undefined;
}

function KeyboardLetter(props: KeyboardLetterProps) {
	return <Card style={{
		background: cardColor(props.hint),
		textTransform: "uppercase",
		fontWeight: "bold",
		fontSize: "24px",
		width: "42px",
		height: "56px",
		fontFamily: "Helvetica",
	}}>
		<Stack alignItems={"center"} style={{height: "100%"}}>
			<div style={{margin: "auto"}}>{props.letter}</div>
		</Stack>
	</Card>;
}
