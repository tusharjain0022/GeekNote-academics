import "./profile.css";
import { MDBRow, MDBCol, MDBContainer } from "mdbreact";
import { Button, Modal } from "react-bootstrap";

function EditModal({
	newAdminDetail,
	errors,
	handleClose,
	editModal,
	handleEditRequest,
	handleChange,
}) {
	return (
		<Modal show={editModal} onHide={handleClose} size='lg'>
			<form
				className='needs-validation was-validated'
				onSubmit={handleEditRequest}
				noValidate>
				<Modal.Header closeButton>
					<Modal.Title> Edit your Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<MDBContainer>
						<MDBRow>
							<MDBCol lg='4'>
								<img
									className=' dev-images'
									src='images/def.png'
									alt='tushar'
									style={{
										display: "block",
										margin: "30px auto",
									}}></img>
								<Button
									variant='outline-primary'
									size='sm'
									style={{
										display: "block",
										margin: "20px auto",
										width: "60%",
									}}>
									Change Avatar
								</Button>
								<MDBCol size='12' className='mb-3'>
									<label htmlFor='github' className='grey-text'>
										Github id link (Optional)
									</label>
									<input
										value={newAdminDetail.github}
										name='github'
										onChange={handleChange}
										type='url'
										id='github'
										className='form-control '
										placeholder={
											newAdminDetail.github || "Paste your Github id link"
										}
									/>
									<div className='valid-feedback'>Looks good!</div>
									<div className='invalid-feedback'>Enter a valid URL</div>
								</MDBCol>
								<MDBCol size='12' className='mb-3'>
									<label htmlFor='linkedin' className='grey-text'>
										Linkedin id link (Optional)
									</label>
									<input
										value={newAdminDetail.linkedin}
										name='linkedin'
										onChange={handleChange}
										type='url'
										id='linkedin'
										className='form-control '
										placeholder={
											newAdminDetail.linkedin || "Paste your linkedin id link"
										}
									/>
									<div className='valid-feedback'>Looks good!</div>
									<div className='invalid-feedback'>Enter a valid URL</div>
								</MDBCol>
							</MDBCol>
							<MDBCol lg='8'>
								<MDBRow>
									<MDBCol size='12' className='mb-3'>
										<label htmlFor='name' className='grey-text'>
											Full Name
										</label>
										<input
											value={newAdminDetail.name}
											name='name'
											onChange={handleChange}
											type='text'
											id='name'
											className='form-control '
											placeholder={
												newAdminDetail.name || "Enter your Full Name"
											}
											required
										/>
										<div className='valid-feedback'>Looks good!</div>
										<div className='invalid-feedback'>{errors.name}</div>
									</MDBCol>
									<MDBCol size='12' className='mb-3'>
										<label htmlFor='email' className='grey-text'>
											Email
										</label>
										<input
											value={newAdminDetail.email}
											name='email'
											onChange={handleChange}
											type='email'
											id='email'
											className='form-control '
											placeholder={
												newAdminDetail.email || "Enter your email id"
											}
											required
										/>
										<div className='valid-feedback'>Looks good!</div>
										<div className='invalid-feedback'>{errors.email}</div>
									</MDBCol>
									<MDBCol size='12' className='mb-3'>
										<label htmlFor='phone' className='grey-text'>
											Phone Number (Optional)
										</label>
										<input
											value={newAdminDetail.phone}
											name='phone'
											onChange={handleChange}
											type='tel'
											id='phone'
											className='form-control '
											placeholder={
												newAdminDetail.phone || "Enter your phone number"
											}
											pattern='[0-9]{10}'
										/>
										<div className='valid-feedback'>Looks good!</div>
										<div className='invalid-feedback'>{errors.phone}</div>
									</MDBCol>
									<MDBCol size='12' className='mb-3'>
										<label htmlFor='intro' className='grey-text'>
											Add a brief intro (Optional)
										</label>
										<textarea
											value={newAdminDetail.intro}
											name='intro'
											onChange={handleChange}
											id='intro'
											className='form-control '
											placeholder={newAdminDetail.intro || "Enter your intro"}
										/>
									</MDBCol>
									<MDBCol size='12' className='mb-3'>
										<label htmlFor='newPassword' className='grey-text'>
											NEW Password
										</label>
										<input
											value={newAdminDetail.newPassword}
											name='newPassword'
											onChange={handleChange}
											type='password'
											id='newPassword'
											className='form-control '
											placeholder={
												newAdminDetail.newPassword || "Enter NEW Password"
											}
											minLength='6'
										/>
										<div className='valid-feedback'>Looks good!</div>
										<div className='invalid-feedback'>{errors.newPassword}</div>
									</MDBCol>
									<MDBCol size='12' className='mb-3'>
										<label htmlFor='confirmPassword' className='grey-text'>
											Retype NEW Password
										</label>
										<input
											value={newAdminDetail.confirmPassword}
											name='confirmPassword'
											onChange={handleChange}
											type='password'
											id='confirmPassword'
											className='form-control '
											placeholder={
												newAdminDetail.confirmPassword ||
												"Retype NEW Password as typed above"
											}
										/>
										<div className='valid-feedback'>Looks good!</div>
										<div className='invalid-feedback'>
											{errors.confirmPassword}
										</div>
									</MDBCol>
								</MDBRow>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='primary' type='submit'>
						Save Changes
					</Button>
					<Button variant='secondary' onClick={handleClose}>
						Cancel
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default EditModal;
