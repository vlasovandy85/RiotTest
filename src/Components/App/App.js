import { useState } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import Login from "../Login/Login";
import PasswordManager from "../PasswordManager/PasswordManager";
import { decryptData } from "../../utils/crypto";
import AlertNotification from "../Alert/Alert";
import "./App.scss";

const App = () => {
	const [masterPassword, setMasterPassword] = useState(null);
	const [hasData, setHasData] = useState(false);
	const [alertParams, setAlertParams] = useState({
		open: false,
		message: "",
		type: "",
	});

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setAlertParams({ ...alertParams, open: false });
	};
	const handleLogin = (password) => {
		try {
			const encryptedData = localStorage.getItem("savedData");
			if (encryptedData) {
				decryptData(encryptedData, password);
				setHasData(true);
			}
			setMasterPassword(password);
		} catch {
			setAlertParams({
				...alertParams,
				open: true,
				message: "Неверный мастер-пароль",
				type: "error",
			});
		}
	};

	const theme = createTheme({
		palette: {
			mode: "dark",
			primary: {
				main: "#9bc5c3",
			},
			secondary: {
				main: "#616161",
			},
			background: {
				default: "#1c1c1c",
				paper: "rgba(51, 51, 51, 0.6)",
			},
			text: {
				primary: "#ffffff",
				secondary: "#cccccc",
			},
		},
		typography: {
			fontFamily: "Nunito, sans-serif",
			h1: {
				fontSize: "2.5rem",
				fontWeight: 700,
			},
			body1: {
				fontSize: "1rem",
				color: "#ffffff",
			},
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "8px",
						fontWeight: "bold",
						lineHeight: 1.5,
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AlertNotification
				open={alertParams.open}
				handleClose={handleClose}
				message={alertParams.message}
				type={alertParams.type}
			/>
			<div className="app">
				{!masterPassword ? (
					<Login onLogin={handleLogin} hasData={hasData} />
				) : (
					<PasswordManager
						masterPassword={masterPassword}
						setAlertParams={setAlertParams}
					/>
				)}
			</div>
		</ThemeProvider>
	);
};

export default App;
