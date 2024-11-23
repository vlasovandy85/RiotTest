import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AlertNotification = ({ open, handleClose, message, type }) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			open={open}
			autoHideDuration={3000}
			onClose={handleClose}
		>
			<Alert variant="filled" severity={type}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default AlertNotification;
