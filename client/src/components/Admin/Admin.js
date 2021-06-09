import "./Admin.css";
import Profile from "./MyProfile/profile";
import InviteLink from "./InviteLink/InviteLink";
import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
    const [admin, setAdmin] = useState({});
    const token = window.localStorage.getItem("token");
    const apiBaseURL =
        process.env.REACT_APP_GEEKNOTE_API || `http://localhost:3001`;

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
    });
    return (
        <div className='admin'>
            {/* <h1>Admin Section</h1>
            <hr></hr> */}
            <h4> Admin Section </h4>
            <hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
            <Profile admin={admin} />
            <hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
            <InviteLink adminType={admin.adminType} />
        </div>
    );
}
export default Admin;
