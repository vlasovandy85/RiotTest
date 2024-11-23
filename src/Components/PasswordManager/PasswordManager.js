import { useState, useEffect } from "react";
import {
	encryptData,
	decryptData,
	exportEncryptedData,
	importEncryptedData,
} from "../../utils/crypto";
import PasswordForm from "../PasswordForm/PasswordForm";
import PasswordList from "../PasswordList/PasswordList";
import "./password-manager.scss";

const PasswordManager = ({ masterPassword, setAlertParams }) => {
	const [savedData, setSavedData] = useState([]);
	const [editRecordData, setEditRecordData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const encryptedData = localStorage.getItem("savedData");
		if (encryptedData) {
			try {
				const decryptedData = decryptData(encryptedData, masterPassword);
				setSavedData(decryptedData);
				setAlertParams({
					open: true,
					message: "Данные успешно расшифрованы",
					type: "success",
				});
				setLoading(false);
			} catch (error) {
				setLoading(false);
				setAlertParams({
					open: true,
					message: "Неверный мастер-пароль",
					type: "error",
				});
				console.error("Ошибка при расшифровке данных:", error);
			}
		} else {
			setLoading(false);
			console.log("Нет данных для расшифровки.");
			setAlertParams({
				open: true,
				message: "Нет данных для расшифровки.",
				type: "error",
			});
		}
	}, [masterPassword]);

	useEffect(() => {
		if (!loading) {
			if (savedData.length > 0) {
				const encryptedData = encryptData(savedData, masterPassword);
				localStorage.setItem("savedData", encryptedData);
			} else {
				localStorage.removeItem("savedData");
			}
		}
	}, [savedData, masterPassword]);

	const addData = (newData) => {
		setSavedData([...savedData, newData]);
	};

	const deleteRecord = (index) => {
		setSavedData(savedData.filter((_, i) => i !== index));
		setAlertParams({ open: true, message: "Запись удалена", type: "warning" });
	};
	const setEditedRecord = (index) => {
		setEditRecordData({ index, data: savedData[index] });
	};
	const editRecord = (index, newData) => {
		setSavedData(savedData.map((item, i) => (i === index ? newData : item)));
		setAlertParams({ open: true, message: "Запись изменена", type: "success" });
		setEditRecordData(null);
	};
	const handleExport = (savedData, masterPassword, setSelected) => {
		exportEncryptedData(savedData, masterPassword);
		setAlertParams({
			open: true,
			message: "Данные успешно экспортированы",
			type: "success",
		});
		setSelected([]);
	};
	const handleImport = (file, setFile) => {
		if (!file) {
			setAlertParams({
				open: true,
				message: "Пожалуйста, выберите файл.",
				type: "error",
			});
			return;
		}
		importEncryptedData(file, masterPassword, setSavedData, setAlertParams);
		setFile(null);
	};

	return (
		<div className="password-manager">
			<h1>Менеджер паролей</h1>
			<PasswordForm
				onAddData={addData}
				setAlertParams={setAlertParams}
				onEditRecord={editRecord}
				editRecordData={editRecordData}
			/>
			<PasswordList
				savedData={savedData}
				onDeleteRecord={deleteRecord}
				setEditedRecord={setEditedRecord}
				onExportData={handleExport}
				masterPassword={masterPassword}
				setSavedData={setSavedData}
				onImportData={handleImport}
			/>
		</div>
	);
};

export default PasswordManager;
