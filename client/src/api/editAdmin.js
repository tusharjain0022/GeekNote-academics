import axios from "axios";
import Notify from "../components/Notify";

const apiBaseURL = process.env.REACT_APP_GEEKNOTE_API || `http://localhost:3001`;

export const editAdmin = async (payload, history) => {
	const token = window.localStorage.getItem("token");
	return axios
		.patch(`${apiBaseURL}/admins/me`, payload, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			Notify("Successfuly Updated 🚀", "success");
			window.location.href = "/admin";
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
