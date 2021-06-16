import "./profile.css";
import mail from "../../../images/mail.svg";
import github from "../../../images/GitHub_logo.svg";
import linkedin from "../../../images/LinkedIn_logo.svg";
import { Button, Modal } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Notify from "../../Notify";
import EditModal from "./editModal";
// importing APIs : DELETE ADMIN, UPDATE ADMIN
import { editAdmin } from "../../../api/editAdmin.js";
import { deleteAdmin } from "../../../api/deleteAdmin.js";

function Profile({ admin }) {
	// State Variables
	const [deleteModal, setDeleteModal] = useState(false); //handling visibility of Delete Modal
	const [editModal, setEditModal] = useState(false); //handling visibility of Edit Modal
	const [newAdminDetail, setNewAdminDetail] = useState({}); //new admin details
	const [errors, setErrors] = useState({}); // validation errors

	let history = useHistory();
	useEffect(() => {
		setNewAdminDetail({
			name: admin.name,
			email: admin.email,
			phone: admin.phone || "",
			intro: admin.intro || "",
			github: admin.github || "",
			linkedin: admin.linkedin || "",
			newPassword: "",
			confirmPassword: "",
		});
	}, [admin]);

	//Validate Function to validate input field values
	const validate = (prop) => {
		const err = {};
		//regEx for a valid email
		const reg =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		//Email Validation : (Required field)
		if (prop.email.trim() === "") err.email = "Email is Required !";
		else if (!reg.test(prop.email.toLowerCase())) err.email = "Invalid Email !";
		//Name Validation : (Required field)
		if (prop.name === "") err.name = "Name is Required !";
		// Phone Number Validation
		if (prop.phone && prop.phone.trim() !== "" && prop.phone.length !== 10)
			err.phone = "Invalid Phone number";
		//Password Length Validation
		if (prop.newPassword.length > 0 && prop.newPassword.length < 6)
			err.newPassword = "Password Too Short";
		//Confirm Password mismatch validation
		if (prop.newPassword !== prop.confirmPassword) {
			err.confirmPassword = "Password does not match";
		}
		setErrors(err);
	};

	// Handing on change functionality of edit admin details form
	const handleChange = (event) => {
		const input = event.currentTarget;
		const tempAdminDetail = { ...newAdminDetail };
		tempAdminDetail[input.name] = input.value;
		setNewAdminDetail(tempAdminDetail);
		// Validating values in the form :
		// "tempAdminDetail" object is used for validation instead of "newAdminDetail"
		// due to asynchronous nature of setState function
		validate(tempAdminDetail);
		if (input.name === "confirmPassword" && newAdminDetail.newPassword !== input.value) {
			input.setCustomValidity("Password does not match");
		} else input.setCustomValidity("");
	};
	//Handling Closing of Delete Confirmation Modal and Edit Admin Modal.
	const handleClose = () => {
		setDeleteModal(false);
		setEditModal(false);
	};
	//Handling Opening of Delete Confirmation Modal and Edit Admin Modal.
	const openDeleteModal = () => setDeleteModal(true);
	const openEditModal = () => setEditModal(true);

	// Invoking Delete Admin API.
	const handleDeleteRequest = () => {
		deleteAdmin(history); //delete API (protected API)
		setDeleteModal(false);
	};

	// Handing submit functionality of edit admin details form
	const handleEditRequest = (event) => {
		event.preventDefault();
		// Checking for any error present in the form validation
		if (Object.keys(errors).length !== 0) {
			Notify("Please enter valid values in the form", "warning");
			return;
		}
		const payload = {};
		Object.keys(newAdminDetail).forEach((key) => {
			if (
				key !== "newPassword" &&
				key !== "confirmPassword" &&
				newAdminDetail[key].trim() !== ""
			)
				payload[key] = newAdminDetail[key];
			else if (key === "newPassword" && newAdminDetail[key].trim() !== "")
				payload["password"] = newAdminDetail[key];
		});
		// Calling edit amdin details API (Protected)
		Notify(`Updating, Please wait !`, "info");
		editAdmin(payload, history);
	};

	return (
		<div className='container' key={admin._id}>
			<div className='row'>
				<div className='col-12 col-lg-4  align-self-center'>
					<img className=' dev-images' src='images/def.png' alt='tushar'></img>
				</div>
				<div className='dev-text-box col-12 col-lg-8'>
					<div className='row'>
						<div className='col-12 col-lg-6'>
							<h4 className='mt-3'>{admin.name}</h4>
							<p> {admin.adminType} Admin</p>
						</div>
						<div className='col-12 col-lg-6'>
							<button
								type='button'
								className='btn profile-btn'
								variant='primary'
								onClick={openEditModal}>
								Edit Profile
							</button>
							<EditModal
								newAdminDetail={newAdminDetail}
								errors={errors}
								editModal={editModal}
								handleClose={handleClose}
								handleEditRequest={handleEditRequest}
								handleChange={handleChange}
							/>
							<button
								type='button'
								className='btn profile-btn'
								onClick={() =>
									Notify("Currently verification is not needed.😄", "info")
								}>
								Verify Profile
							</button>
							<button
								type='button'
								className='btn profile-btn'
								variant='primary'
								onClick={openDeleteModal}>
								Delete Profile
							</button>
							<Modal show={deleteModal} onHide={handleClose}>
								<Modal.Header closeButton>
									<Modal.Title> Want to delete your account ?</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									Warning : Clicking on "YES" will delete your account
									permenently.
								</Modal.Body>
								<Modal.Footer>
									<Button variant='secondary' onClick={handleClose}>
										NO
									</Button>
									<Button variant='primary' onClick={handleDeleteRequest}>
										YES
									</Button>
								</Modal.Footer>
							</Modal>
						</div>
						<div className='col-12'>
							<p className='dev-intro'> {admin.intro}</p>
							<div className='Links'>
								<a href={admin.github} className='mr-3'>
									<img src={github} alt='github' />
								</a>
								<a href={admin.linkedin} className='mr-3'>
									<img src={linkedin} alt='Dribbble' />
								</a>
								<a href={"mailto:" + admin.email} className='mr-3'>
									<img src={mail} alt='mail' />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Profile;
