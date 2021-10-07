import React, { useEffect, useState } from "react";
import "./Resources.css";
import { Accordion, Card } from "react-bootstrap";
import pin from "./svg_img/pin.svg";
import notes from "./svg_img/notes.svg";
// import CSEsyllabus from "../../../data/cse_syllabus.json";
// import ECEsyllabus from "../../../data/ece_syllabus.json";
import speaker from "./svg_img/speaker.svg";
import down_arrow from "./svg_img/down_arrow.svg";
import up_arrow from "./svg_img/up_arrow.svg";
import axios from "axios"; // uncomment when fetching data from database

//##################### code for data fetching from data-base ################
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
						<img className='subject_heading_image' src={arrow} alt='down_arrow' />
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='0'>
						<Card.Body className='inside_card'>
							<div className='learn_notes'>
								<h3 className='learn_notes_heading'>
									<img src={notes} alt='logo' /> Learning Notes
								</h3>
								<div>
									{links.map((data) => {
										if (data.note === true) {
											return (
												<li>
													<a
														href={data.link}
														style={{ color: "black" }}
														target='_blank'
														rel='noreferrer'>
														{data.name}
													</a>
												</li>
											);
										} else {
											return 0;
										}
									})}
								</div>
							</div>
							<br />
							<div className='learn_videos'>
								<h3 className='learn_notes_heading'>
									<img src={speaker} alt='logo' /> Learning Videos
								</h3>
								{links.map((data) => {
									if (data.video === true) {
										return (
											<li>
												<a href={data.link} style={{ color: "black" }}>
													{data.name}
												</a>
											</li>
										);
									} else {
										return 0;
									}
								})}
							</div>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</>
	);
};

function Resources(props) {
	// const [dataSubject,setDataSubject]=useState([]);
	// const [topicSubject,setTopicSubject]=useState({});

	// useEffect(()=>{
	//   Axios(`http://localhost:3001/${window.location.href.split('/')[3]}/${window.location.href.split('/')[4]}/${window.location.href.split('/')[5]}`).then((response)=>{
	//       console.log(response.data.top);
	//       setDataSubject(response.data.sub);
	//       setTopicSubject(response.data.top);
	//   })
	// },[]);

	return (
		<>
			<div className='resource_heading '>
				<h1 className='sub_resource_heading'>
					<img src={pin} alt='logo' /> <div className='ml-3 text-white'>Resources</div>
				</h1>
			</div>

			{props.subjects.map((subject) => {
				return <SubjectCard name={subject.name} subjectID={subject._id} />;
			})}
		</>
	);
}
export default Resources;
//##################### code for data fetching from data-base ################
