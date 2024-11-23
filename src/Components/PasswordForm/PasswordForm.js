import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import "./password-form.scss";

const PasswordForm = ({
	onAddData,
	setAlertParams,
	onEditRecord,
	editRecordData,
}) => {
	const [inputsParams, setInputsParams] = useState({
		service: "",
		username: "",
		password: "",
		showPassword: false,
	});

	const handleChangeValue = (event) => {
		const { name, value } = event.target;
		setInputsParams({
			...inputsParams,
			[name]: value,
		});
	};

	const handleClickShowPassword = () => {
		setInputsParams({
			...inputsParams,
			showPassword: !inputsParams.showPassword,
		});
	};

	const handleSubmit = (e) => {
		const { service, username, password } = inputsParams;
		e.preventDefault();
		if (service && username && password) {
			setAlertParams({
				open: true,
				message: "Данные успешно сохранены",
				type: "success",
			});
			onAddData({ service, username, password });
			setInputsParams({
				service: "",
				username: "",
				password: "",
				showPassword: false,
			});
		} else {
			setAlertParams({
				open: true,
				message: "Все поля должны быть заполнены",
				type: "error",
			});
		}
	};

	useEffect(() => {
		if (editRecordData) {
			setInputsParams({
				service: editRecordData.data.service,
				username: editRecordData.data.username,
				password: editRecordData.data.password,
				showPassword: false,
			});
		} else {
			setInputsParams({
				service: "",
				username: "",
				password: "",
				showPassword: false,
			});
		}
	}, [editRecordData]);

	return (
		<form
			className="password-form"
			onSubmit={(e) => {
				e.preventDefault();
				editRecordData
					? onEditRecord(editRecordData.index, inputsParams)
					: handleSubmit(e);
			}}
			autoComplete="off"
		>
			<TextField
				id="service"
				label="Сервис"
				variant="outlined"
				name="service"
				value={inputsParams.service}
				onChange={handleChangeValue}
				sx={{ width: "320px" }}
			/>
			<TextField
				id="username"
				label="Пользователь / Емейл"
				variant="outlined"
				name="username"
				value={inputsParams.username}
				onChange={handleChangeValue}
				sx={{ width: "320px" }}
				autoComplete="new-username"
			/>
			<FormControl sx={{ width: "320px" }} variant="outlined">
				<InputLabel htmlFor="service-adornment-password">Пароль</InputLabel>
				<OutlinedInput
					id="service-adornment-password"
					type={inputsParams.showPassword ? "text" : "password"}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label={
									inputsParams.showPassword
										? "hide the password"
										: "display the password"
								}
								onClick={handleClickShowPassword}
								edge="end"
							>
								{inputsParams.showPassword ? (
									<FontAwesomeIcon icon={faEyeSlash} />
								) : (
									<FontAwesomeIcon icon={faEye} />
								)}
							</IconButton>
						</InputAdornment>
					}
					label="Пароль"
					value={inputsParams.password}
					onChange={handleChangeValue}
					name="password"
					autoComplete="new-password"
				/>
			</FormControl>
			<Button
				type="submit"
				variant="contained"
				color={editRecordData ? "warning" : "success"}
				size="large"
			>
				{editRecordData ? "Редактировать" : "Добавить"}
			</Button>
		</form>
	);
};

export default PasswordForm;
