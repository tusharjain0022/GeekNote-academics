import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Notify from "../../Notify";
import "./IndividualInviteLink.css";

function IndividualInviteLink({ adminType }) {
	const [inviteLink, setInviteLink] = useState("");
	const inputEle = useRef(null);

	useEffect(() => {
		const token = window.localStorage.getItem("token");
		const baseURL = process.env.REACT_APP_GEEKNOTE_URL || "http://localhost:3000";

		axios
			.get(`${process.env.REACT_APP_GEEKNOTE_API}/invite?limit=1`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setInviteLink(`${baseURL}?id=${res.data[0].accessCode}`);
			})
			.catch((error) => {
				// console.log(error);
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
	});
	const generateNewLink = () => {
		const token = window.localStorage.getItem("token");
		const baseURL = process.env.REACT_APP_GEEKNOTE_URL || "http://localhost:3000";

		axios
			.post(
				`${process.env.REACT_APP_GEEKNOTE_API}/invite`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setInviteLink(`${baseURL}?id=${res.data.accessCode}`);
			})
			.catch((error) => {
				console.log(error);
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

	const copyToClipboard = () => {
		inputEle.current.select();
		document.execCommand("copy");
		Notify("Copied to clipboard", "info");
	};
	return (
		<div className='invite-component container'>
			<h4>Invite Link for {adminType} Admin </h4>
			<div className='row'>
				<div className='col-12 col-lg-9'>
					<input
						ref={inputEle}
						type='text'
						className='invite-link'
						value={inviteLink || "Generate a New Link"}
						readonly='readonly'></input>
				</div>
				<div className='col-12 col-lg-3'>
					<button type='button' className='btn invite-btn' onClick={copyToClipboard}>
						Copy Link
					</button>
					<button type='button' className='btn invite-btn' onClick={generateNewLink}>
						New Link
					</button>
				</div>
			</div>
		</div>
	);
}
export default IndividualInviteLink;
