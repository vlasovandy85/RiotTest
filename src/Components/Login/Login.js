import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import IconButton from "@mui/material/IconButton";
import "./Login.scss";

const Login = ({ onLogin, hasData }) => {
	const [passwordParams, setPasswordParams] = useState({
		password: "",
		showPassword: false,
	});

	const handleLogin = () => {
		if (passwordParams.password.trim() && !hasData) {
			onLogin(passwordParams.password);
		}
	};

	const handleClickShowPassword = () => {
		setPasswordParams({
			...passwordParams,
			showPassword: !passwordParams.showPassword,
		});
	};

	const handleChangePassword = (event) => {
		setPasswordParams({
			...passwordParams,
			password: event.target.value,
		});
	};

	return (
		<div className="login">
			<h1>Вход</h1>
			<FormControl sx={{ m: 1, width: "320px" }} variant="outlined">
				<InputLabel htmlFor="master-adornment-password">Мастер-пароль</InputLabel>
				<OutlinedInput
					id="master-adornment-password"
					type={passwordParams.showPassword ? "text" : "password"}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label={
									passwordParams.showPassword
										? "hide the password"
										: "display the password"
								}
								onClick={handleClickShowPassword}
								edge="end"
							>
								{passwordParams.showPassword ? (
									<FontAwesomeIcon icon={faEyeSlash} />
								) : (
									<FontAwesomeIcon icon={faEye} />
								)}
							</IconButton>
						</InputAdornment>
					}
					label="Мастер-пароль"
					value={passwordParams.password}
					onChange={handleChangePassword}
				/>
			</FormControl>
			<Button
				className="login__button"
				onClick={handleLogin}
				variant="contained"
				sx={{ width: "160px" }}
			>
				Войти
			</Button>
		</div>
	);
};

export default Login;
