import {Card, Stack} from "@mui/material";
import {WordlolGame} from "../../domain/wordlol/WordlolGame.ts";
import {RowField} from "./RowField.tsx";
import {LetterHint} from "../../domain/wordlol/LetterHint.ts";
import {array} from "../../util/array.ts";
import {cardColor} from "../../util/cardColor.ts";

export interface WordRowProps {
	readonly index: number;
	readonly game: WordlolGame;
	readonly setGame: (game: WordlolGame) => void;
}

export function WordRow(props: WordRowProps) {
	const {index, game, setGame} = props;
	
	const editable = game.guesses.length === index;
	
	if (editable) {
		return <RowField
			length={game.word.length}
			onComplete={value => {
				try {
					setGame(game.guessWord(value));
				} catch (error) {
					// todo feedback to user, but AuthCode doesnt support it (nicely)
				}
			}}
		/>
	}
	
	const guess = game.guesses[index];
	
	if (guess)
		return <Stack direction={"row"} gap={1}>
			{guess.word.split("").map((letter, index) => {
				return <WordLetter key={index} letter={letter} hint={guess.letterHints[index]}/>
			})}
		</Stack>;
	
	return <Stack direction={"row"} gap={1}>
		{array(game.word.length).map(index => {
			return <WordLetter key={index}/>
		})}
	</Stack>;
}

interface WordLetterProps {
	readonly letter?: string;
	readonly hint?: LetterHint;
}

function WordLetter(props: WordLetterProps) {
	return <Card style={{
		width: "112px",
		height: "112px",
		background: cardColor(props.hint),
		fontFamily: "Helvetica",
		textTransform: "uppercase",
		fontSize: "50px",
		fontWeight: "bold",
	}}>
		<Stack alignItems={"center"} style={{height: "100%"}}>
			<div style={{margin: "auto"}}>{props.letter}</div>
		</Stack>
	</Card>;
}
