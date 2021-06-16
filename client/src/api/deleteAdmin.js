import axios from "axios";
import Notify from "../components/Notify";

const apiBaseURL = process.env.REACT_APP_GEEKNOTE_API || `http://localhost:3001`;

export const deleteAdmin = (history) => {
	const token = window.localStorage.getItem("token");
	return axios
		.delete(`${apiBaseURL}/admins/me`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			Notify("Successfuly Deleted 🚀", "success");
			window.localStorage.removeItem("token");
			history.push("/");
		})
		.catch((error) => {
			//Server responded but with a error response
			if (error.response) Notify(`${error.response.data.message} 😥`, "error");
			//Server didn't responded but a request was made
			else if (error.request)
				Notify(
					`Server didn't responded!😥 Please check your network or try after sometime `,
					"error"
				);
			//All other types of error if arises
			else Notify(`Something went wrong ! ⚠`, "error");
		});
};
