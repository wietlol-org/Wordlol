

export type LetterHint = "exactMatch" | "inWord" | "notInWord";
export const letterHint = {
	exactMatch: "exactMatch" as LetterHint,
	inWord: "inWord" as LetterHint,
	notInWord: "notInWord" as LetterHint,
} as const;
