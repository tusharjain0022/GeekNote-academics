import "./Admin.css";
import Profile from "./MyProfile/profile";
import IndividualInviteLink from "./IndividualInviteLink/IndividualInviteLink";
import MultipleInviteLink from "./MultipleInviteLink/MultipleInviteLink";
import DeleteAll from "./DeleteAll/DeleteAll";
import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
	const [admin, setAdmin] = useState({});
	const token = window.localStorage.getItem("token");
	const apiBaseURL = process.env.REACT_APP_GEEKNOTE_API || `http://localhost:3001`;

	useEffect(() => {
		axios
			.get(
				`${apiBaseURL}/admins/me`,

				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setAdmin(res.data);
			})
			.catch((error) => console.log(error));
		// console.log(admin)
	}, [setAdmin, apiBaseURL, token]);

	const InviteLink = () => {
		if (admin.adminType === "All Year")
			return (
				<>
					<MultipleInviteLink adminType={admin.adminType} />
					<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
					<DeleteAll adminID={admin._id} />
				</>
			);
		else if (admin.adminType) return <IndividualInviteLink adminType={admin.adminType} />;
		else return null;
	};

	return (
		<div className='admin'>
			<h4> Admin Section </h4>
			<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
			<Profile admin={admin} />
			<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
			<InviteLink />
		</div>
	);
}
export default Admin;
