import {Button, Card, CircularProgress, IconButton, Popover, Stack, TextField, Typography} from "@mui/material";
import {WordlolGame} from "../../domain/wordlol/WordlolGame.ts";
import {WordRow} from "./WordRow.tsx";
import {array} from "../../util/array.ts";
import {CSSProperties, useEffect, useState} from "react";
import {DictionaryCorner} from "../../domain/wordlol/DictionaryCorner.ts";
import {SettingsSuggestOutlined} from "@mui/icons-material";
import {Settings} from "../../Settings.ts";
import {WordlolKeyboard} from "./WordlolKeyboard.tsx";

export function Wordlol() {
	const [game, setGame] = useState<WordlolGame>()
	const [settings, setSettings] = useState<WordlolSettings>({});
	
	const [dictionaryCorner, setDictionaryCorner] = useState<DictionaryCorner>();
	useEffect(() => {
		if (!game)
			DictionaryCorner
				.download()
				.then(it => {
					setDictionaryCorner(it);
					setGame(it.game(settings));
				});
	}, []);
	
	const isLoading = !dictionaryCorner || !game;
	
	function newGame() {
		if (dictionaryCorner)
			setGame(dictionaryCorner.game(settings));
	}
	
	return <Stack gap={1} alignItems={"center"} style={{padding: "24px 24px 96px 24px", margin: "auto"}}>
		<Stack gap={1} alignItems={"stretch"} style={{width: "fit-content"}}>
			<Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
				<NewGameButton newGame={newGame} invisible settings={settings} setSettings={setSettings}/>
				<Typography variant={"h2"}>Wordlol</Typography>
				<NewGameButton newGame={newGame} invisible={isLoading} settings={settings} setSettings={setSettings}/>
			</Stack>
			
			{isLoading
				? <Stack key={"loading"} alignItems={"center"}><CircularProgress/></Stack>
				: <Card key={"letters"} style={{padding: "24px"}}>
					<Stack gap={1}>
						{array(game.maxGuesses).map(index => {
							return <WordRow key={index} index={index} game={game} setGame={setGame}/>
						})}
					</Stack>
				</Card>}
		</Stack>
		
		{game && game.isGameWon && <h2 key={"win"}>!!! A WINNER IS YOU !!!</h2>}
		{game && game.isGameLost && <h2 key={"lose"}>!!! ALL YOUR WORD ARE BELONG TO US !!!</h2>}
		
		{game && <WordlolKeyboard key={"keyboard"} game={game}/>}
	</Stack>;
}

interface WordlolSettings {
	readonly length?: number;
	readonly maxGuesses?: number;
	readonly word?: string;
}

interface NewGameButtonProps {
	readonly invisible?: boolean;
	readonly newGame: () => void;
	readonly settings: WordlolSettings;
	readonly setSettings: (settings: WordlolSettings) => void;
}

function NewGameButton(props: NewGameButtonProps) {
	const {invisible, newGame, settings, setSettings} = props;
	
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);
	
	const style: CSSProperties | undefined = invisible ? {visibility: "hidden"} : undefined;
	return <Stack direction={"row"} gap={1} alignItems={"center"} style={style}>
		<Button variant={"outlined"} onClick={newGame}>New Game</Button>
		<IconButton onClick={event => setAnchorEl(event.currentTarget)}>
			<SettingsSuggestOutlined color={"primary"}/>
		</IconButton>
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={() => setAnchorEl(null)}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
		>
			<Stack gap={1} padding={"16px 8px"}>
				<TextField
					label={"Length"}
					type={"number"}
					value={settings.length ?? Settings.length.default}
					onChange={event => {
						const value = event.target.value;
						const length = value ? +value : undefined;
						setSettings({
							...settings,
							length,
						})
					}}
					InputProps={{
						inputProps: {
							min: Settings.length.min,
							max: Settings.length.max,
						}
					}}
				/>
				<TextField
					label={"Guesses"}
					type={"number"}
					value={settings.maxGuesses ?? Settings.maxGuesses.default}
					onChange={event => {
						const value = event.target.value;
						const maxGuesses = value ? +value : undefined;
						setSettings({
							...settings,
							maxGuesses,
						})
					}}
					InputProps={{
						inputProps: {
							min: Settings.maxGuesses.min,
							max: Settings.maxGuesses.max,
						}
					}}
				/>
				<TextField
					label={"Word"}
					value={settings.word ?? ""}
					onChange={event => {
						const value = event.target.value;
						const word = value ? value : undefined;
						setSettings({
							...settings,
							word,
						})
					}}
				/>
			</Stack>
		</Popover>
	</Stack>;
}
