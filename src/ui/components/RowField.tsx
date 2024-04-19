import AuthCode from "react-auth-code-input";
import {styled} from "@mui/material";
import {Settings} from "../../Settings.ts";

const Container = styled("div")(
	({theme}) => ({
		"& .row-field-input": {
			borderColor: theme.palette.primary.main,
			width: "112px",
			height: "112px",
			padding: "0",
			fontSize: "50px",
			textAlign: "center",
			textTransform: "uppercase",
			borderRadius: "4px",
			backgroundClip: "padding-box",
			borderWidth: "1px",
			borderStyle: "solid",
			background: Settings.colors.default,
			color: "white",
			fontWeight: "bold",
		},
		"& .row-field-input:focus": {
			outlineColor: theme.palette.primary.main,
			outlineWidth: "2px",
			outlineStyle: "solid",
		},
		"& .row-field-container": {
			display: "flex",
			gap: "8px",
			justifyContent: "center",
		}
	})
);

export interface RowFieldProps {
	readonly onChange?: (value: string) => void;
	readonly onComplete?: (value: string) => void;
	readonly autoFocus?: boolean;
	readonly length: number;
}

export function RowField(props: RowFieldProps) {
	const length = props.length;
	return <Container>
		<AuthCode
			length={length}
			// allowedCharacters={"numeric"}
			onChange={value => {
				if (props.onChange)
					props.onChange(value);
				
				if (props.onComplete && value.length === length)
					props.onComplete(value);
			}}
			inputClassName="row-field-input"
			containerClassName="row-field-container"
			autoFocus={props.autoFocus}
		/>
	</Container>;
}
