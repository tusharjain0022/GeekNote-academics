import "./DeleteAll.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Notify from "../../Notify";
import mail from "../../../images/mail.svg";
import github from "../../../images/GitHub_logo.svg";
import linkedin from "../../../images/LinkedIn_logo.svg";
import { Button, Modal } from "react-bootstrap";

function DeleteAll({ adminID }) {
	const [admins, setAdmins] = useState([]);
	const [id, setId] = useState("");
	const [deleteModal, setDeleteModal] = useState(false); //handling visibility of Delete Modal
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_GEEKNOTE_API}/admins`)
			.then((res) => {
				setAdmins(res.data.filter((admin) => admin._id !== adminID));
				console.log(res.data);
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
	}, [adminID]);

	//Handling Closing of Delete Confirmation Modal and Edit Admin Modal.
	const handleClose = () => {
		setDeleteModal(false);
	};
	//Handling Opening of Delete Confirmation Modal and Edit Admin Modal.
	const openDeleteModal = (id) => {
		setDeleteModal(true);
		setId(id);
	};

	const handleDeleteRequest = () => {
		const token = window.localStorage.getItem("token");
		axios
			.delete(`${process.env.REACT_APP_GEEKNOTE_API}/admins?id=${id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				const arr = admins.filter((admin) => admin._id !== res.data._id);
				setAdmins(arr);
				Notify("Sucessfully Deleted", "success");
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

		setDeleteModal(false);
	};

	return (
		<div className='container delete-all'>
			<div className='row'>
				<div className='col-12'>
					<h4>Admins List</h4>
				</div>
				{admins.length === 0 && (
					<div className='col-12'>
						<p style={{ textAlign: "center" }}>Nothing to Display</p>
					</div>
				)}
				{admins.map((admin, idx) => {
					return (
						<div className='col-12 col-lg-6' key={idx}>
							<hr style={{ borderTop: "1px solid #c6e2ff", width: "70%" }}></hr>
							<div className='row'>
								<div className='col-12 col-lg-3  align-self-center'>
									<img
										className=' dev-images'
										src='images/def.png'
										alt='tushar'></img>
								</div>
								<div className='dev-text-box col-12 col-lg-9'>
									<h5 className='mt-3'>{admin.name}</h5>
									<p> {admin.adminType} Admin</p>
									<p className='dev-intro'> {admin.intro}</p>
									<p>{admin._id}</p>
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
									<button
										type='button'
										className='btn profile-btn'
										variant='primary'
										onClick={() => openDeleteModal(admin._id)}>
										Delete Profile
									</button>
									<Modal show={deleteModal} onHide={handleClose}>
										<Modal.Header closeButton>
											<Modal.Title>
												{" "}
												Want to delete your account ?
											</Modal.Title>
										</Modal.Header>
										<Modal.Body>
											Warning : Clicking on "YES" will delete this account
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
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default DeleteAll;
