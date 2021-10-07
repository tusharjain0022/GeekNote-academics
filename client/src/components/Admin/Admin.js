import "./Admin.css";
import Profile from "./MyProfile/profile";
import IndividualInviteLink from "./IndividualInviteLink/IndividualInviteLink";
import MultipleInviteLink from "./MultipleInviteLink/MultipleInviteLink";
import DeleteAll from "./DeleteAll/DeleteAll";
import { useEffect, useState } from "react";
import Resources from "./Resources/Resources";
import axios from "axios";

function Admin() {
	const [admin, setAdmin] = useState({});
	const token = window.localStorage.getItem("token");
	const [branch, setBranch] = useState("cse");
	const [year, setYear] = useState(1);
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
				const br = res.data.adminType.slice(-3, -1);
				const yr = res.data.adminType.slice(0, 3);
				if (br === "CS") setBranch("cse");
				else setBranch("ece");
				if (yr === "Fir") setYear(1);
				else if (yr === "Sec") setYear(2);
				else if (yr === "Thi") setYear(3);
				else setYear(4);
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
		else if (admin.adminType)
			return (
				<>
					<IndividualInviteLink adminType={admin.adminType} />
					<h4> Spring Semester</h4>
					<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
					<Resources branch={branch} year={year} semester='spring' />
					<h4> Autumn Semester </h4>
					<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
					<Resources branch={branch} year={year} semester='autumn' />
				</>
			);
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
