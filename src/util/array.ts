
export function array<T = number>(length: number, value?: (index: number) => T) {
	return Array.from({length}, (_, i) => value ? value(i) : i);
}
