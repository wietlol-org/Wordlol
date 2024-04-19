import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {Wordlol} from "./ui/components/Wordlol.tsx";

function App() {
	const theme = createTheme({
		palette: {
			mode: "dark"
		}
	})
	
	return <ThemeProvider theme={theme}>
		<CssBaseline/>
		
		<Wordlol/>
	</ThemeProvider>;
}

export default App
