import React, { useEffect, useState } from "react";
import "./Resources.css";
import { Accordion, Card, Button, Modal, ToggleButton, ButtonGroup } from "react-bootstrap";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
// import pin from "./svg_img/pin.svg";
// import notes from "./svg_img/notes.svg";
// import speaker from "./svg_img/speaker.svg";
import down_arrow from "./svg_img/down_arrow.svg";
import del from "./svg_img/delete.svg";
import edi from "./svg_img/edit-fill.svg";
import up_arrow from "./svg_img/up_arrow.svg";
import axios from "axios";

const SubjectCard = (pr) => {
	const [arrow, setArrow] = useState(down_arrow);
	const [links, setLinks] = useState([]);
	const apiBaseURL = process.env.REACT_APP_GEEKNOTE_API || `http://localhost:3001`;
	const subjectID = pr.subjectID;

	useEffect(() => {
		axios
			.get(`${apiBaseURL}/learning-links/${subjectID}`)
			.then((res) => {
				console.log(res.data);
				setLinks(res.data);
			})
			.catch((error) => console.log(error));
	}, [apiBaseURL, subjectID]);

	function RotateArrow() {
		if (arrow === down_arrow) setArrow(up_arrow);
		else setArrow(down_arrow);
	}

	const [statusDeleteModal, setStatusDeleteModal] = useState(false);
	const [statusEditSubModal, setStatusEditSubModal] = useState(false);
	const [statusAddLinkModal, setStatusAddLinkModal] = useState(false);
	const [newLink, setNewLink] = useState({
		subjectID: pr.subjectID,
		name: "",
		link: "",
		note: true,
		video: false,
	});
	const [newSubName, setNewSubName] = useState(pr.name);
	const [radioValue, setRadioValue] = useState("1");
	const [edit, setEdit] = useState(false);

	const radios = [
		{ name: "Notes", value: "1" },
		{ name: "Video", value: "2" },
	];

	const handleAddLinkChange = (event) => {
		const input = event.currentTarget;
		const tempLink = { ...newLink };
		tempLink[input.name] = input.value;
		setNewLink(tempLink);
	};

	const handleAddLink = (event) => {
		event.preventDefault();
		axios
			.post(`${apiBaseURL}/learning-links`, newLink)
			.then((res) => {
				const tempLinks = [...links];
				tempLinks.push(res.data);
				setLinks(tempLinks);
				setStatusAddLinkModal(false);
			})
			.catch((error) => console.log(error, newLink));
	};

	const handleEditLink = (event) => {
		event.preventDefault();
		axios
			.patch(`${apiBaseURL}/learning-links/${newLink._id}`, newLink)
			.then((res) => {
				const idx = links.findIndex((link) => link._id === newLink._id);
				const tempLinks = [...links];
				tempLinks[idx] = res.data;
				setLinks(tempLinks);
				setStatusAddLinkModal(false);
			})
			.catch((error) => console.log(error, newLink));
	};

	const handleEditSub = (event) => {
		const input = event.currentTarget;
		setNewSubName(input.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.patch(`${apiBaseURL}/${pr.subjectID}`, {
				name: newSubName,
			})
			.then((res) => {
				const idx = pr.subjects.findIndex((subject) => subject._id === pr.subjectID);
				const tempSubjects = [...pr.subjects];
				tempSubjects[idx].name = newSubName;
				pr.setSubjects(tempSubjects);
				setStatusEditSubModal(false);
			})
			.catch((error) => console.log(error));
	};

	const handleDelete = () => {
		axios
			.delete(`${apiBaseURL}/${pr.subjectID}`)
			.then((res) => {
				const tempSubjects = pr.subjects.filter((subject) => subject._id !== pr.subjectID);
				pr.setSubjects(tempSubjects);
			})
			.catch((error) => console.log(error));
	};

	const deleteLink = (id) => {
		axios
			.delete(`${apiBaseURL}/learning-links/${id}`)
			.then((res) => {
				const tempLinks = links.filter((link) => link._id !== id);
				setLinks(tempLinks);
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			<Accordion defaultActiveKey='1' style={{ marginTop: "5px" }}>
				<Card>
					<Accordion.Toggle
						as={Card.Header}
						eventKey='0'
						className='subject_name'
						onClick={RotateArrow}>
						<div className='subject_heading_name' style={{ color: "white" }}>
							{" "}
							{pr.name}{" "}
						</div>
						<div>
							<img className='subject_heading_image' src={arrow} alt='down_arrow' />
						</div>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='0'>
						<Card.Body className='inside_card'>
							<div className='container'>
								<div className='row'>
									<div className='col-12 col-md-4'>
										<button
											type='button'
											className='btn profile-btn'
											variant='primary'
											style={{ width: "80%" }}
											onClick={() => setStatusDeleteModal(true)}>
											Delete Subject
										</button>{" "}
										<Modal
											show={statusDeleteModal}
											onHide={() => setStatusDeleteModal(false)}>
											<Modal.Header closeButton>
												<Modal.Title> Delete Subject ?</Modal.Title>
											</Modal.Header>
											<Modal.Body></Modal.Body>
											<Modal.Footer>
												<Button variant='primary' onClick={handleDelete}>
													Yes
												</Button>
												<Button
													variant='secondary'
													onClick={() => setStatusDeleteModal(false)}>
													No
												</Button>
											</Modal.Footer>
										</Modal>
									</div>
									<div className='col-12 col-md-4'>
										<button
											type='button'
											className='btn profile-btn'
											variant='primary'
											style={{ width: "80%" }}
											onClick={() => setStatusEditSubModal(true)}>
											Edit Subject Name
										</button>
										<Modal
											show={statusEditSubModal}
											onHide={() => setStatusEditSubModal(false)}>
											<form>
												<Modal.Header closeButton>
													<Modal.Title> Edit Subject Name !</Modal.Title>
												</Modal.Header>
												<Modal.Body>
													<label
														htmlFor='defaultFormLoginEmailEx'
														className='grey-text'>
														Enter Subject name
													</label>
													<input
														type='text'
														id='subjectName'
														className='form-control'
														placeholder={newSubName}
														value={newSubName}
														onChange={handleEditSub}
													/>
													<br />
												</Modal.Body>
												<Modal.Footer>
													<Button
														variant='primary'
														onClick={handleSubmit}>
														Save
													</Button>
													<Button
														variant='secondary'
														onClick={() =>
															setStatusEditSubModal(false)
														}>
														Cancel
													</Button>
												</Modal.Footer>
											</form>
										</Modal>
									</div>
									<div className='col-12 col-md-4'>
										<button
											type='button'
											className='btn profile-btn'
											variant='primary'
											style={{ width: "80%" }}
											onClick={() => {
												setEdit(false);
												setStatusAddLinkModal(true);
											}}>
											Add a Link
										</button>
									</div>
									<div className='col-12'>
										<hr style={{ borderTop: "1.5px solid black" }}></hr>
										<h5 style={{ color: "black" }} className='text-center'>
											{" "}
											Learning Notes
										</h5>
										<MDBTable small responsive>
											<MDBTableHead
												style={{ backgroundColor: "#172a45" }}
												textWhite>
												<tr>
													<th>Topic</th>
													<th>link</th>
													<th>Actions</th>
												</tr>
											</MDBTableHead>
											<MDBTableBody>
												{links.map((link) => {
													if (link.note)
														return (
															<tr id={link._id}>
																<td>{link.name}</td>
																<td>{link.link.slice(0, 40)}</td>
																<td>
																	<a
																		type='button'
																		style={{
																			marginRight: "30px",
																		}}
																		onClick={() => {
																			setNewLink(link);
																			if (link.note) {
																				setRadioValue("1");
																			} else {
																				setRadioValue("2");
																			}
																			setEdit(true);
																			setStatusAddLinkModal(
																				true
																			);
																		}}
																		title='Edit Link'>
																		<img
																			alt='edit icon'
																			src={edi}></img>
																	</a>
																	<a
																		type='button'
																		onClick={() =>
																			deleteLink(link._id)
																		}
																		title='Delete Link'>
																		<img
																			alt='delete icon'
																			src={del}></img>
																	</a>
																</td>
															</tr>
														);
													else return <div></div>;
												})}
											</MDBTableBody>
										</MDBTable>
									</div>
									<div className='col-12'>
										<hr style={{ borderTop: "1.5px solid black" }}></hr>
										<h5 style={{ color: "black" }} className='text-center'>
											{" "}
											Learning Videos
										</h5>
										<MDBTable small responsive>
											<MDBTableHead
												style={{ backgroundColor: "#172a45" }}
												textWhite>
												<tr>
													<th>Topic</th>
													<th>link</th>
													<th>Actions</th>
												</tr>
											</MDBTableHead>
											<MDBTableBody>
												{links.map((link) => {
													if (link.video)
														return (
															<tr id={link._id}>
																<td>{link.name}</td>
																<td>{link.link.slice(0, 40)}</td>
																<td>
																	{" "}
																	<a
																		type='button'
																		style={{
																			marginRight: "30px",
																		}}
																		onClick={() => {
																			setNewLink(link);
																			if (link.note) {
																				setRadioValue("1");
																			} else {
																				setRadioValue("2");
																			}
																			setEdit(true);
																			setStatusAddLinkModal(
																				true
																			);
																		}}
																		title='Edit Link'>
																		<img
																			alt='delete icon'
																			src={edi}></img>
																	</a>
																	<a
																		type='button'
																		onClick={() =>
																			deleteLink(link._id)
																		}
																		title='Delete Link'>
																		<img
																			alt='delete icon'
																			src={del}></img>
																	</a>
																</td>
															</tr>
														);
												})}
											</MDBTableBody>
										</MDBTable>
									</div>
								</div>
							</div>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
			<Modal show={statusAddLinkModal} onHide={() => setStatusAddLinkModal(false)}>
				<form>
					<Modal.Header closeButton>
						<Modal.Title> Edit Subject Name !</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<label htmlFor='name' className='grey-text'>
							Topic Name
						</label>
						<input
							type='text'
							id='name'
							name='name'
							value={newLink.name}
							className='form-control'
							onChange={handleAddLinkChange}
						/>
						<br />
						<label htmlFor='link' className='grey-text'>
							Add a valid Link
						</label>
						<input
							type='text'
							id='link'
							className='form-control'
							name='link'
							value={newLink.link}
							onChange={handleAddLinkChange}
						/>
						<br />
						<ButtonGroup>
							{radios.map((radio, idx) => (
								<ToggleButton
									key={idx}
									id={`radio-${idx}`}
									type='radio'
									variant={idx % 2 ? "outline-primary" : "outline-primary"}
									name='radio'
									value={radio.value}
									checked={radioValue === radio.value}
									onChange={(e) => {
										const val = e.currentTarget.value;
										if (val === "1") {
											const tempLink = {
												...newLink,
											};
											tempLink["note"] = true;
											tempLink["video"] = false;
											setNewLink(tempLink);
										} else {
											const tempLink = {
												...newLink,
											};
											tempLink["note"] = false;
											tempLink["video"] = true;
											setNewLink(tempLink);
										}
										console.log(newLink, val, val === "1");
										setRadioValue(e.currentTarget.value);
									}}>
									{radio.name}
								</ToggleButton>
							))}
						</ButtonGroup>
					</Modal.Body>
					<Modal.Footer>
						{!edit && (
							<Button variant='primary' onClick={handleAddLink}>
								Add
							</Button>
						)}
						{edit && (
							<Button variant='primary' onClick={handleEditLink}>
								Save
							</Button>
						)}

						<Button variant='secondary' onClick={() => setStatusAddLinkModal(false)}>
							Cancel
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

function Resources(props) {
	const [subjects, setSubjects] = useState([]);
	const apiBaseURL = process.env.REACT_APP_GEEKNOTE_API || `http://localhost:3001`;

	useEffect(() => {
		axios
			.get(`${apiBaseURL}/${props.branch}/${props.year}/${props.semester}`)
			.then((res) => {
				console.log(res.data);
				setSubjects(res.data);
			})
			.catch((error) => console.log(error));
	}, []);

	const [openStatus, setOpenStatus] = useState(false);
	const [newSub, setNewSub] = useState("");

	const handleChange = (event) => {
		const input = event.currentTarget;
		setNewSub(input.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post(`${apiBaseURL}/${props.branch}/${props.year}/${props.semester}`, {
				name: newSub,
			})
			.then((res) => {
				const tempSubjects = [...subjects];
				tempSubjects.push(res.data);
				setSubjects(tempSubjects);
				setOpenStatus(false);
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			<h4>
				<button
					type='button'
					className='btn profile-btn'
					variant='primary'
					onClick={() => setOpenStatus(true)}>
					Add a new Subject
				</button>{" "}
				<Modal show={openStatus} onHide={() => setOpenStatus(false)}>
					<form>
						<Modal.Header closeButton>
							<Modal.Title> Add a new Subject !</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<label htmlFor='defaultFormLoginEmailEx' className='grey-text'>
								Enter Subject name
							</label>
							<input
								type='text'
								id='subjectName'
								className='form-control'
								onChange={handleChange}
							/>
							<br />
						</Modal.Body>
						<Modal.Footer>
							<Button variant='primary' onClick={handleSubmit}>
								Add
							</Button>
							<Button variant='secondary' onClick={() => setOpenStatus(false)}>
								Cancel
							</Button>
						</Modal.Footer>
					</form>
				</Modal>
			</h4>
			{subjects.map((subject) => {
				return (
					<SubjectCard
						name={subject.name}
						subjectID={subject._id}
						subjects={subjects}
						setSubjects={setSubjects}
					/>
				);
			})}
		</>
	);
}
export default Resources;
