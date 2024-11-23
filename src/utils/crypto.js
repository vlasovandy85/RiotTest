import CryptoJS from "crypto-js";

export const encryptData = (data, masterPassword) => {
	return CryptoJS.AES.encrypt(JSON.stringify(data), masterPassword).toString();
};

export const decryptData = (cipherText, masterPassword) => {
	try {
		const bytes = CryptoJS.AES.decrypt(cipherText, masterPassword);
		return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	} catch (e) {
		throw new Error("Неверный мастер-пароль");
	}
};

export const exportEncryptedData = (encryptedData, masterPassword) => {
	const data = encryptData(encryptedData, masterPassword);
	const obj = JSON.stringify({ data });
	const blob = new Blob([obj], { type: "application/json" });

	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = "encrypted_data.json";
	link.click();

	URL.revokeObjectURL(url);
};

export const importEncryptedData = async (
	file,
	masterPassword,
	setSavedData,
	setAlertParams
) => {
	try {
		const fileContent = await file.text();

		const parsedData = JSON.parse(fileContent);

		if (!parsedData.data) {
			throw new Error("Файл не содержит данных для импорта.");
		}

		const decryptedData = decryptData(parsedData.data, masterPassword);

		setSavedData(decryptedData);
		localStorage.setItem("passwords", JSON.stringify(decryptedData));
		setAlertParams({
			open: true,
			message: "Данные успешно импортированы",
			type: "success",
		});
	} catch (error) {
		setAlertParams({
			open: true,
			message: "Ошибка при импорте данных: " + error.message,
			type: "error",
		});
	}
};
