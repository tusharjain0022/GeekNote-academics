import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Notify from "../../Notify";
import "./MultipleInviteLink.css";

function MultipleInviteLink({ adminType }) {
	const [inviteLinks, setInviteLinks] = useState({});
	const allYearInvite = useRef(null);
	const firstYearCSEInvite = useRef(null);
	const firstYearECEInvite = useRef(null);
	const secondYearCSEInvite = useRef(null);
	const secondYearECEInvite = useRef(null);
	const thirdYearCSEInvite = useRef(null);
	const thirdYearECEInvite = useRef(null);
	const fourthYearCSEInvite = useRef(null);
	const fourthYearECEInvite = useRef(null);

	useEffect(() => {
		const token = window.localStorage.getItem("token");
		const baseURL = process.env.REACT_APP_GEEKNOTE_URL || "http://localhost:3000";

		axios
			.get(`${process.env.REACT_APP_GEEKNOTE_API}/invite`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				const obj = {};
				res.data.forEach((inviteLink) => {
					obj[inviteLink.adminType] = `${baseURL}?id=${inviteLink.accessCode}`;
				});
				setInviteLinks(obj);
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
	}, []);
	const copyToClipboard = (adminType) => {
		if (adminType === "All Year") allYearInvite.current.select();
		else if (adminType === "First Year CSE") firstYearCSEInvite.current.select();
		else if (adminType === "First Year ECE") firstYearECEInvite.current.select();
		else if (adminType === "Second Year CSE") secondYearCSEInvite.current.select();
		else if (adminType === "Second Year ECE") secondYearECEInvite.current.select();
		else if (adminType === "Third Year CSE") thirdYearCSEInvite.current.select();
		else if (adminType === "Third Year ECE") thirdYearECEInvite.current.select();
		else if (adminType === "Fourth Year CSE") fourthYearCSEInvite.current.select();
		else if (adminType === "Fourth Year ECE") fourthYearECEInvite.current.select();
		document.execCommand("copy");
		Notify("Copied to clipboard", "info");
	};

	const generateNewLink = (adminType) => {
		const token = window.localStorage.getItem("token");
		const baseURL = process.env.REACT_APP_GEEKNOTE_URL || "http://localhost:3000";

		axios
			.post(
				`${process.env.REACT_APP_GEEKNOTE_API}/invite`,
				{
					adminType,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				const obj = { ...inviteLinks };
				obj[adminType] = `${baseURL}?id=${res.data.accessCode}`;
				setInviteLinks(obj);
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

	return (
		<div className='invite-component container'>
			<h4>Invite Link for {adminType} Admin </h4>
			<div className='row'>
				<div className='col-12 col-lg-9'>
					<input
						ref={allYearInvite}
						type='text'
						className='invite-link'
						value={inviteLinks["All Year"] || "Generate a New Link"}
						readonly='readonly'></input>
				</div>
				<div className='col-12 col-lg-3'>
					<button
						type='button'
						className='btn invite-btn'
						onClick={() => copyToClipboard("All Year")}>
						Copy Link
					</button>
					<button
						type='button'
						className='btn invite-btn'
						onClick={() => generateNewLink("All Year")}>
						New Link
					</button>
				</div>
			</div>
			<div className='row'>
				<div className='col-12 col-lg-6'>
					<div className='row'>
						<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
						<p style={{ margin: "auto" }}>Invite Link for First Year CSE Admin </p>
						<div className='col-12 col-lg-7'>
							<input
								ref={firstYearCSEInvite}
								type='text'
								className='invite-link'
								value={inviteLinks["First Year CSE"] || "Generate a New Link"}
								readonly='readonly'></input>
						</div>
						<div className='col-12 col-lg-5'>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => {
									copyToClipboard("First Year CSE");
								}}>
								Copy
							</button>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => generateNewLink("First Year CSE")}>
								New
							</button>
						</div>
					</div>
					<div className='row'>
						<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
						<p style={{ margin: "auto" }}>Invite Link for First Year ECE Admin </p>
						<div className='col-12 col-lg-7'>
							<input
								ref={firstYearECEInvite}
								type='text'
								className='invite-link'
								value={inviteLinks["First Year ECE"] || "Generate a New Link"}
								readonly='readonly'></input>
						</div>
						<div className='col-12 col-lg-5'>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => {
									copyToClipboard("First Year ECE");
								}}>
								Copy
							</button>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => generateNewLink("First Year ECE")}>
								New
							</button>
						</div>
					</div>
					<div className='row'>
						<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
						<p style={{ margin: "auto" }}>Invite Link for Second Year CSE Admin </p>
						<div className='col-12 col-lg-7'>
							<input
								ref={secondYearCSEInvite}
								type='text'
								className='invite-link'
								value={inviteLinks["Second Year CSE"] || "Generate a New Link"}
								readonly='readonly'></input>
						</div>
						<div className='col-12 col-lg-5'>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => {
									copyToClipboard("Second Year CSE");
								}}>
								Copy
							</button>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => generateNewLink("Second Year CSE")}>
								New
							</button>
						</div>
					</div>
					<div className='row'>
						<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
						<p style={{ margin: "auto" }}>Invite Link for Second Year ECE Admin </p>
						<div className='col-12 col-lg-7'>
							<input
								ref={secondYearECEInvite}
								type='text'
								className='invite-link'
								value={inviteLinks["Second Year ECE"] || "Generate a New Link"}
								readonly='readonly'></input>
						</div>
						<div className='col-12 col-lg-5'>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => {
									copyToClipboard("Second Year ECE");
								}}>
								Copy
							</button>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => generateNewLink("Second Year ECE")}>
								New
							</button>
						</div>
					</div>
				</div>
				<div className='col-12 col-lg-6'>
					<div className='row'>
						<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
						<p style={{ margin: "auto" }}>Invite Link for Third Year CSE Admin </p>
						<div className='col-12 col-lg-7'>
							<input
								ref={thirdYearCSEInvite}
								type='text'
								className='invite-link'
								value={inviteLinks["Third Year CSE"] || "Generate a New Link"}
								readonly='readonly'></input>
						</div>
						<div className='col-12 col-lg-5'>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => {
									copyToClipboard("Third Year CSE");
								}}>
								Copy
							</button>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => generateNewLink("Third Year CSE")}>
								New
							</button>
						</div>
					</div>
					<div className='row'>
						<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
						<p style={{ margin: "auto" }}>Invite Link for Third Year ECE Admin </p>
						<div className='col-12 col-lg-7'>
							<input
								ref={thirdYearECEInvite}
								type='text'
								className='invite-link'
								value={inviteLinks["Third Year ECE"] || "Generate a New Link"}
								readonly='readonly'></input>
						</div>
						<div className='col-12 col-lg-5'>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => {
									copyToClipboard("Third Year ECE");
								}}>
								Copy
							</button>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => generateNewLink("Third Year ECE")}>
								New
							</button>
						</div>
					</div>
					<div className='row'>
						<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
						<p style={{ margin: "auto" }}>Invite Link for Fourth Year CSE Admin </p>
						<div className='col-12 col-lg-7'>
							<input
								ref={fourthYearCSEInvite}
								type='text'
								className='invite-link'
								value={inviteLinks["Fourth Year CSE"] || "Generate a New Link"}
								readonly='readonly'></input>
						</div>
						<div className='col-12 col-lg-5'>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => {
									copyToClipboard("Fourth Year CSE");
								}}>
								Copy
							</button>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => generateNewLink("Fourth Year CSE")}>
								New
							</button>
						</div>
					</div>
					<div className='row'>
						<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
						<p style={{ margin: "auto" }}>Invite Link for Fourth Year ECE Admin </p>
						<div className='col-12 col-lg-7'>
							<input
								ref={fourthYearECEInvite}
								type='text'
								className='invite-link'
								value={inviteLinks["Fourth Year ECE"] || "Generate a New Link"}
								readonly='readonly'></input>
						</div>
						<div className='col-12 col-lg-5'>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => {
									copyToClipboard("Fourth Year ECE");
								}}>
								Copy
							</button>
							<button
								type='button'
								className='btn invite-btn'
								onClick={() => generateNewLink("Fourth Year ECE")}>
								New
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default MultipleInviteLink;
