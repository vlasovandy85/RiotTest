import { useState, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrashCan,
	faEdit,
	faEye,
	faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";
import "./password-list.scss";

const PasswordList = ({
	savedData,
	onDeleteRecord,
	setEditedRecord,
	onExportData,
	masterPassword,
	onImportData,
}) => {
	const [selected, setSelected] = useState([]);
	const [visiblePasswords, setVisiblePasswords] = useState(
		Array(savedData.length).fill(false)
	);
	const [file, setFile] = useState(null);

	const isSelected = (index) => selected.includes(index);

	const handleSelect = useCallback(
		(index) => {
			setSelected((prev) =>
				isSelected(index) ? prev.filter((i) => i !== index) : [...prev, index]
			);
		},
		[selected]
	);

	const handleSelectAll = useCallback(() => {
		setSelected(
			selected.length === savedData.length ? [] : savedData.map((_, i) => i)
		);
	}, [selected, savedData]);

	const togglePasswordVisibility = (index) => {
		setVisiblePasswords((prev) => {
			const newVisibility = [...prev];
			newVisibility[index] = true;
			return newVisibility;
		});

		const timer = setTimeout(() => {
			setVisiblePasswords((prev) => {
				const newVisibility = [...prev];
				newVisibility[index] = false;
				return newVisibility;
			});
		}, 4000);
		return () => clearTimeout(timer);
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]); // Выбираем файл
	};
	return (
		<>
			<div className="password-list__btns">
				<Button
					variant="contained"
					color="info"
					onClick={() =>
						onExportData(
							savedData.filter((_, i) => selected.includes(i)),
							masterPassword,
							setSelected
						)
					}
					disabled={selected.length === 0}
				>
					<FontAwesomeIcon icon={faFileExport} />
					Експортировать
				</Button>
				<div className="password-list__import">
					<label className="password-list__import_label" htmlFor="file-input">
						Выбрать файл
					</label>
					<input
						id="file-input"
						type="file"
						onChange={handleFileChange}
						accept="application/json"
						className="password-list__import_input"
					/>
					<Button
						variant="contained"
						color="info"
						onClick={() => onImportData(file, setFile)}
					>
						<FontAwesomeIcon icon={faFileExport} />
						Импортировать
					</Button>
				</div>
			</div>

			<TableContainer component={Paper} sx={{ mt: 3 }} className="password-list">
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									indeterminate={
										selected.length > 0 && selected.length < savedData.length
									}
									checked={selected.length === savedData.length && savedData.length > 0}
									onChange={handleSelectAll}
								/>
							</TableCell>
							<TableCell>Сервис</TableCell>
							<TableCell>Имя пользователя</TableCell>
							<TableCell>Пароль</TableCell>
							<TableCell>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{savedData.toReversed().map((item, index) => (
							<TableRow key={index} selected={isSelected(index)}>
								<TableCell padding="checkbox">
									<Checkbox
										checked={isSelected(index)}
										onChange={() => handleSelect(index)}
									/>
								</TableCell>
								<TableCell>{item.service}</TableCell>
								<TableCell>{item.username}</TableCell>
								<TableCell>
									<div className="password-list__item">
										{visiblePasswords[index] ? item.password : "••••••••••••••••"}
										<IconButton
											onClick={() => togglePasswordVisibility(index)}
											sx={{
												backgroundColor: "rgba(0, 0, 0, 0.1)",
												borderRadius: "8px",
											}}
											disabled={visiblePasswords[index] ? true : false}
										>
											<FontAwesomeIcon
												icon={visiblePasswords[index] ? faEyeSlash : faEye}
											/>
										</IconButton>
									</div>
								</TableCell>
								<TableCell
									sx={{
										display: "flex",
										gap: "10px",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Button
										variant="outlined"
										color="error"
										onClick={() => onDeleteRecord(index)}
										sx={{ width: "180px" }}
									>
										<FontAwesomeIcon icon={faTrashCan} />
										Удалить
									</Button>
									<Button
										variant="outlined"
										color="warning"
										onClick={() => setEditedRecord(index)}
									>
										<FontAwesomeIcon icon={faEdit} />
										Редактировать
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default PasswordList;
